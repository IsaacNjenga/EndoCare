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
          <h3>
            Empowering you to take charge of your health journey with
            personalized resources and support.
          </h3>
          <br />
          <p>
            Your health is in your hands. Let's make positive choices, together!
          </p>          
        </div>
      </div>
    </>
  );
}

export default Dashboard;
