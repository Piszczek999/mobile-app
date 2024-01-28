import admin from "firebase-admin";
import { ServiceAccount, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import credentials from "../ServiceAccountKey.json";

const app = initializeApp({
  credential: admin.credential.cert(credentials as ServiceAccount),
});

export const db: FirebaseFirestore.Firestore = getFirestore(app);
export const auth: admin.auth.Auth = getAuth(app);
