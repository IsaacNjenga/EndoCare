import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { toast } from "react-toastify";
import "../assets/css/addDiary.css";
import axios from "axios";
import bloodSugarIcon from "../assets/icons/blood-sugar.png";
import symptomsIcon from "../assets/icons/symptoms.png";
import medicationIcon from "../assets/icons/medication.png";
import exerciseIcon from "../assets/icons/exercise.png";
import dietIcon from "../assets/icons/diet.png";
import mentalIcon from "../assets/icons/mental.png";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import { UserContext } from "../App";

function UpdateDiary() {
  const { id } = useParams();
  console.log(id);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [doctorId, setDoctorId] = useState(0);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [values, setValues] = useState({
    fasting: "",
    prelunch: "",
    postlunch: "",
    night: "",
    morning: "",
    evening: "",
    breakfast: "",
    lunch: "",
    snack: "",
    dinner: "",
    exercise: "",
    symptoms: "",
    mood: "",
    stress: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get("patients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const fetchedProfile = response.data.patients;
      setData(fetchedProfile);
      setDoctorId(fetchedProfile[0].doctorId.toString());
      setFirstname(fetchedProfile[0].firstname.toString());
      setLastname(fetchedProfile[0].lastname.toString());
      setDiagnosis(fetchedProfile[0].illness.toString());
    } catch (error) {
      alert("Error fetching profile");
      console.error("Error fetching patient profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const valuesData = {
      ...values,
      patientId: user._id,
      doctorId,
      firstname,
      lastname,
      illness: diagnosis,
    };

    try {
      const result = await axios.put(`update-entry/${id}`, valuesData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (result.data.success) {
        toast.success("Entry Saved!", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/diary");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating!");
    } finally {
      setLoading(false);
    }
  };

  const fetchDiary = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get("entries", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        console.log("Fetched Entries:", response.data.results);

        const fetchedDiary = response.data.results.find(
          (diary) => id === diary._id && diary.patientId === user._id
        );
        console.log("the id", response.data.results._id);

        if (fetchedDiary) {
          console.log("Diary Entry ID:", fetchedDiary._id);
          setValues({
            fasting: fetchedDiary.fasting || "",
            prelunch: fetchedDiary.prelunch || "",
            postlunch: fetchedDiary.postlunch || "",
            night: fetchedDiary.night || "",
            morning: fetchedDiary.morning || "",
            evening: fetchedDiary.evening || "",
            breakfast: fetchedDiary.breakfast || "",
            lunch: fetchedDiary.lunch || "",
            snack: fetchedDiary.snack || "",
            dinner: fetchedDiary.dinner || "",
            exercise: fetchedDiary.exercise || "",
            symptoms: fetchedDiary.symptoms || "",
            mood: fetchedDiary.mood || "",
            stress: fetchedDiary.stress || "",
          });
        } else {
          console.log("No matching diary entry found");
        }
      } else {
        console.log("Failed to fetch diary entries");
      }
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchDiary();
    }
  }, [user._id, id]);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
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
            {data.map((profile, index) => (
              <div key={index}>
                <p>
                  <strong>First Name:</strong> {profile.firstname}
                </p>
                <p>
                  <strong>Last Name:</strong> {profile.lastname}
                </p>
                <p>
                  <strong>Gender:</strong> {profile.gender}
                </p>
                <p>
                  <strong>Diagnosis:</strong>
                  {profile.illness}
                </p>
                <p>
                  <strong>Assigned Doctor:</strong>
                  {profile.doctorfirstname} {profile.doctorlastname}
                </p>
              </div>
            ))}
            <br />
            <hr />
            <br />
            <h1 className="section-title">Daily Log</h1>
            <div className="form-group">
              <label htmlFor="glucose-level">
                <img src={bloodSugarIcon} alt="icon" className="icon" />
                Blood Glucose Levels (in mg/dL)
              </label>
              <input
                type="text"
                placeholder="Fasting"
                name="fasting"
                onChange={handleChange}
                value={values.fasting}
              />
              <input
                type="text"
                placeholder="Pre-Lunch"
                name="prelunch"
                onChange={handleChange}
                value={values.prelunch}
              />
              <input
                type="text"
                placeholder="Post-Lunch"
                name="postlunch"
                onChange={handleChange}
                value={values.postlunch}
              />
              <input
                type="text"
                placeholder="Night"
                name="night"
                onChange={handleChange}
                value={values.night}
              />
            </div>
            <div className="form-group">
              <label htmlFor="medication">
                <img src={medicationIcon} alt="icon" className="icon" />
                <span>Medications</span>
              </label>
              <input
                type="text"
                placeholder="Morning"
                name="morning"
                onChange={handleChange}
                value={values.morning}
              />
              <input
                type="text"
                placeholder="Evening"
                name="evening"
                onChange={handleChange}
                value={values.evening}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dietary-intake">
                <img src={dietIcon} alt="icon" className="icon" />
                <span>Dietary Intake</span>
              </label>
              <textarea
                placeholder="Breakfast"
                name="breakfast"
                onChange={handleChange}
                value={values.breakfast}
              />
              <textarea
                placeholder="Lunch"
                name="lunch"
                onChange={handleChange}
                value={values.lunch}
              />
              <textarea
                placeholder="Snack"
                name="snack"
                onChange={handleChange}
                value={values.snack}
              />
              <textarea
                placeholder="Dinner"
                name="dinner"
                onChange={handleChange}
                value={values.dinner}
              />
            </div>
            <div className="form-group">
              <label htmlFor="physical-activity">
                <img src={exerciseIcon} alt="icon" className="icon" />
                <span>Physical Activity</span>
              </label>
              <textarea
                placeholder="Exercise"
                name="exercise"
                onChange={handleChange}
                value={values.exercise}
              />
            </div>
            <div className="form-group">
              <label htmlFor="symptoms">
                <img src={symptomsIcon} alt="icon" className="icon" />
                <span>Symptoms Today</span>
              </label>
              <textarea
                placeholder="Symptoms"
                name="symptoms"
                onChange={handleChange}
                value={values.symptoms}
              />
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
              <label htmlFor="mood">
                <img src={mentalIcon} alt="icon" className="icon" />
                Mood today
              </label>
              <textarea
                placeholder="Mood"
                name="mood"
                onChange={handleChange}
                value={values.mood}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stress">Stress Management</label>
              <textarea
                placeholder="Stress Management"
                name="stress"
                onChange={handleChange}
                value={values.stress}
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

export default UpdateDiary;
