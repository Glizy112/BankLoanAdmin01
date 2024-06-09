import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM-EDgGylG77dEr1oEoNRXuHaJcEES1qg",
  authDomain: "loan-eligibility-check-app.firebaseapp.com",
  projectId: "loan-eligibility-check-app",
  storageBucket: "loan-eligibility-check-app.appspot.com",
  messagingSenderId: "529279825265",
  appId: "1:529279825265:web:9eb1cd37441e275614b2d0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();

export const signIn = async (email, password) => {
  const checkSignIn = await auth.signInWithEmailAndPassword(email, password);
  return checkSignIn;
};

export const signOut = async () => {
  const checkSignOut = await auth.signOut();
  return checkSignOut;
};

export const getAllExecutives = async () => {
  const data = await db.collection("Executives").get();
  return data;
};

export const getAllTasks = async () => {
  const data = await db.collection("Tasks").limit(8).get();
  return data;
};

export const getAllVisits = async() => {
  const data = await db.collection("Visits").limit(8).get();
  return data;
}

export const update = async (data, collectionName) => {
  await db.collection(collectionName).add({ data });
};

export const updateExecutives = async (data, collectionName) => {
  if (data.Name !== undefined) {
    await db.collection(collectionName).add(data);
  }
};

export const updateTask = async (id, data) => {
  await db.collection("Tasks").doc(id).update({ data });
};

export const updateVisits = async (id, data) => {
  await db.collection("Visits").doc(id).update({ data });
};

export const deleteTask = async(id, collectionName) => {
  await db.collection(collectionName).doc(id).delete();
}
