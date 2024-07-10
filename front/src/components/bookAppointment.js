import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { toast } from "react-toastify";
import "../assets/css/bookAppointment.css";
import axios from "axios";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function BookAppointment() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
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
    const fetchDoctors = async () => {
      setLoading(true);
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
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/createAppointment", values, {
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
    }),
  };

  const doctorsOptions = doctors.map((doctor) => ({
    value: doctor.doctorId,
    label: `${doctor.firstname} ${doctor.lastname} - (${doctor.specialization})`,
  }));

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <h2 className="form-title">Book an Appointment</h2> <br />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={handleChange}
              value={values.firstname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={handleChange}
              value={values.lastname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input
              type="email"
              placeholder="E-mail Address"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
          </div>
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
            <input
              type="text"
              placeholder="Services Interested"
              name="service"
              onChange={handleChange}
              value={values.service}
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctor">Which doctor would you prefer?</label>
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
            Create Appointment
          </button>
        </form>
      </div>
    </>
  );
}

export default BookAppointment;
