import appPromise from './firebaseApp';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function testAuth() {
  appPromise.then(app => {
    const auth = getAuth(app);
    const credentials = {
      email: import.meta.env.VITE_FIREBASE_TEST_USER_EMAIL,
      password: import.meta.env.VITE_FIREBASE_TEST_USER_PASSWORD,
    }
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(creds => console.log(creds))
      .catch(e => console.error("Error signing in", e));
  });
}