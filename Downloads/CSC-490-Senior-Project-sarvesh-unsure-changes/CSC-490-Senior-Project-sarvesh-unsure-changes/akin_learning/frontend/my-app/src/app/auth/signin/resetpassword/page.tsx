"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {
  const router = useRouter();

  // Set up sliding animation event listeners (if signUp/signIn elements exist)
  useEffect(() => {
    const container = document.getElementById("container");
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");

    const handleSignUpClick = () => {
      container?.classList.add("right-panel-active");
    };
    const handleSignInClick = () => {
      container?.classList.remove("right-panel-active");
    };

    signUpButton?.addEventListener("click", handleSignUpClick);
    signInButton?.addEventListener("click", handleSignInClick);

    return () => {
      signUpButton?.removeEventListener("click", handleSignUpClick);
      signInButton?.removeEventListener("click", handleSignInClick);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you might validate that the new password and confirmation match.
    // For now, we simply redirect back to the sign in page.
    router.push("/auth/signin");
  };

  return (
    <div className="container" id="container">
      {/* Reset Password Form (Left Panel) */}
      <div className="form-container sign-in-container">
        {/* Back button: Navigates back to the forgot password page */}
        <Link href="/auth/signin/forgotpassword">
          <p className="back-button">Back</p>
        </Link>
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <p className="p2">Please enter your new password</p>
          <input type="password" placeholder="New Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit" className="btn primary-btn">
            RESET PASSWORD
          </button>
        </form>
      </div>

      {/* Overlay Container with Animated Border Radius */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Akin Learning</h1>
            <p className="p11">
              An AI personal tutor that will help you in your studies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}