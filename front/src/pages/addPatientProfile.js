import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../assets/css/addPatientProfile.css";
import Loader from "../components/loader";
import Select from "react-select";

function AddPatientProfile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = [
    "Type-1 Diabetes",
    "Type-2 Diabetes",
    "Adrenal Fatigue",
    "Polycystic Ovary Syndrome (PCOS)",
    "Cortisol & Aldosterone Deficiency",
  ];

  useEffect(() => {
    setLoading(true);
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`doctors`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const fetchedDoctors = Array.isArray(response.data.doctors)
          ? response.data.doctors
          : [];
        setDoctors(fetchedDoctors);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching doctors", error);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value || e.target.id });
  };

  const handleDoctorSelection = (selectedOption) => {
    const selectedDoctor = doctors.find(
      (doctor) => doctor.doctorId === selectedOption.value
    );

    if (selectedDoctor) {
      setValues((prev) => ({
        ...prev,
        doctorId: selectedDoctor.doctorId,
        doctorfirstname: selectedDoctor.firstname,
        doctorlastname: selectedDoctor.lastname,
        doctoremail: selectedDoctor.email,
      }));
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const valuesData = { ...values, patientId: user._id };
    axios
      .post("createPatient", valuesData, {
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

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      width: "800px",
    }),
  };

  const doctorsOptions = doctors.map((doctor) => ({
    value: doctor.doctorId,
    label: `${doctor.firstname} ${doctor.lastname} | ${doctor.email} - (${doctor.specialization})`,
  }));

  return (
    <>
      {loading && <Loader />}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Patient's Profile</h2>
          <br />
          <hr />
          <br />
          <div className="form-group">
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                name="firstname"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                name="lastname"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="form-label">Gender:</label>
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
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter email address"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                placeholder="Enter phone number"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                name="address"
                onChange={handleChange}
              />
            </div>

            <div>
              <div>
                <label htmlFor="illness">Condition</label>
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
              <br />
              <div className="input-group">
                <label htmlFor="doctor">Preferred Doctor</label>
                <Select
                  styles={customStyles}
                  options={doctorsOptions}
                  onChange={handleDoctorSelection}
                  value={doctorsOptions.find(
                    (option) => option.value === values.doctorId
                  )}
                />
              </div>
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default AddPatientProfile;
