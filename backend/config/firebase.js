import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";

const keyPath = new URL("./firebase-key.json", import.meta.url);
const serviceAccount = JSON.parse(readFileSync(keyPath, "utf8"));

const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert(serviceAccount) });

export const db = getFirestore(app);
export const auth = getAuth(app);
