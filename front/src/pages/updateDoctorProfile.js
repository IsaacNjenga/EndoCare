import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/addPatientProfile.css";

function UpdateDoctorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`doctors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.success) {
          const fetchedDoctor = response.data.doctors.find(
            (doc) => doc.doctorId === user._id
          );
          setValues({
            firstname: fetchedDoctor.firstname,
            lastname: fetchedDoctor.lastname,
            email: fetchedDoctor.email,
            phone: fetchedDoctor.phone,
            address: fetchedDoctor.address,
            specialization: fetchedDoctor.specialization,
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
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                placeholder="Enter your specialization"
                name="specialization"
                onChange={handleChange}
                value={values.specialization || ""}
              />
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default UpdateDoctorProfile;
