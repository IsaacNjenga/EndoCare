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
            <button className="link-btn">
              <Link to="/profile" className="navbar-link">
                {user.name}
              </Link>
            </button>
            <button className="link-btn">
              <Link to="/diary" className="navbar-link">
                My Journal
              </Link>
            </button>
            <button className="link-btn">
              <Link to="/resources" className="navbar-link">
                Resources
              </Link>
            </button>
            <button className="link-btn">
              <Link to="/appointments" className="navbar-link">
                Appointments
              </Link>
            </button>
            <button className="link-btn">
              <Link to="/logout" className="navbar-link">
                Logout
              </Link>
            </button>
          </>
        ) : (
          <>
            <button className="link-btn">
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </button>
            <button className="link-btn">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
