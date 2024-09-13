import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to home after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
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
        <button type="submit">Sign In</button>
      </form>
      <div className="redirect">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
