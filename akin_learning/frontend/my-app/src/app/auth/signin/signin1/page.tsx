// src/app/auth/signin/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function SignInSignUp() {
  const router = useRouter();

  // Set up the sliding overlay behavior after the component mounts
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

  const handleMockLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save mock user data to cookies
    Cookies.set(
      "user",
      JSON.stringify({ name: "Test User", email: "test@example.com" }),
      { expires: 1 }
    );
    // Redirect to the dashboard
    router.push("/user/dashboard");
  };

  return (
    <div className="container" id="container">
      {/* Sign In Form (Left Panel) */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleMockLogin}>
          <h1>Welcome Back!</h1>
          <p className="p2">Enter your username and password to sign in.</p>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <a className="forgot-password" href="/auth/signin/forgotpassword">
            Forgot your password?
          </a>
          <button type="submit" className="btn primary-btn">
            Sign In
          </button>
        </form>
      </div>

      {/* Sign Up Form (Right Panel) */}
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Your Account</h1>
          <p className="p2">Fill in the details below to get started.</p>
          <div className="form-row">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Contact No" required />
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="btn primary-btn">
            Sign Up
          </button>
        </form>
      </div>

      {/* Overlay Container */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Akin Learning</h1>
            <p className="p1">
              An AI personal tutor that will help you in your studies
            </p>
            <p>New to our platform? Sign Up now.</p>
            <button className="btn ghost-btn" id="signIn" type="button">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Akin Learning</h1>
            <p className="p1">
              An AI personal tutor that will help you in your studies
            </p>
            <p>Already have an account? Sign In now.</p>
            <button className="btn ghost-btn" id="signUp" type="button">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
