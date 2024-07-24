import React from 'react';
import Navbar from "../components/navbar";
import '../assets/css/doctorLandingPage.css';
import doctorImage from '../assets/images/doctor.jpg';

function DoctorLandingPage() {
  return (
    <>
      <Navbar />
      <div className="landing-page">
        <div className="intro-container">
          <div className="text-content">
            <h1>Welcome to your practice</h1>
            <p>
              Dedicated to providing exceptional healthcare with a personalized approach.
            </p>
            <ul>
              <li>Comprehensive health assessments</li>
              <li>Preventative care and wellness</li>
              <li>Chronic disease management</li>
              <li>Advanced diagnostics and treatments</li>
            </ul>
          </div>
          <div className="image-content">
            <img src={doctorImage} alt="Doctor" />
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorLandingPage;
