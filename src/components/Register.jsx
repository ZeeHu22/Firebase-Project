import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ register }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await register(email, password);
        navigate("/"); // Redirect to home after successful registration
      } catch (error) {
        console.error("Registration failed:", error);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
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
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="redirect">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
