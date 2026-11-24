// Frontend PBQ controller – provides functions to interact with the PBQ backend API.
// Adjust the BASE_URL if your API is hosted under a different prefix.

const BASE_URL = "/api/pbq"; // Assuming Next.js API route or Express endpoint

/**
 * Helper to handle JSON responses and throw on non‑2xx status.
 */
async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PBQ API error ${res.status}: ${text}`);
  }
  // Some endpoints may return no body (e.g., DELETE). Guard against empty.
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await res.json()) as any;
  }
  return null;
}

/** Get the list of PBQs. */
export async function getPBQs(): Promise<any[]> {
  const res = await fetch(BASE_URL, { method: "GET", headers: { "Accept": "application/json" } });
  return (await handleResponse(res)) as any[];
}

/** Create a new PBQ. */
export async function createPBQ(payload: Record<string, unknown>): Promise<any> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await handleResponse(res);
}

/** Update an existing PBQ by its ID. */
export async function updatePBQ(id: string, payload: Record<string, unknown>): Promise<any> {
  const url = `${BASE_URL}/${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await handleResponse(res);
}

/** Delete a PBQ by its ID. */
export async function deletePBQ(id: string): Promise<void> {
  const url = `${BASE_URL}/${encodeURIComponent(id)}`;
  const res = await fetch(url, { method: "DELETE" });
  await handleResponse(res);
}

/** Get a single PBQ by ID. */
export async function getPBQ(id: string): Promise<any> {
  const url = `${BASE_URL}/${encodeURIComponent(id)}`;
  const res = await fetch(url, { method: "GET", headers: { "Accept": "application/json" } });
  return await handleResponse(res);
}
