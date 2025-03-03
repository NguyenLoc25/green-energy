"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignIn = async () => {
    try {
      const result = await signIn("credentials", { 
        email, 
        password, 
        redirect: false 
      });

      if (result.error) {
        alert("Đăng nhập thất bại: " + result.error);
      } else {
        alert("Đăng nhập thành công!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  return (
    <div>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleEmailSignIn}>Sign in with Email</button>
      </div>
    </div>
  );
}
