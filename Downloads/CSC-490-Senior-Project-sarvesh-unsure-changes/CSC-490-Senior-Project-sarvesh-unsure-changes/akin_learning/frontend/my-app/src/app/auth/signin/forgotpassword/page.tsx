"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPassword() {
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

  // Handle the form submission: navigate to the reset password page
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/auth/signin/resetpassword");
  };

  return (
    <div className="container" id="container">
      {/* Sign In Form (Left Panel) */}
      <div className="form-container sign-in-container">
        {/* Back button */}
        <Link href="/auth/signin/signin1">
          <p className="back-button">Back</p>
        </Link>
        <form onSubmit={handleSubmit}>
          <h1>Forgot password</h1>
          <p className="p2">Please enter your username</p>
          <input type="text" placeholder="username" required />
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
