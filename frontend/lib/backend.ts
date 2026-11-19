import type { ExamAttempt } from "./storage";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, "") ??
  "http://localhost:5000";

type GetToken = () => Promise<string | null>;

export class BackendError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "BackendError";
  }
}

async function request<T>(
  path: string,
  getToken: GetToken,
  options: RequestInit = {},
): Promise<T> {
  const token = await getToken();

  if (!token) {
    throw new BackendError("You must be signed in to use the backend", 401);
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // Keep the status-based message when the server did not return JSON.
    }

    throw new BackendError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export type BackendProfile = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string | null;
};

export async function getBackendProfile(
  getToken: GetToken,
): Promise<BackendProfile> {
  const response = await request<{ data: BackendProfile }>(
    "/api/profile/get-user",
    getToken,
  );
  return response.data;
}

export async function saveBackendProfile(
  getToken: GetToken,
  profile: BackendProfile,
): Promise<BackendProfile> {
  let method = "PUT";

  try {
    await getBackendProfile(getToken);
  } catch (error) {
    if (!(error instanceof BackendError) || error.status !== 404) {
      throw error;
    }
    method = "POST";
  }

  const endpoint =
    method === "POST" ? "/api/profile/create-user" : "/api/profile/update-user";
  const response = await request<{ data: BackendProfile }>(endpoint, getToken, {
    method,
    body: JSON.stringify(profile),
  });

  return response.data;
}

export async function getBackendAttempts(
  getToken: GetToken,
): Promise<ExamAttempt[]> {
  const response = await request<{ data: ExamAttempt[] }>(
    "/api/attempts",
    getToken,
  );
  return response.data;
}

export async function saveBackendAttempt(
  getToken: GetToken,
  attempt: ExamAttempt,
): Promise<ExamAttempt> {
  const response = await request<{ data: ExamAttempt }>("/api/attempts", getToken, {
    method: "POST",
    body: JSON.stringify(attempt),
  });
  return response.data;
}
