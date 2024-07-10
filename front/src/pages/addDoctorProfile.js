import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../assets/css/addDoctorProfile.css";
import Loader from "../components/loader";

function AddDoctorProfile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value || e.target.id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
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
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container">
        <h2 className="title">Set Up Your Profile</h2>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            name="firstname"
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            name="lastname"
            onChange={handleChange}
            className="form-input"
          />
          <label className="form-label">Gender</label>
          <div className="gender-options">
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
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
                value="female"
                id="female"
                onChange={handleChange}
                className="form-radio"
              />
              <label htmlFor="female" className="form-radio-label">
                Female
              </label>
            </div>
          </div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            name="email"
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            name="phone"
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter your address"
            name="address"
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="specialization" className="form-label">
            Specialization
          </label>
          <input
            type="text"
            placeholder="Enter your current specialization"
            name="specialization"
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="form-button">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default AddDoctorProfile;
