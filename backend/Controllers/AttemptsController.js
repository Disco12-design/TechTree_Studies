
import { db } from "../config/firebase.js";

// Get the attempts collection for a specific user
function getUserAttempts(userId) {
  return db.collection("users").doc(userId).collection("attempts");
}


// CREATE ATTEMPT
export async function createAttempt(req, res, next) {
  try {
    const {id,code,title, mode,score, total, date,correct, incorrect, unanswered, incorrectQuestions, reviewQuestions,average
    } = req.body;

    // Check required fields
    if (!id || !code || !title || !mode || !date) {
      return res.status(400).json({
        error: "Please provide all required fields"
      });
    }

    // Check the attempt mode
    if (mode !== "practice" && mode !== "real") {
      return res.status(400).json({
        error: "Mode must be practice or real"
      });
    }

    // Check the scores
    if (
      typeof total !== "number" ||
      total <= 0 ||
      typeof score !== "number" ||
      score < 0 ||
      score > total
    ) {
      return res.status(400).json({
        error: "Invalid score or total"
      });
    }

    // Check the number of questions
    if (
      !Number.isInteger(correct) || correct < 0 ||
      !Number.isInteger(incorrect) || incorrect < 0 ||
      !Number.isInteger(unanswered) || unanswered < 0
    ) {
      return res.status(400).json({
        error: "Invalid question counts"
      });
    }

    // Check the date format
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      isNaN(new Date(date)) ||
      new Date(date).toISOString().startsWith(date) === false
    ) {
      return res.status(400).json({
        error: "Date must be YYYY-MM-DD"
      }); 
    }

    // Create the attempt object
    const attempt = {
      id,
      code,
      title,
      mode,
      score,
      total,
      date,
      correct,
      incorrect,
      unanswered,
      average
    };

    // Add question details if they exist
    if (incorrectQuestions !== undefined) {
      if (!Array.isArray(incorrectQuestions)) {
        return res.status(400).json({
          error: "incorrectQuestions must be an array"
        });
      }

      attempt.incorrectQuestions = incorrectQuestions;
    }

    if (reviewQuestions !== undefined) {
      if (!Array.isArray(reviewQuestions)) {
        return res.status(400).json({
          error: "reviewQuestions must be an array"
        });
      }

      attempt.reviewQuestions = reviewQuestions;
    }

    // Save the attempt in Firebase
    await getUserAttempts(req.userId).doc(id).set(attempt);

    return res.status(201).json({
      data: attempt
    });

  } catch (error) {
    next(error);
  }
}


// GET ALL ATTEMPTS
export async function getAttempts(req, res, next) {
  try {
    const snapshot = await getUserAttempts(req.userId)
      .orderBy("date", "desc")
      .get();

    const attempts = snapshot.docs.map(doc => doc.data());

    return res.status(200).json({
      data: attempts
    });

  } catch (error) {
    next(error);
  }
}


// GET ONE ATTEMPT
export async function getAttempt(req, res, next) {
  try {
    const { id } = req.params;

    if (!id || id.includes("/")) {
      return res.status(400).json({
        error: "Invalid attempt id"
      });
    }

    const attempt = await getUserAttempts(req.userId).doc(id).get();

    if (!attempt.exists) {
      return res.status(404).json({
        error: "Attempt not found"
      });
    }

    return res.status(200).json({
      data: attempt.data()
    });

  } catch (error) {
    next(error);
  }
}


// DELETE ONE ATTEMPT
export async function deleteAttempt(req, res, next) {
  try {
    const { id } = req.params;

    if (!id || id.includes("/")) {
      return res.status(400).json({
        error: "Invalid attempt id"
      });
    }

    const attempt = getUserAttempts(req.userId).doc(id);

    const result = await attempt.get();

    if (!result.exists) {
      return res.status(404).json({
        error: "Attempt not found"
      });
    }

    await attempt.delete();

    return res.status(204).end();

  } catch (error) {
    next(error);
  }
}
