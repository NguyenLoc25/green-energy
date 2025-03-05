"use client";
import { useState, useEffect } from "react";
import { signInWithGoogle, loginUser, getUserInfo, logoutUser } from "@/lib/user";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUserInfo();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await signInWithGoogle();
      setUser(googleUser);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <div className="flex flex-col items-center">
          <img src={user.photoURL || "/default-avatar.png"} alt="Avatar" className="w-16 h-16 rounded-full" />
          <p className="text-xl font-bold">{user.displayName || user.email}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mt-2">Đăng xuất</button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" required />
            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" required />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Đăng nhập</button>
          </form>
          <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-2 rounded mt-2">Đăng nhập với Google</button>
        </>
      )}
    </div>
  );
}
