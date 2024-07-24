import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/doctorProfile.css";
import AddDoctorProfile from "./addDoctorProfile";
import { UserContext } from "../App";
import Loader from "../components/loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function DoctorProfile() {
  const navigate = useNavigate();
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
          .delete(`doctor/${id}`, {
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
        <h2>My Profile</h2>
        <br />
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
                <strong>Specialization:</strong> {profile.specialization}
              </p>
              <div className="links">
                <Link
                  className="edit-link"
                  to={`/update-doctor-profile/${profile.doctorId}`}
                >
                  Edit Profile
                </Link>
                <Link
                  className="delete-link"
                  onClick={() => deleteRecord(profile.doctorId)}
                >
                  Delete Profile
                </Link>
              </div>
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
