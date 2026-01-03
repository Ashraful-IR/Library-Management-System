"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") router.push("/LogIn");
  }, [router]);

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    router.push("/LogIn");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin ✅</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
