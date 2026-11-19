import { db } from "../config/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

function getProfileRef(userId) {
  return db.collection("users").doc(userId);
}

function serializeProfile(profile) {
  const serialized = { ...profile };

  for (const field of ["createdAt", "updatedAt", "lastActivityDate"]) {
    if (serialized[field]?.toDate) {
      serialized[field] = serialized[field].toDate();
    }
  }

  return serialized;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getValidProfileFields(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Request body must be an object" };
  }

  const fields = {};

  for (const field of ["firstName", "lastName", "email", "profilePicture"]) {
    const value = body[field];

    if (value === undefined) {
      continue;
    }

    if (field === "profilePicture") {
      if (
        value !== null &&
        (typeof value !== "string" || value.length > 700000)
      ) {
        return { error: "Invalid profilePicture" };
      }
    } else if (
      typeof value !== "string" ||
      !value.trim() ||
      value.trim().length > (field === "email" ? 254 : 100)
    ) {
      return { error: `Invalid ${field}` };
    }

    fields[field] =
      typeof value === "string" && field !== "profilePicture"
        ? value.trim()
        : value;
  }

  if (fields.email && !EMAIL_PATTERN.test(fields.email)) {
    return {
      error: "Invalid email",
    };
  }

  return { fields };
}

function readProfileFields(req, res) {
  const result = getValidProfileFields(req.body);

  if (result.error) {
    res.status(400).json({ error: result.error });
    return null;
  }

  return result.fields;
}

function isMissingRequiredProfileField(field) {
  return typeof field !== "string" || field.length === 0;
}

// Create a new user profile
async function createProfile(req, res, next) {
  const fields = readProfileFields(req, res);

  if (!fields) {
    return;
  }

  const { firstName, lastName, email, profilePicture } = fields;

  if (
    isMissingRequiredProfileField(firstName) ||
    isMissingRequiredProfileField(lastName) ||
    isMissingRequiredProfileField(email)
  ) {
    return res.status(400).json({
      error: "firstName, lastName, and email are required",
    });
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const existingProfile = await profileRef.get();

    if (existingProfile.exists && existingProfile.data()?.createdAt) {
      return res.status(409).json({
        error: "Profile already exists",
      });
    }

    const profile = {
      firstName,
      lastName,
      email,
      ...(profilePicture !== undefined ? { profilePicture } : {}),
      streak: existingProfile.data()?.streak ?? 0,
      lastActivityDate: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await profileRef.set(profile, { merge: true });
    const savedProfile = await profileRef.get();

    return res.status(201).json({
      data: serializeProfile(savedProfile.data()),
    });
  } catch (error) {
    return next(error);
  }
}

// Get the profile of the authenticated user
async function getProfile(req, res, next) {
  try {
    const snapshot = await getProfileRef(req.userId).get();

    if (!snapshot.exists || !snapshot.data()?.createdAt) {
      return res.status(404).json({
        error: "Profile not found",
      });
    }

    return res.json({
      data: serializeProfile(snapshot.data()),
    });
  } catch (error) {
    return next(error);
  }
}

// Update an existing user profile
async function updateProfile(req, res, next) {
  const updateData = readProfileFields(req, res);

  if (!updateData) {
    return;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      error: "No valid fields to update",
    });
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const snapshot = await profileRef.get();

    if (!snapshot.exists || !snapshot.data()?.createdAt) {
      return res.status(404).json({
        error: "Profile not found",
      });
    }

    await profileRef.update({
      ...updateData,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const updatedProfile = await profileRef.get();

    return res.json({
      data: serializeProfile(updatedProfile.data()),
    });
  } catch (error) {
    return next(error);
  }
}

export { getProfile, createProfile, updateProfile };
