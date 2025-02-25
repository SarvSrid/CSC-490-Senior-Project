"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (!userData) {
      router.push("/auth/signin/signin1");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 text-black min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-black">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <p className="text-black">Completed Topics: 3/10</p>
          <p className="text-black">Current Streak: 5 days</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Available Topics</h2>
          <ul className="space-y-3">
            <li className="text-black transform transition-transform duration-200 hover:scale-105">Python</li>
            <li className="text-black transform transition-transform duration-200 hover:scale-105">Java</li>
            <li className="text-black transform transition-transform duration-200 hover:scale-105">C++</li>
          </ul>
        </div>
      </div>
      <button
        onClick={() => {
          Cookies.remove("user");
          router.push("../auth/signin/signin1");
        }}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}