import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/addPatientProfile.css";
import Loader from "../components/loader";

function UpdatePatientProfile() {
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
    illness: "",
  });

  const options = [
    "Type-1 Diabetes",
    "Type-2 Diabetes",
    "Adrenal Fatigue",
    "Polycystic Ovary Syndrome (PCOS)",
    "Cortisol & Aldosterone Deficiency",
  ];

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value || e.target.id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const valuesData = { ...values, patientId: user._id };
    axios
      .put("update-patient/" + id, valuesData, {
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
      .get("patients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.patients);
          const fetchedPatient = response.data.patients.find(
            (pat) => pat.patientId === user._id
          );

          if (fetchedPatient) {
            setValues({
              firstname: fetchedPatient.firstname,
              lastname: fetchedPatient.lastname,
              email: fetchedPatient.email,
              gender: fetchedPatient.gender,
              phone: fetchedPatient.phone,
              address: fetchedPatient.address,
              illness: fetchedPatient.illness,
            });
          } else {
            toast.error("Patient not found", {
              position: "top-right",
              autoClose: 2000,
            });
          }
        } else {
          toast.error("Failed to fetch patient data", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching patient:", err);
        toast.error("Error Fetching Information", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user._id]);

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="form-container">
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
                  name="gender"
                  id="Male"
                  value={values.gender || ""}
                  onChange={handleChange}
                  className="form-radio"
                />
                <label htmlFor="male" className="form-radio-label">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value={values.gender || ""}
                  id="Female"
                  onChange={handleChange}
                  className="form-radio"
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
              <label htmlFor="illness">Illness</label>
              <input
                type="text"
                placeholder="Enter your current illness"
                name="illness"
                onChange={handleChange}
                value={values.illness || ""}
              />
            </div>
            <div>
              <select name="illness" onChange={handleChange}>
                <option value="" disabled>
                  Select Condition
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

export default UpdatePatientProfile;
