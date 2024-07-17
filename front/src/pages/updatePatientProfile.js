import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/addPatientProfile.css";
import Loader from "../components/loader";
import Select from "react-select";

function UpdatePatientProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
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
    setValues({ ...values, [e.target.name]: e.target.value });
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
    e.preventDefault();
    setLoading(true);
    const valuesData = { ...values, patientId: user._id };
    axios
      .put(`update-patient/${id}`, valuesData, {
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
      .catch((err) => {
        console.error("Error updating profile:", err);
        toast.error("Failed to update profile", {
          position: "top-right",
          autoClose: 2000,
        });
      })
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

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      width: "600px",
    }),
  };

  const doctorsOptions = doctors.map((doctor) => ({
    value: doctor.doctorId,
    label: `${doctor.firstname} ${doctor.lastname} | ${doctor.email} - (${doctor.specialization})`,
  }));

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="update-patient-form">
          <div className="form-group">
            <div className="input-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
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
                  <label htmlFor="male">Male</label>
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
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={values.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="illness">Illness</label>
              <select
                id="illness"
                name="illness"
                value={values.illness}
                onChange={handleChange}
                required
              >
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
          <button type="submit" className="btn-save">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdatePatientProfile;
