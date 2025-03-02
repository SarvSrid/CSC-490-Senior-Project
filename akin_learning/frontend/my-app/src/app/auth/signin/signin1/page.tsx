"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function SignInSignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleMockLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Clear any previous error messages

    try {
      // Simulate a login request (replace with actual API call if needed)
      if (username === "user" && password === "user123") {
        // Save user data to cookies
        Cookies.set(
          "user",
          JSON.stringify({ id: "1", name: username, email: `${username}@example.com` }), // Ensure id is set
          { expires: 1 }
        );

        // Redirect to the dashboard
        router.push("/user/dashboard");
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Show the popup
    setShowPopup(true);
    // Hide the popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="container" id="container">
      {/* Sign In Form (Left Panel) */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleMockLogin}>
          <h1>Welcome Back!</h1>
          <p className="p2">Enter your username and password to sign in.</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
          <a className="forgot-password" href="/auth/signin/forgotpassword">
            Forgot your password?
          </a>
          <button type="submit" className="btn primary-btn">
            Sign In
          </button>
          {/* <a href="/login/google" className="btn primary-btn">
            Sign In with Google
          </a> */}
        </form>
      </div>

      {/* Sign Up Form (Right Panel) */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUp}>
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