import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/profile.css";
import AddPatientProfile from "./addPatientProfile";
import Loader from "../components/loader";

function PatientProfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get("patients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const fetchedProfile = response.data.patients;
      setData(fetchedProfile);
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="profile-container">
        <h1>Patient Profile</h1>
        {data.length > 0 ? (
          data.map((profile, index) => (
            <div className="profile-card" key={index}>
              <p>
                <strong>First Name:</strong> {profile.firstname}
              </p>
              <p>
                <strong>Last Name:</strong> {profile.lastname}
              </p>
              <p>
                <strong>Gender:</strong> {profile.gender}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}
              </p>
              <p>
                <strong>Diagnosis:</strong> {profile.illness}
              </p>
              <p>
                <strong>Assigned Doctor:</strong> {profile.doctorfirstname}{" "}
                {profile.doctorlastname} - {profile.doctoremail}
              </p>
              <Link
                className="edit-link"
                to={`/update-patient-profile/${profile.patientId}`}
              >
                Edit
              </Link>
            </div>
          ))
        ) : (
          <AddPatientProfile />
        )}
      </div>
    </>
  );
}

export default PatientProfile;
