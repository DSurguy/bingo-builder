import appPromise from './firebaseApp';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, UserInfo } from "firebase/auth";
import { atom } from 'recoil';
import firebaseAppPromise from '../store/firebaseApp';
import { getUserInfoFromUser } from '../utils/firebase';

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

export const authenticatedUserState = atom<UserInfo | null>({
  key: 'authenticatedUser',
  default: new Promise((resolve, reject) => {
    let removeObserver = () => {};
    firebaseAppPromise.then(app => {
      removeObserver = onAuthStateChanged(getAuth(app), user => {
        resolve(user ? getUserInfoFromUser(user) : null);
      })
    }).catch((e) => {
      reject(e)
    }).finally(() => {
      removeObserver();
    })
  })
})

export const manuallySignOutAndReload = () => {
  indexedDB.databases().then(databases => {
    for( let db of databases ) {
      if( db.name?.toLowerCase().includes("firebase") ) indexedDB.deleteDatabase(db.name);
    }
    window.location.reload();
  })
}