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
    res.json({ success: false, message: result.error });
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
    isMissingRequiredProfileField(lastName) ||
    isMissingRequiredProfileField(email)
  ) {
    return res.json({
      success: false,
      message: "firstName, lastName, and email are required",
    });
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const existingProfile = await profileRef.get();

    if (existingProfile.exists && existingProfile.data()?.createdAt) {
      return res.json({ success: false, message: "Profile already exists" });
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

    res.json({ success: true, data: serializeProfile(savedProfile.data()) });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error when creating profile" });
  }
};

// Get the user's profile from Firestore 
const getProfile = async (req, res) => {
  try {
    const snapshot = await getProfileRef(req.userId).get();

    if (!snapshot.exists || !snapshot.data()?.createdAt) {
      return res.json({ success: false, message: "Profile not found" });
    }

    res.json({ success: true, data: serializeProfile(snapshot.data()) });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error when getting profile" });
  }
};


// Update the user's profile in Firestore 
const updateProfile = async (req, res) => {
  const updateData = readProfileFields(req, res);

  if (!updateData) {
    return;
  }

  if (Object.keys(updateData).length === 0) {
    return res.json({ success: false, message: "No valid fields to update" });
  }

  try {
    const profileRef = getProfileRef(req.userId);
    const snapshot = await profileRef.get();

    if (!snapshot.exists || !snapshot.data()?.createdAt) {
      return res.json({ success: false, message: "Profile not found" });
    }

    await profileRef.update({
      ...updateData,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const updatedProfile = await profileRef.get();

    res.json({ success: true, data: serializeProfile(updatedProfile.data()) });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error when updating profile" });
  }
};

export { getProfile, createProfile, updateProfile };