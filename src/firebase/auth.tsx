// auth.tsx

import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "./firebase";

// Google Sign-In
export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return { user, token };
  } catch (error: any) {
    console.error(error);
    return { error };
  }
};

// Email/Password Sign-In
export const emailSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { user };
  } catch (error: any) {
    console.error(error);
    return { error };
  }
};

// Sign-Up with Email/Password
export const emailSignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { user };
  } catch (error: any) {
    console.error(error);
    return { error };
  }
};

// Sign-Out
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error };
  }
};

// Get Current User
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
