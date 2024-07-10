import React, { useContext } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import diabetesIcon from "../assets/icons/diabetes.png";

export default function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-container">
            <img
              src={diabetesIcon}
              alt="img-diabetes"
              className="navbar-icon"
            />
          </div>
          <span>
            <u>ENDOCARE</u>
          </span>
        </Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/profile" className="navbar-link">
              {user.name}
            </Link>
            <Link to="/diary" className="navbar-link">
              My Journal
            </Link>
            <Link to="/resources" className="navbar-link">
              Resources
            </Link>
            <Link to="/appointments" className="navbar-link">
              Appointments
            </Link>
            <Link to="/logout" className="navbar-link">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
