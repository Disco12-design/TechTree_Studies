import type { ExamAttempt } from "./storage";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, "") ??
  "http://localhost:5000";

type GetToken = () => Promise<string | null>;

export type BackendProfile = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string | null;
  streak?: number;
};

export class BackendError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "BackendError";
  }
}

/** Calls the backend and returns the `data` field of the response. */
async function request<T>(
  path: string,
  getToken: GetToken,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const token = await getToken();
  if (!token) throw new BackendError("You must be signed in", 401);

  const response = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body !== undefined && { "Content-Type": "application/json" }),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const json = await response.json().catch(() => null);
    throw new BackendError(
      json?.error ?? `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return (await response.json()).data;
}

export const getBackendProfile = (getToken: GetToken) =>
  request<BackendProfile>("/api/profile/get-user", getToken);

export async function saveBackendProfile(
  getToken: GetToken,
  profile: BackendProfile,
) {
  const exists = await getBackendProfile(getToken).then(
    () => true,
    (error) => {
      if (error instanceof BackendError && error.status === 404) return false;
      throw error;
    },
  );

  return request<BackendProfile>(
    exists ? "/api/profile/update-user" : "/api/profile/create-user",
    getToken,
    exists ? "PUT" : "POST",
    profile,
  );
}

export async function getOrCreateBackendProfile(
  getToken: GetToken,
  clerkUser: { firstName: string | null; lastName: string | null; primaryEmailAddress: { emailAddress: string } | null; imageUrl: string | null },
): Promise<BackendProfile> {
  try {
    return await getBackendProfile(getToken);
  } catch (error) {
    if (error instanceof BackendError && error.status === 404) {
      const newProfile: BackendProfile = {
        firstName: clerkUser.firstName || "User",
        lastName: clerkUser.lastName || "",
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        profilePicture: clerkUser.imageUrl || null,
      };
      return await saveBackendProfile(getToken, newProfile);
    }
    throw error;
  }
}

export const getBackendAttempts = (getToken: GetToken) =>
  request<ExamAttempt[]>("/api/attempts", getToken);

export const saveBackendAttempt = (getToken: GetToken, attempt: ExamAttempt) =>
  request<ExamAttempt>("/api/attempts", getToken, "POST", attempt);

export const deleteBackendAttempt = async (
  getToken: GetToken,
  attemptId: string,
): Promise<void> => {
  const token = await getToken();
  if (!token) throw new BackendError("You must be signed in", 401);

  const response = await fetch(`${BACKEND_URL}/api/attempts/${attemptId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const json = await response.json().catch(() => null);
    throw new BackendError(
      json?.error ?? `Failed to delete attempt with status ${response.status}`,
      response.status,
    );
  }
};