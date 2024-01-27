import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import credentials from "../ServiceAccountKey.json" assert { type: "json" };
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

const app = initializeApp({
  credential: admin.credential.cert(credentials),
});

export const db = getFirestore(app);
export const auth = getAuth(app);
