import { db } from "../config/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

// Helper function to get a reference to the user's profile document in Firestore
const getProfileRef = (userId) => {
  return db.collection("users").doc(userId);
};

const serializeProfile = (profile) => {
  const serialized = { ...profile };

  for (const field of ["createdAt", "updatedAt", "lastActivityDate"]) {
    if (serialized[field]?.toDate) {
      serialized[field] = serialized[field].toDate();
    }
  }

  return serialized;
};

const isValidActivityDate = (value) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
  new Date(`${value}T00:00:00.000Z`).toISOString().startsWith(value);

const previousDate = (date) => {
  const previous = new Date(`${date}T00:00:00.000Z`);
  previous.setUTCDate(previous.getUTCDate() - 1);
  return previous.toISOString().slice(0, 10);
};

const activityDateToday = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
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

const getValidProfileFields = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Request body must be an object" };
  }

  const fields = {};
  for (const field of ["firstName", "lastName", "email", "examDate"]) {
    const value = body[field];

    if (value === undefined) {
      continue;
    }

    if (field === "examDate") {
      if (value !== null && typeof value !== "string") {
        return { error: "Invalid examDate" };
      }
    } else if (field === "lastName") {
      if (typeof value !== "string" || value.trim().length > 100) {
        return { error: "Invalid lastName" };
      }
    } else if (
      typeof value !== "string" ||
      !value.trim() ||
      value.trim().length > (field === "email" ? 254 : 100)
    ) {
      return { error: `Invalid ${field}` };
    }

    fields[field] = typeof value === "string" ? value.trim() : value;
  }

  return { fields };
};

const readProfileFields = (req, res) => {
  const result = getValidProfileFields(req.body);

  if (result.error) {
    res.status(400).json({ error: result.error });
    return null;
  }

  return result.fields;
};

const isMissingRequiredProfileField = (field) => {
  return typeof field !== "string" || field.length === 0;
};

const createProfile = async (req, res) => {
  const fields = readProfileFields(req, res);

  if (!fields) {
    return;
  }

  const { firstName, lastName, email, examDate } = fields;

  if (
    isMissingRequiredProfileField(firstName) ||
    isMissingRequiredProfileField(email)
  ) {
    return res.status(400).json({
      error: "firstName and email are required",
    });
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const existingProfile = await profileRef.get();

    if (existingProfile.exists && existingProfile.data()?.createdAt) {
      return res.status(409).json({ error: "Profile already exists" });
    }

    // 
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

    res.json({ success: true, data: serializeProfile(savedProfile.data()) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when creating profile" });
  }
};

// Get the user's profile from Fire-store 
const getProfile = async (req, res) => {
  try {
    const snapshot = await getProfileRef(req.userId).get();

    if (!snapshot.exists || !snapshot.data()?.createdAt) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ success: true, data: serializeProfile(snapshot.data()) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when getting profile" });
  }
};


// Update the user's profile in Fire-store 
const updateProfile = async (req, res) => {
  const updateData = readProfileFields(req, res);

  if (!updateData) {
    return;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const snapshot = await profileRef.get();

    if (!snapshot.exists || !snapshot.data()?.createdAt) {
      return res.status(404).json({ error: "Profile not found" });
    }

    await profileRef.update({
      ...updateData,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const updatedProfile = await profileRef.get();

    res.json({ success: true, data: serializeProfile(updatedProfile.data()) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when updating profile" });
  }
};

const updateStreak = async (req, res) => {
  const date = activityDateToday();

  try {
    const profileRef = getProfileRef(req.userId);
    const result = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(profileRef);

      if (!snapshot.exists || !snapshot.data()?.createdAt) {
        return null;
      }

      const profile = snapshot.data();
      const lastActivityDate = activityDateFromProfile(profile);
      const storedStreak =
        Number.isInteger(profile.streak) && profile.streak >= 0
          ? profile.streak
          : 0;

      let streak;
      if (lastActivityDate === date) {
        streak = Math.max(1, storedStreak);
      } else if (lastActivityDate === previousDate(date)) {
        streak = storedStreak + 1;
      } else {
        streak = 1;
      }

      transaction.update(profileRef, {
        streak,
        lastActivityDate: date,
        updatedAt: FieldValue.serverTimestamp(),
      });

      return { streak, lastActivityDate: date };
    });

    if (!result) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error when updating streak" });
  }
};

const updateExamDate = async (req, res) => {
  const { examDate } = req.body ?? {};

  if (!isValidActivityDate(examDate)) {
    return res.status(400).json({ error: "examDate must be YYYY-MM-DD" });
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const snapshot = await profileRef.get();

    if (!snapshot.exists || !snapshot.data()?.createdAt) {
      return res.status(404).json({ error: "Profile not found" });
    }

    await profileRef.update({
      examDate,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return res.json({ success: true, data: { examDate } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error when updating exam date" });
  }
};

export { getProfile, createProfile, updateProfile, updateStreak, updateExamDate };
