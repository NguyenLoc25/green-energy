import { auth } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

/**
 * Tạo user mới trong Firebase Authentication
 * @param {string} email
 * @param {string} password
 * @returns {object} Thông tin user
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Trả về user nếu đăng ký thành công
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    throw new Error(error.message);
  }
};

/**
 * Đăng nhập với Google bằng Firebase Authentication
 * @returns {object} Thông tin user
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Trả về user nếu đăng nhập thành công
  } catch (error) {
    console.error("Lỗi đăng nhập Google:", error.message);
    throw new Error(error.message);
  }
};
