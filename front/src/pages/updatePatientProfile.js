import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/addPatientProfile.css";

function UpdatePatientProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
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
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log("params id", id);
  console.log("user._id", user._id);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("patients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.success) {
          const fetchedPatient = response.data.patients.find(
            (pat) => pat.patientId === user._id
          );

          setValues({
            firstname: fetchedPatient.firstname,
            lastname: fetchedPatient.lastname,
            email: fetchedPatient.email,
            phone: fetchedPatient.phone,
            address: fetchedPatient.address,
            illness: fetchedPatient.illness,
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching patient:", err);
        toast.error("Error Fetching Information", {
          position: "top-right",
          autoClose: 2000,
        });
        console.log(err);
      });
  }, [user._id]);

  return (
    <>
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
