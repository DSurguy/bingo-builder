import { FirebaseApp, initializeApp } from "firebase/app";
console.log(import.meta.env.FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID
};

const appPromise = new Promise<FirebaseApp>((resolve, reject) => {
  try {
    const app = initializeApp(firebaseConfig);
    resolve(app);
  } catch (e) {
    console.error("Failed to initialize firebase app", e);
    reject(e);
  }
});

export default appPromise;