import React from "react";
import Navbar from "./navbar";
import "../assets/css/patientLandingPage.css";
import doc from "../assets/images/doc.jpg";

function PatientLandingPage() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <br/>
        <h1 className="dashboard-title">Welcome to EndoCare</h1>
        <div className="contact-container">
          <div className="welcome-container">
            <h3>
              Empowering you to take charge of your health journey with
              personalized resources and support.
            </h3>
            <p>
              Your health is in your hands. Let's make positive choices,
              together!
            </p>
            <div className="content">
              <p>
                EndoCare will provide you with all the tools you need to monitor
                and manage your health. Explore features like:
              </p>
              <ul>
                <li>Tracking your health metrics</li>
                <li>Scheduling appointments</li>
                <li>Accessing personalized health tips</li>
                <li>Communicating with your healthcare providers</li>
              </ul>
              <p>Stay healthy and stay informed!</p>
            </div>
          </div>
          <div className="image-container">
            <img src={doc} alt="doc" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientLandingPage;
