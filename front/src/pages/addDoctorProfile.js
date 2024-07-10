import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddDoctorProfile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [values, setValues] = useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valuesData = { ...values, doctorId: user._id };
    axios
      .post("createDoctor", valuesData, {
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name </label>
        <input
          type="text"
          placeholder="Enter first name"
          name="firstname"
          onChange={handleChange}
        />
        <label htmlFor="lastname">Last Name </label>
        <input
          type="text"
          placeholder="Enter last name"
          name="lastname"
          onChange={handleChange}
        />
        <label htmlFor="firstname">Email </label>
        <input
          type="text"
          placeholder="Enter email address"
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone </label>
        <input
          type="text"
          placeholder="Enter phone number"
          name="phone"
          onChange={handleChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          placeholder="Enter your address"
          name="address"
          onChange={handleChange}
        />
        <label htmlFor="illness">Specialization</label>
        <input
          type="text"
          placeholder="Enter your current specialization"
          name="specialization"
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default AddDoctorProfile;
