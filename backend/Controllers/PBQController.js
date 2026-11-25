import { db } from "../config/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

const getPBQAttemptsRef = (userId) =>
  db.collection("users").doc(userId).collection("pbqAttempts");

const savePBQAttempt = async (req, res, next) => {
  try {
    const { pbqId } = req.params;
    const { score, maxPoints } = req.body ?? {};

    const isValid =
      typeof pbqId === "string" &&
      Number.isFinite(score) &&
      Number.isFinite(maxPoints) &&
      maxPoints > 0 &&
      score >= 0 &&
      score <= maxPoints;

    if (!isValid) {
      return res.status(400).json({ error: "Invalid request payload" });
    }

    const attempt = {
      pbqId,
      score,
      maxPoints,
      percentage: Math.round((score / maxPoints) * 100),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await getPBQAttemptsRef(req.userId).doc(pbqId).set(attempt, { merge: true });

    return res.json({ data: { id: pbqId, ...attempt } });
  } catch (error) {
    next(error);
  }
};

const getPBQAttempts = async (req, res, next) => {
  try {
    const snapshot = await getPBQAttemptsRef(req.userId).get();
    return res.json({ data: snapshot.docs.map((doc) => doc.data()) });
  } catch (error) {
    next(error);
  }
};

export { savePBQAttempt, getPBQAttempts };