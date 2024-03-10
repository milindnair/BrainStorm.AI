import {getFirestore, doc, setDoc, serverTimestamp, collection, DocumentData, getDoc} from "firebase/firestore";
import {app} from "../utils/Firebaseconfig";

export const firestore = getFirestore(app);

export const usersCollection = collection(firestore, "users");

export const createUser = async (user:any) => {
    try {
      const userRef = doc(firestore, "users", user.uid); // Use user.uid as the document ID
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        lastSeen: serverTimestamp(),
        // You can add more user data fields as needed
      };
  
      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to handle it in your component
    }
  };