import React from "react";
import Logo from "../assets/FES_logo.jfif";

export default function Nav({ user, loading, logout }) {
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "";

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img className="logo--img" src={Logo} alt="Logo" />
          <div className="logo--title">
            <b>Frontend</b> Simplified
          </div>
        </div>
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : (
            user.email && <p>User: {user.email}</p>
          )}
          <button
            onClick={user.email ? logout : null}
            className={`logout-button ${!user.email ? "empty-circle" : ""}`}
          >
            {user.email ? userInitial : ""}
          </button>
        </div>
      </div>
    </nav>
  );
}
