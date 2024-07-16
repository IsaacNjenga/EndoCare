import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "../assets/css/dashboard.css";
import { UserContext } from "../App";
import axios from "axios";
import Loader from "../components/loader";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileExistence, setProfileExistence] = useState(false);

  useEffect(() => {
    if (!user || !user._id) {
      return;
    }

    const userId = user._id.toString();

    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get("patients", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const fetchedProfile = response.data.patients;
        setProfile(fetchedProfile);

        const userProfile = fetchedProfile.find(
          (profile) => profile.patientId && profile.patientId.toString() === userId
        );

        if (userProfile) {
          setProfileExistence(true);
        }
      } catch (error) {
        console.error("Error fetching patient profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <>
      {loading && <Loader />}
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
          {profileExistence ? null : (
            <p>
              Get started by setting up your own profile{" "}
              <Link to="/profile/add-patient-profile">here</Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
