"use client";
import { useEffect, useState } from "react";
import { db, ref, get, auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [databaseData, setDatabaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("🔹 Đã đăng nhập với tài khoản:", currentUser.email);
      } else {
        console.log("🔸 Chưa đăng nhập hoặc đã đăng xuất.");
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
  
    console.log(`📌 Lấy dữ liệu cho UID: ${user.uid}`); // Debug
  
    const fetchUserData = async () => {
      try {
        const userRef = ref(db, `/users/${user.uid}`);
        const snapshot = await get(userRef);
  
        if (snapshot.exists()) {
          console.log("✅ Dữ liệu Firebase:", snapshot.val());
          setDatabaseData(snapshot.val());
        } else {
          console.log("⚠️ Không tìm thấy dữ liệu cho UID:", user.uid);
        }
      } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu từ Firebase:", error);
      }
    };
  
    fetchUserData();
  }, [user]);
  

  if (loading) return <p>Đang kiểm tra quyền truy cập...</p>;

  return (
    <div>
      <h1>Dữ liệu từ Firebase</h1>
      {user ? (
        <>
          <p><strong>Người dùng:</strong> {user.email}</p>
          {databaseData ? (
            <pre>{JSON.stringify(databaseData, null, 2)}</pre>
          ) : (
            <p>Không có dữ liệu hoặc đang tải...</p>
          )}
        </>
      ) : (
        <p>Vui lòng đăng nhập để xem dữ liệu.</p>
      )}
    </div>
  );
}
