"use client";

import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

export default function SignInSignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Email:", email, "Password:", password);
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.ok) {
        router.push('/user/dashboard'); // Client-side redirect
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Sign-in error:", error); // Logs the error for debugging
      setErrorMessage("Network error - please try again");
    }
  };


  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    const data = await response.json();
    if (response.ok) {
      // Show the popup
    setShowPopup(true);
    // Hide the popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
    setErrorMessage(null)
    } else {
      setErrorMessage(`Signup failed: ${data.error}`);
    }
  };

  return (
    <div className="container" id="container">
      {/* Sign In Form (Left Panel) */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignIn}>
          <h1>Welcome Back!</h1>
          <p className="p2">Enter your username and password to sign in.</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a className="forgot-password" href="/auth/signin/forgotpassword">
            Forgot your password?
          </a>
          <a href="http://localhost:5000/api/google/send" className="btn primary-btn">
            Sign In with Google
          </a>
          <button type="submit" className="btn primary-btn">
            Sign In
          </button>
        </form>
      </div>

      {/* Sign Up Form (Right Panel) */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUp}>
          <h1>Create Your Account</h1>
          <p className="p2">Fill in the details below to get started.</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-row">

            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>
          <div className="form-row">
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </div>
          <a href="http://localhost:5000/api/google/send" className="btn primary-btn">
            Sign Up with Google
          </a>
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

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Account Created Successfully!</h2>
            <p>You have successfully created an account.</p>
          </div>
        </div>
      )}
    </div>
  );
}