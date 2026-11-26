import { db } from "../config/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

const USERS_COLLECTION = "users";
const ACTIVITY_TIME_ZONE = "Africa/Johannesburg";
const TIMESTAMP_FIELDS = ["createdAt", "updatedAt", "lastActivityDate"];
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;


const sendSuccess = (res, data) => res.json({ success: true, data });
const sendError = (res, message) => res.json({ error: message });
const getProfileRef = (userId) => db.collection(USERS_COLLECTION).doc(userId);

// A profile only counts as "created" once it has a createdAt timestamp
const isCreatedProfile = (snapshot) =>
  snapshot.exists && Boolean(snapshot.data()?.createdAt);

const serializeProfile = (profile) => {
  const serialized = { ...profile };

  for (const field of TIMESTAMP_FIELDS) {
    if (serialized[field]?.toDate) {
      serialized[field] = serialized[field].toDate();
    }
  }

  return serialized;
};

const toUtcMidnight = (date) => new Date(`${date}T00:00:00.000Z`);

const isValidActivityDate = (value) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
  toUtcMidnight(value).toISOString().startsWith(value);

const previousDate = (date) => {
  const previous = toUtcMidnight(date);
  previous.setUTCDate(previous.getUTCDate() - 1);
  return previous.toISOString().slice(0, 10);
};

const activityDateToday = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: ACTIVITY_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
};

const activityDateFromProfile = (profile) => {
  const value = profile?.lastActivityDate;

  if (isValidActivityDate(value)) {
    return value;
  }

  if (value?.toDate) {
    return value.toDate().toISOString().slice(0, 10);
  }

  return null;
};

const isString = (value) => typeof value === "string";

const isNonEmptyString = (value, maxLength) =>
  isString(value) &&
  value.trim().length > 0 &&
  value.trim().length <= maxLength;

const FIELD_VALIDATORS = {
  firstName: (value) => isNonEmptyString(value, MAX_NAME_LENGTH),
  lastName: (value) => isString(value) && value.trim().length <= MAX_NAME_LENGTH,
  email: (value) => isNonEmptyString(value, MAX_EMAIL_LENGTH),
  examDate: (value) => value === null || isString(value),
};

const getValidProfileFields = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Request body must be an object" };
  }

  const fields = {};

  for (const [field, isValid] of Object.entries(FIELD_VALIDATORS)) {
    const value = body[field];

    if (value === undefined) {
      continue;
    }

    if (!isValid(value)) {
      return { error: `Invalid ${field}` };
    }

    fields[field] = isString(value) ? value.trim() : value;
  }

  return { fields };
};

// Validates the request body; sends the error and returns null if invalid
const readProfileFields = (req, res) => {
  const { fields, error } = getValidProfileFields(req.body);

  if (error) {
    sendError(res, error);
    return null;
  }

  return fields;
};

const isMissingRequiredField = (value) =>
  typeof value !== "string" || value.length === 0;
  

const getStoredStreak = (profile) =>
  Number.isInteger(profile.streak) && profile.streak >= 0 ? profile.streak : 0;

const calculateStreak = ({ lastActivityDate, storedStreak, today }) => {
  if (lastActivityDate === today) {
    return Math.max(1, storedStreak);
  }

  if (lastActivityDate === previousDate(today)) {
    return storedStreak + 1;
  }

  return 1;
};

// Create a new profile in Firestore
const createProfile = async (req, res) => {
  const fields = readProfileFields(req, res);

  if (!fields) {
    return;
  }

  const { firstName, lastName, email, examDate } = fields;

  if (isMissingRequiredField(firstName) || isMissingRequiredField(email)) {
    return sendError(res, "firstName and email are required");
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const existingProfile = await profileRef.get();

    if (isCreatedProfile(existingProfile)) {
      return sendError(res, "Profile already exists");
    }

    const profile = {
      firstName,
      lastName,
      email,
      ...(examDate !== undefined ? { examDate } : {}),
      streak: existingProfile.data()?.streak ?? 0,
      lastActivityDate: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await profileRef.set(profile, { merge: true });
    const savedProfile = await profileRef.get();

    return sendSuccess(res, serializeProfile(savedProfile.data()));
  } catch (error) {
    console.log(error);
    return sendError(res, "Error when creating profile");
  }
};

// Get the user's profile from Firestore
const getProfile = async (req, res) => {
  try {
    const snapshot = await getProfileRef(req.userId).get();

    if (!isCreatedProfile(snapshot)) {
      return sendError(res, "Profile not found");
    }

    return sendSuccess(res, serializeProfile(snapshot.data()));
  } catch (error) {
    console.log(error);
    return sendError(res, "Error when getting profile");
  }
};

// Update the user's profile in Firestore
const updateProfile = async (req, res) => {
  const updateData = readProfileFields(req, res);

  if (!updateData) {
    return;
  }

  if (Object.keys(updateData).length === 0) {
    return sendError(res, "No valid fields to update");
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const snapshot = await profileRef.get();

    if (!isCreatedProfile(snapshot)) {
      return sendError(res, "Profile not found");
    }

    await profileRef.update({
      ...updateData,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const updatedProfile = await profileRef.get();

    return sendSuccess(res, serializeProfile(updatedProfile.data()));
  } catch (error) {
    console.log(error);
    return sendError(res, "Error when updating profile");
  }
};

// Update the user's streak in Firestore
const updateStreak = async (req, res) => {
  const today = activityDateToday();

  try {
    const profileRef = getProfileRef(req.userId);

    const result = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(profileRef);

      if (!isCreatedProfile(snapshot)) {
        return null;
      }

      const profile = snapshot.data();
      const streak = calculateStreak({
        lastActivityDate: activityDateFromProfile(profile),
        storedStreak: getStoredStreak(profile),
        today,
      });

      transaction.update(profileRef, {
        streak,
        lastActivityDate: today,
        updatedAt: FieldValue.serverTimestamp(),
      });

      return { streak, lastActivityDate: today };
    });

    if (!result) {
      return sendError(res, "Profile not found");
    }

    return sendSuccess(res, result);
  } catch (error) {
    console.log(error);
    return sendError(res, "Error when updating streak");
  }
};

// Update the user's exam date in Firestore
const updateExamDate = async (req, res) => {
  const { examDate } = req.body ?? {};

  if (!isValidActivityDate(examDate)) {
    return sendError(res, "examDate must be YYYY-MM-DD");
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const snapshot = await profileRef.get();

    if (!isCreatedProfile(snapshot)) {
      return sendError(res, "Profile not found");
    }

    await profileRef.update({
      examDate,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return sendSuccess(res, { examDate });
  } catch (error) {
    console.log(error);
    return sendError(res, "Error when updating exam date");
  }
};


export {getProfile, createProfile, updateProfile, updateStreak, updateExamDate};