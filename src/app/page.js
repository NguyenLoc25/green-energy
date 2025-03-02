"use client";
import { useEffect, useState } from "react";
import { database, ref, onValue, auth, signInWithEmailAndPassword, update } from "@/firebaseConfig";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Đăng nhập vào Firebase
    signInWithEmailAndPassword(auth, "energy@project.com", "VLTH123")
      .then(() => {
        console.log("Đăng nhập thành công!");

        // Cập nhật dữ liệu mới vào Firebase
        const energyRef = ref(database, "energy");
        update(energyRef, {
          water: {
            current: "500mA",
            voltage: "12V",
            power: "6W"
          },
          wind: {
            current: "300mA",
            voltage: "9V",
            power: "2.7W"
          }
        })
          .then(() => console.log("Dữ liệu water & wind đã được cập nhật"))
          .catch((err) => console.error("Lỗi cập nhật dữ liệu:", err));

        // Lấy dữ liệu sau khi cập nhật
        onValue(energyRef, (snapshot) => {
          setData(snapshot.val());
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Lỗi đăng nhập:", error.message);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Dữ liệu Năng lượng</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p>Lỗi: {error}</p>
      ) : (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <h2>{key.toUpperCase()}</h2>
              <p><b>Dòng điện:</b> {value.current}</p>
              <p><b>Điện áp:</b> {value.voltage}</p>
              <p><b>Công suất:</b> {value.power}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
