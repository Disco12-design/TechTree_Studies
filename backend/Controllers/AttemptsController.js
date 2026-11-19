import { db } from "../config/firebase.js";

const getUserAttempts = (userId) =>
  db.collection("users").doc(userId).collection("attempts");

const sendError = (res, status, error) => res.status(status).json({ error });

const isCount = (n) => Number.isInteger(n) && n >= 0;

const isNonEmptyString = (value, maxLength) =>
  typeof value === "string" &&
  value.trim().length > 0 &&
  value.length <= maxLength;

const isValidId = (id) =>
  isNonEmptyString(id, 128) && !id.includes("/") && !id.includes("\\");

const isValidDate = (date) =>
  typeof date === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(date) &&
  !Number.isNaN(Date.parse(`${date}T00:00:00.000Z`)) &&
  new Date(date).toISOString().startsWith(date);

const isValidScore = (score, total) =>
  Number.isFinite(score) &&
  Number.isFinite(total) &&
  typeof total === "number" &&
  total > 0 &&
  typeof score === "number" &&
  score >= 0 &&
  score <= total;

const isStringArray = (value) =>
  Array.isArray(value) &&
  value.length <= 20 &&
  value.every((item) => isNonEmptyString(item, 500));

const isValidReviewQuestion = (question) => {
  if (!question || typeof question !== "object" || Array.isArray(question)) {
    return false;
  }

  return (
    Number.isInteger(question.id) &&
    (question.number === undefined ||
      (Number.isInteger(question.number) && question.number > 0)) &&
    isNonEmptyString(question.question, 5000) &&
    isStringArray(question.userAnswer) &&
    isStringArray(question.correctAnswer) &&
    typeof question.isCorrect === "boolean" &&
    (question.explanation === undefined ||
      (typeof question.explanation === "string" &&
        question.explanation.length <= 10000))
  );
};

const createAttempt = async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return sendError(res, 400, "Request body must be an object");
    }

    const {
      id, code, title, mode, score, total, date,
      correct, incorrect, unanswered, average, reviewQuestions,
    } = req.body;

    if (!isValidId(id)) {
      return sendError(res, 400, "Invalid attempt id");
    }
    if (!isNonEmptyString(code, 50) || !isNonEmptyString(title, 200)) {
      return sendError(res, 400, "Please provide all required fields");
    }
    if (mode !== "practice" && mode !== "real") {
      return sendError(res, 400, "Mode must be practice or real");
    }
    if (!isValidScore(score, total)) {
      return sendError(res, 400, "Invalid score or total");
    }
    if (![correct, incorrect, unanswered].every(isCount)) {
      return sendError(res, 400, "Invalid question counts");
    }
    if (!isValidDate(date)) {
      return sendError(res, 400, "Date must be YYYY-MM-DD");
    }
    if (
      average !== undefined &&
      (!Number.isFinite(average) || average < 0 || average > total)
    ) {
      return sendError(res, 400, "Invalid average");
    }
    if (
      reviewQuestions !== undefined &&
      (!Array.isArray(reviewQuestions) ||
        reviewQuestions.length > 500 ||
        !reviewQuestions.every(isValidReviewQuestion))
    ) {
      return sendError(res, 400, "Invalid reviewQuestions");
    }
    if (
      reviewQuestions !== undefined &&
      reviewQuestions.length !== correct + incorrect + unanswered
    ) {
      return sendError(
        res,
        400,
        "reviewQuestions length must match the question counts",
      );
    }

    const attempt = {
      id,
      code: code.trim(),
      title: title.trim(),
      mode,
      score,
      total,
      date,
      correct,
      incorrect,
      unanswered,
      ...(average !== undefined && { average }),
      ...(reviewQuestions !== undefined && { reviewQuestions }),
    };

    await getUserAttempts(req.userId).doc(id).set(attempt);

    return res.status(201).json({ data: attempt });
  } catch (error) {
    next(error);
  }
};

const getAttempts = async (req, res, next) => {
  try {
    const snapshot = await getUserAttempts(req.userId)
      .orderBy("date", "desc")
      .get();

    return res.json({ data: snapshot.docs.map((doc) => doc.data()) });
  } catch (error) {
    next(error);
  }
};

const getAttempt = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return sendError(res, 400, "Invalid attempt id");

    const snap = await getUserAttempts(req.userId).doc(id).get();
    if (!snap.exists) return sendError(res, 404, "Attempt not found");

    return res.json({ data: snap.data() });
  } catch (error) {
    next(error);
  }
};

const deleteAttempt = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return sendError(res, 400, "Invalid attempt id");

    const ref = getUserAttempts(req.userId).doc(id);
    const snap = await ref.get();
    if (!snap.exists) return sendError(res, 404, "Attempt not found");

    await ref.delete();

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};


export { createAttempt, getAttempts, getAttempt, deleteAttempt };