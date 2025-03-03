import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { auth } from "@/lib/firebaseConfig";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
      console.error("Thiếu id_token từ Google");
      return false;
    },
    async session({ session, token }) {
      session.user.uid = token.uid || "";
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.uid;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
    