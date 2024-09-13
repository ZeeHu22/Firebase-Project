import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/FES_logo.jfif";

export default function Nav({ user, loading, logout }) {
  const navigate = useNavigate();
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "";

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img className="logo--img" src={Logo} alt="Logo" />
            <div className="logo--title">
              <b>Frontend</b> Simplified
            </div>
          </Link>
        </div>
        <div className="row">
          {/* Display loading if still fetching user data */}
          {loading ? (
            <p>Loading...</p>
          ) : user.email ? (
            // If the user is logged in, show their email and logout button
            <>
              <p><b>User:</b> {user.email}</p>
              <button onClick={handleLogout} className="logout-button">
                {userInitial}
              </button>
            </>
          ) : (
            // If the user is not logged in, show "Login" and "Register" buttons
            <>
              <Link to="/login" className="nav__btn">
                Login
              </Link>
              <Link to="/register" className="nav__btn nav__btn--primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
