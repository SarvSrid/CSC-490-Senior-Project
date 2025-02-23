"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if the user is logged in
    const userData = Cookies.get("user");
    if (!userData) {
      // Redirect to the sign-in page if not logged in
      router.push("/auth/signin");
    } else {
      // Set the user data
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button
        onClick={() => {
          Cookies.remove("user");
          router.push("/auth/signin");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}