import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/storage';
import 'firebase/functions';
import 'firebase/analytics';

const env = process.env;

export const firebaseConfig = {
    apiKey: env.REACT_APP_API_KEY,
    authDomain: env.REACT_APP_AUTH_DOMAIN,
    databaseURL: env.REACT_APP_DATABASE_URL,
    projectId: env.REACT_APP_PROJECT_ID,
    storageBucket: env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
    appId: env.REACT_APP_APP_ID,
    measurementId: env.REACT_APP_MEASUREMENT_ID,
};

// Firebaseを紐付け、初期化
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  if (process.env.NODE_ENV === 'production') {
    firebase.analytics();
  }
}

export const storage = firebase.storage();
export const functions = firebase.app().functions('asia-northeast1');
export default firebase;