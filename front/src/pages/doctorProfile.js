import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/profile.css";
import AddDoctorProfile from "./addDoctorProfile";
import { UserContext } from "../App";
import Loader from "../components/loader";

function DoctorProfile() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get("doctors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const fetchedProfile = response.data.doctors.filter(
        (doctor) => doctor.doctorId === user._id
      );
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
        <h1>Doctor Profile</h1>
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
                <strong>specialization:</strong> {profile.specialization}
              </p>
              <Link
                className="edit-link"
                to={`/update-doctor-profile/${profile.doctorId}`}
              >
                Edit
              </Link>
            </div>
          ))
        ) : (
          <AddDoctorProfile />
        )}
      </div>
    </>
  );
}

export default DoctorProfile;
