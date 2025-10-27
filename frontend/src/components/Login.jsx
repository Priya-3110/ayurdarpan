import React, { useState } from "react";
import "./Login.css";
import "boxicons/css/boxicons.min.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, setSignupUser] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const navigate = useNavigate();

  // ✅ Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    const storedPass = localStorage.getItem("pass");

    if (username === storedUser && password === storedPass) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", username);

      // 🔔 force Navbar to update instantly
      window.dispatchEvent(new Event("storage"));

      navigate("/"); // redirect to home
    } else {
      alert("Invalid credentials");
    }
  };

  // ✅ Handle Signup
  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("user", signupUser);
    localStorage.setItem("pass", signupPassword);
    localStorage.setItem("email", signupEmail);

    // 🔔 force Navbar to update instantly after signup
    window.dispatchEvent(new Event("storage"));

    alert("Signup successful! Please login.");
    setIsActive(false); // go back to login
  };

  return (
    <div className={`wrapper ${isActive ? "active" : ""}`}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      {/* Login Form */}
      <div className="form-box login">
        <h2 className="title animation" style={{ "--i": 0, "--j": 21 }}>
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box animation" style={{ "--i": 2, "--j": 23 }}>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 3, "--j": 24 }}
          >
            Login
          </button>

          <div className="linkTxt animation" style={{ "--i": 5, "--j": 25 }}>
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsActive(true)}
                className="register-link"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
          Welcome Back!
        </h2>
        <p className="animation" style={{ "--i": 1, "--j": 21 }}>
         Welcome back! Please login to your account.
        </p>
      </div>

      {/* Register Form */}
      <div className="form-box register">
        <h2 className="title animation" style={{ "--i": 17, "--j": 0 }}>
          Sign Up
        </h2>
        <form onSubmit={handleSignup}>
          <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
            <input
              type="text"
              required
              value={signupUser}
              onChange={(e) => setSignupUser(e.target.value)}
            />
            <label>Username</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
            <input
              type="email"
              required
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <label>Email</label>
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
            <input
              type="password"
              required
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 21, "--j": 4 }}
          >
            Sign Up
          </button>

          <div className="linkTxt animation" style={{ "--i": 22, "--j": 5 }}>
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="login-link"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text register">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
          Welcome Back!
        </h2>
        <p className="animation" style={{ "--i": 18, "--j": 1 }}>
          Create an account to get started!
        </p>
      </div>
    </div>
  );
};

export default Login;
