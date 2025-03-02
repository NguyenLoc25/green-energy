// src/auth.js
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Đăng ký
export const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

// Đăng nhập
export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// Đăng xuất
export const logOut = async () => {
  await signOut(auth);
};
