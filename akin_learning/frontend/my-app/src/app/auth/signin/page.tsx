"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function SignIn() {
  const router = useRouter();

  const handleMockLogin = () => {
    // Save mock user data to cookies
    Cookies.set("user", JSON.stringify({ name: "Test User", email: "test@example.com" }), { expires: 1 });
    // Redirect to the dashboard
    router.push("../user/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <button
        onClick={handleMockLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Mock Login
      </button>
    </div>
  );
}