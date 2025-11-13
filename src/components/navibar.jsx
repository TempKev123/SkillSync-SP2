import React from "react";
import { Link, useLocation } from "react-router-dom";
//import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">SkillSync AU</div>
      <ul className="nav-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">Profile</Link>
        </li>
        <li className={location.pathname === "/login" ? "active" : ""}>
          <Link to="/login">Login</Link>
        </li>
        <li className={location.pathname === "/error" ? "active" : ""}>
          <Link to="/tytytytyt">error</Link>
        </li>
      </ul>
    </nav>
  );
}
