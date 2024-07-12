import React from "react";
import Navbar from "../components/navbar";
import "../assets/css/dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="contact-container">
          <h2>Welcome to Your Health Dashboard</h2>
          <p>Empowering you to take charge of your health journey with personalized resources and support.</p>
          {/* Add more content or components as needed */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
