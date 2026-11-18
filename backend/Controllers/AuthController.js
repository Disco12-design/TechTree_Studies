import { clerkClient, getAuth } from "@clerk/express";

export async function getCurrentUser(req, res) {
  const { userId, sessionId } = getAuth(req);

  try {
    const user = await clerkClient.users.getUser(userId);
    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId,
    );

    return res.json({
      user: {
        id: user.id,
        sessionId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: primaryEmail?.emailAddress ?? null,
        imageUrl: user.imageUrl,
      },
    });
  } catch (error) {
    console.error("Failed to retrieve authenticated Clerk user:", error);
    return res.status(502).json({
      error: "Authentication provider unavailable",
    });
  }
}
