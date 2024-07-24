import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/profile.css";
import AddPatientProfile from "./addPatientProfile";
import Loader from "../components/loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function PatientProfile() {
  const navigate = useNavigate();
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

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure you want to delete your profile?",
      text: "You will lose this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`patient/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            /*const fetchedPatient = response.data.patients;
            setData(fetchedPatient);*/
            MySwal.fire({
              title: "Deleted!",
              text: "Deleted successfully",
              icon: "success",
            });
            navigate("/dashboard");
          })
          .catch((err) => {
            MySwal.fire({
              title: "Error!",
              text: "An error occurred",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <>
    {loading && <Loader />}
    <Navbar />
    <div className="profile-container">
      <h1>Patient Profile</h1>
      {data.length > 0 ? (
        data.map((profile, index) => (
          <div className="profile-card" key={index}>
            <div className="profile-details">
              <div className="profile-section">
                <h2>Personal Information</h2>
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
              </div>
              <div className="profile-section">
                <h2>Medical Information</h2>
                <p>
                  <strong>Diagnosis:</strong> {profile.illness}
                </p>
                <p>
                  <strong>Assigned Doctor:</strong> {profile.doctorfirstname}{" "}
                  {profile.doctorlastname} - {profile.doctoremail}
                </p>
              </div>
            </div>
            <div className="links">
              <Link
                className="edit-link"
                to={`/update-patient-profile/${profile.patientId}`}
              >
                Edit your profile
              </Link>
              <Link
                className="delete-link"
                onClick={() => deleteRecord(profile.patientId)}
              >
                Delete your profile
              </Link>
            </div>
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
