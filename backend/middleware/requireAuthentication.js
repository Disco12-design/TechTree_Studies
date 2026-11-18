import { getAuth } from "@clerk/express";

export function requireAuthentication(req, res, next) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      error: "Authentication required",
      message: "Provide a valid Clerk session token in the Authorization header",
    });
  }

  req.userId = userId;
  return next();
}
