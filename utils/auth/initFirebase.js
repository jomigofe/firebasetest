import * as firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"
import "firebase/firestore"

// Make sure it hasn't already been initialized
if (!firebase.apps.length) {
  // console.log('process ',process.env.FIREBASE_PROJECT_ID)
  firebase.initializeApp({

    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })
}

export default firebase


/*
import * as firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"
import "firebase/firestore"

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

export default function initFirebase() {
  if (!firebase.apps.length) {
    return firebase.initializeApp(config)
  }
}
*/