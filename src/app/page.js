"use client";
import { useEffect, useState } from "react";
import { db, ref, get, auth } from "@/lib/firebaseConfig"; // Import auth để kiểm tra người dùng hiện tại
import { onAuthStateChanged } from "firebase/auth";

export default function HomePage() {
  const [databaseData, setDatabaseData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lắng nghe trạng thái đăng nhập
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDatabaseData = async () => {
      if (!user) {
        console.log("Người dùng chưa đăng nhập.");
        return;
      }

      if (!user.email.endsWith("@project.com")) {
        console.log("Bạn không có quyền truy cập cơ sở dữ liệu.");
        return;
      }

      try {
        const snapshot = await get(ref(db, "/home")); // Lấy toàn bộ database
        if (snapshot.exists()) {
          setDatabaseData(snapshot.val());
        } else {
          console.log("Không có dữ liệu trong Realtime Database.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ Firebase:", error);
      }
    };

    if (user) fetchDatabaseData();
  }, [user]);

  if (loading) return <p>Đang kiểm tra quyền truy cập...</p>;

  return (
    <div>
      <h1>Dữ liệu từ Realtime Database</h1>
      {user ? (
        databaseData ? (
          <pre>{JSON.stringify(databaseData, null, 2)}</pre>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )
      ) : (
        <p>Vui lòng đăng nhập để xem dữ liệu.</p>
      )}
    </div>
  );
}
