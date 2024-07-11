import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { toast } from "react-toastify";
import "../assets/css/addDiary.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { UserContext } from "../App";

function AddDiary() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const patientId = user._id;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const valuesData = { ...values, patientId };

    axios
      .post("addEntry", valuesData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((result) => {
        if (result.data.success) {
          toast.success("Profile Saved!", {
            position: "top-right",
            autoClose: 2000,
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const formattedTime = new Intl.DateTimeFormat("en-us", {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  }).format(currentDateTime);

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="diary-container">
        <form onSubmit={handleSubmit} className="diary-form">
          <div className="section">
            <p>{formattedTime}</p>
            <br />
            <hr />
            <br />
            <h1 className="section-title">Daily Log</h1>
            <div className="form-group">
              <label>Diagnosis:</label>
              <p>Type-2 Diabetes</p>
            </div>
            <div className="form-group">
              <label htmlFor="glucose-level">
                Blood Glucose Levels (in mg/dL)
              </label>
              <input
                type="text"
                placeholder="Fasting"
                name="fasting"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Pre-Lunch"
                name="pre-lunch"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Post-Lunch"
                name="post-lunch"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Night"
                name="night"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="medication">Medications</label>
              <input
                type="text"
                placeholder="Morning"
                name="morning"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Evening"
                name="evening"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dietary-intake">Dietary Intake</label>
              <textarea
                placeholder="Breakfast"
                name="breakfast"
                onChange={handleChange}
              />
              <textarea
                placeholder="Lunch"
                name="lunch"
                onChange={handleChange}
              />
              <textarea
                placeholder="Snack"
                name="snack"
                onChange={handleChange}
              />
              <textarea
                placeholder="Dinner"
                name="dinner"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="physical-activity">Physical Activity</label>
              <textarea
                placeholder="Exercise"
                name="exercise"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="symptoms">Symptoms Today</label>
              <textarea
                placeholder="Symptoms"
                name="symptoms"
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div className="section">
            <h1 className="section-title">Medical Information</h1>
            <br />
            <br />
            <div className="form-group">
              <label>Treatment Plan</label>
              <p>The doctor will fill these on their end</p>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div className="section">
            <h1 className="section-title">Mental and Emotional Health</h1>
            <br />
            <br />
            <div className="form-group">
              <label htmlFor="mood">Mood today</label>
              <textarea
                placeholder="Mood"
                name="mood"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stress">Stress Management</label>
              <textarea
                placeholder="Stress Management"
                name="stress"
                onChange={handleChange}
              />
            </div>
            <br />
            <hr />
            <br />
            <div className="form-group">
              <label>Support</label>
              <p>
                Local diabetes support group meets every{" "}
                <b>
                  <u>first Monday</u>
                </b>{" "}
                of the month
              </p>
            </div>
            <div className="form-group">
              <label>Counselling Session</label>
              <p>
                Your next session scheduled for{" "}
                <u>
                  <b> July 15, 2024</b>
                </u>
              </p>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default AddDiary;
