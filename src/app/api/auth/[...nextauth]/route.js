import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "@/lib/firebaseConfig";
import { signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = userCredential.user;
          return { id: user.uid, email: user.email };
        } catch (error) {
          console.error("Lỗi đăng nhập bằng email:", error);
          throw new Error("Đăng nhập thất bại! Kiểm tra lại thông tin.");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google" && account.id_token) {
        const credential = GoogleAuthProvider.credential(account.id_token);
        try {
          await signInWithCredential(auth, credential);
          return true;
        } catch (error) {
          console.error("Lỗi Firebase:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      session.user.uid = token.uid || "";
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
