import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/addPatientProfile.css";
import Loader from "../components/loader";

function UpdateDoctorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value || e.target.id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const valuesData = { ...values, doctorId: user._id };
    axios
      .put("update-doctor/" + id, valuesData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((result) => {
        if (result.data.success) {
          toast.success("Profile Saved!", {
            position: "top-right",
            autoClose: 2000,
          });
          navigate("/profile");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`doctors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.success) {
          const fetchedDoctor = response.data.doctors.find(
            (doc) => doc.doctorId === user._id
          );
          if (fetchedDoctor) {
            setValues({
              firstname: fetchedDoctor.firstname,
              lastname: fetchedDoctor.lastname,
              email: fetchedDoctor.email,
              gender: fetchedDoctor.gender,
              phone: fetchedDoctor.phone,
              address: fetchedDoctor.address,
              specialization: fetchedDoctor.specialization,
            });
          } else {
            toast.error("Doctor not found", {
              position: "top-right",
              autoClose: 2000,
            });
          }
        } else {
          toast.error("Failed to fetch doctor data", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching doctor:", err);
        toast.error("Error Fetching Information", {
          position: "top-right",
          autoClose: 2000,
        });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user._id]);

  const options = [
    "Diabetes Specialist",
    "Adrenal Disease Specialist",
    "PCOS Specialist",
    "Endocrinologist",
  ];

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="profile-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                name="firstname"
                onChange={handleChange}
                value={values.firstname || ""}
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                name="lastname"
                onChange={handleChange}
                value={values.lastname || ""}
              />
            </div>
            <label className="form-label">Gender</label>
            <div className="gender-options">
              <div>
                <input
                 type="radio"
                 id="male"
                 name="gender"
                 value="Male"
                 checked={values.gender === "Male"}
                 onChange={handleChange}
                />
                <label htmlFor="male" className="form-radio-label">
                  Male
                </label>
              </div>
              <div>
                <input
                   type="radio"
                   id="female"
                   name="gender"
                   value="Female"
                   checked={values.gender === "Female"}
                   onChange={handleChange}
                />
                <label htmlFor="female" className="form-radio-label">
                  Female
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter email address"
                name="email"
                onChange={handleChange}
                value={values.email || ""}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                placeholder="Enter phone number"
                name="phone"
                onChange={handleChange}
                value={values.phone || ""}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                name="address"
                onChange={handleChange}
                value={values.address || ""}
              />
            </div>
            <div>
              <label htmlFor="specialization">Specialization</label>
              <select
                name="specialization"
                onChange={handleChange}
                value={values.specialization || ""}
                className="form-input"
              >
                <option value="" disabled>
                  Select Your Specialization
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default UpdateDoctorProfile;
