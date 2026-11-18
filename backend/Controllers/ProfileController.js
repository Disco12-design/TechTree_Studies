import { db } from "../config/firebase.js";

const profiles = db.collection("profiles");


// POST localhost:5000/api/profile/create-user
const createProfile = async (req, res) => {
  const { firstName, lastName, email, profilePicture = null } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      success: false,
      message: "firstName, lastName, and email required",
    });
  }

  try {
    const now = new Date();
    const profile = {
      firstName,
      lastName,
      email,
      profilePicture,
      streak: 0,
      lastActivityDate: now,
      createdAt: now,
    };

    const { id: userId } = await profiles.add(profile);

    res.status(201).json({
      success: true,
      message: "Profile created",
      userId,
      data: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating profile",
    });
  }
};


// GET localhost:5000/api/profile/get-user?userId=xxx
const getProfile = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId required",
    });
  }

  try {
    const snap = await profiles.doc(userId).get();

    if (!snap.exists) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const { lastActivityDate, createdAt, ...profile } = snap.data();

    res.json({
      success: true,
      data: {
        ...profile,
        lastActivityDate: lastActivityDate.toDate(),
        createdAt: createdAt.toDate(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving profile",
    });
  }
};

// PUT localhost:5000/api/profile/update-user
const updateProfile = async (req, res) => {
  const { userId, firstName, lastName, email, profilePicture } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId required",
    });
  }

  // Keep only the fields that were actually sent
  const updateData = Object.fromEntries(
    Object.entries({ firstName, lastName, email, profilePicture }).filter(
      ([, value]) => value !== undefined
    )
  );

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No fields to update",
    });
  }

  try {
    const profileRef = profiles.doc(userId);
    const snap = await profileRef.get();

    if (!snap.exists) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    await profileRef.update(updateData);

    res.json({
      success: true,
      message: "Profile updated",
      data: updateData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
};

export { getProfile, createProfile, updateProfile };