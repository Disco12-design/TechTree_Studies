import { db } from "../config/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

async function saveAttempt(userId, pbqId, payload) {
  if (
    typeof userId !== "string" ||
    typeof pbqId !== "string" ||
    !payload ||
    typeof payload !== "object" ||
    !Number.isFinite(payload.score) ||
    !Number.isFinite(payload.maxPoints) ||
    payload.maxPoints <= 0 ||
    payload.score < 0 ||
    payload.score > payload.maxPoints
  ) {
    const error = new Error("Invalid request payload");
    error.status = 400;
    throw error;
  }

  const attempt = {
    pbqId,
    score: payload.score,
    maxPoints: payload.maxPoints,
    percentage: Math.round((payload.score / payload.maxPoints) * 100),
    updatedAt: FieldValue.serverTimestamp(),
  };

  try {
    const docRef = db
      .collection("users")
      .doc(userId)
      .collection("pbqAttempts")
      .doc(pbqId);
    await docRef.set(attempt, { merge: true });
    return { id: docRef.id, ...attempt };
  } catch (cause) {
    console.error("Failed to save PBQ attempt:", cause);
    const error = new Error("Unable to save PBQ attempt");
    error.status = 500;
    throw error;
  }
}

async function savePBQAttempt(req, res, next) {
  try {
    const attempt = await saveAttempt(req.userId, req.params.pbqId, req.body);
    return res.status(200).json({ data: attempt });
  } catch (error) {
    return next(error);
  }
}

async function getPBQAttempts(req, res, next) {
  try {
    const snapshot = await db
      .collection("users")
      .doc(req.userId)
      .collection("pbqAttempts")
      .get();

    return res.json({ data: snapshot.docs.map((doc) => doc.data()) });
  } catch (error) {
    return next(error);
  }
}

export { saveAttempt, savePBQAttempt, getPBQAttempts };
