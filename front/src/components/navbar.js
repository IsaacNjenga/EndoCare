import React, { useContext } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import userProfile from "../assets/icons/profile.png";
import appointmentIcon from "../assets/icons/appointment.png";
import logoutIcon from "../assets/icons/logout.png";
import journalIcon from "../assets/icons/journal.png";
import loginIcon from "../assets/icons/login.png";
import resourcesIcon from "../assets/icons/resources.png";
import signupIcon from "../assets/icons/signup.png";

export default function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-container">
           
            <span className="navbar-title">ENDOCARE</span>
          </div>
        </Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/profile" className="navbar-link navbar-item">
              <img src={userProfile} alt="user" className="navbar-user-icon" />
              <span>{user.name}</span>
            </Link>
            {user.role === "patient" ? (
              <Link to="/diary" className="navbar-link">
                <img
                  src={journalIcon}
                  alt="user"
                  className="navbar-user-icon"
                />
                My Journal
              </Link>
            ) : (
              <Link to="/diary" className="navbar-link">
                <img
                  src={journalIcon}
                  alt="user"
                  className="navbar-user-icon"
                />
                Journals
              </Link>
            )}
            {user.role === "patient" ? (
              <Link to="/resources" className="navbar-link">
                <img
                  src={resourcesIcon}
                  alt="user"
                  className="navbar-user-icon"
                />
                Resources
              </Link>
            ) : null}

            <Link to="/appointments" className="navbar-link">
              <img
                src={appointmentIcon}
                alt="user"
                className="navbar-user-icon"
              />
              Appointments
            </Link>
            <Link to="/logout" className="navbar-link">
              <img src={logoutIcon} alt="user" className="navbar-user-icon" />
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="navbar-link">
              <img src={signupIcon} alt="user" className="navbar-user-icon" />
              Sign Up
            </Link>
            <Link to="/login" className="navbar-link">
              <img src={loginIcon} alt="user" className="navbar-user-icon" />
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
