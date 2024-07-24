import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import { toast } from "react-toastify";
import "../assets/css/bookAppointment.css";
import axios from "axios";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { UserContext } from "../App";

function BookAppointment() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    date: "",
    time: "",
    service: "",
    doctorId: "",
    doctorfirstname: "",
    doctorlastname: "",
  });

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
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("patients", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const fetchedProfile = response.data.patients;
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Error fetching patient profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
    fetchUserProfile();
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
    const valuesData = {
      ...values,
      email: user.email,
      firstname: profile[0].firstname,
      lastname: profile[0].lastname,
    };
    axios
      .post("/createAppointment", valuesData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((result) => {
        if (result.data.success) {
          toast.success(`Appointment booked!`, {
            position: "top-right",
            autoClose: 2000,
          });
          navigate("/appointments");
        }
      })
      .catch((err) => console.log(err));
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      width: "600px",
      color: "black",
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
      <br />
      <div className="appointment-form-container">
        <form onSubmit={handleSubmit} className="appointment-form">
          <h2 className="form-title">Book an Appointment</h2>
          {profile.map((person, index) => (
            <div key={index} className="patient-info">
              <div className="name">
                <div className="form-group">
                  <label htmlFor="firstname">First Name:</label>
                  <p>{person.firstname}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name:</label>
                  <p>{person.lastname}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <p>{person.gender}</p>
                </div>
              </div>
              <br />
              <hr />
              <br />
              <div className="details">
                <div className="form-group">
                  <label htmlFor="email">E-mail Address:</label>
                  <p>{user.email}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <p>{person.phone}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <p>{person.address}</p>
                </div>
              </div>
              <br />
              <div className="details">
                <div className="form-group">
                  <label htmlFor="illness">Diagnosis:</label>
                  <p>{person.illness}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="form-group">
            <label htmlFor="date">Set Appointment Date</label>
            <input
              type="date"
              placeholder="Appointment Date"
              name="date"
              onChange={handleChange}
              value={values.date}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              placeholder="Appointment Time"
              name="time"
              onChange={handleChange}
              value={values.time}
            />
          </div>
          <div className="form-group">
            <label htmlFor="service">
              What services are you interested in?
            </label>
            <textarea
              placeholder="Type here"
              name="service"
              onChange={handleChange}
              value={values.service}
            />
          </div>
          <div className="form-group">
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
          <button type="submit" className="submit-button">
            Book Appointment
          </button>
        </form>
      </div>
    </>
  );
}

export default BookAppointment;
