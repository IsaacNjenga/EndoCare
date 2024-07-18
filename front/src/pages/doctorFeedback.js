import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import { UserContext } from "../App";
import axios from "axios";
import "../assets/css/doctorFeedback.css";

function DoctorFeedback() {
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDiary = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get("/api/allEntries", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const fetchedDiary = response.data.results.filter(
          (diary) => diary.doctorId === user._id
        );
        if (fetchedDiary) {
          setData(fetchedDiary);
        }
      }
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user._id) {
      fetchDiary();
    }
  }, [user._id]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Feedback submitted:", values);
    // Submit feedback logic here
  };

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="doctor-feedback">
        <div className="container">
          <h1 className="title">Doctor Feedback</h1>
          <form onSubmit={handleSubmit} className="feedback-form">
            {data.map((content, index) => (
              <div key={index} className="entry">
                <div className="entry-header">
                  <p>
                    <strong>Patient Name:</strong> {content.firstname}{" "}
                    {content.lastname}
                  </p>
                  <p>
                    <strong>Diagnosis:</strong> {content.illness}
                  </p>
                </div>
                <div className="entry-section">
                  <h2>Blood Sugar Levels</h2>
                  <div className="section-content">
                    <h3>Fasting</h3>
                    <p>{content.fasting}</p>
                    <h3>Pre-Lunch</h3>
                    <p>{content.prelunch}</p>
                    <h3>Post-Lunch</h3>
                    <p>{content.postlunch}</p>
                    <h3>Night</h3>
                    <p>{content.night}</p>
                  </div>
                  <div className="feedback-section">
                    <h3>Observations</h3>
                    <textarea
                      name="bloodSugarObservation"
                      onChange={handleChange}
                    />
                    <h3>Recommendations</h3>
                    <textarea
                      name="bloodSugarRecommendation"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="entry-section">
                  <h2>Medication</h2>
                  <div className="section-content">
                    <h3>Morning</h3>
                    <p>{content.morning}</p>
                    <h3>Evening</h3>
                    <p>{content.evening}</p>
                  </div>
                  <div className="feedback-section">
                    <h3>Feedback</h3>
                    <textarea
                      name="medicationFeedback"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="entry-section">
                  <h2>Meals & Diet</h2>
                  <div className="section-content">
                    <h3>Breakfast</h3>
                    <p>{content.breakfast}</p>
                    <h3>Lunch</h3>
                    <p>{content.lunch}</p>
                    <h3>Snack</h3>
                    <p>{content.snack}</p>
                    <h3>Dinner</h3>
                    <p>{content.dinner}</p>
                  </div>
                  <div className="feedback-section">
                    <h3>Feedback</h3>
                    <textarea name="mealsFeedback" onChange={handleChange} />
                  </div>
                </div>
                <div className="entry-section">
                  <h2>Symptoms Today</h2>
                  <div className="section-content">
                    <h3>Symptoms</h3>
                    <p>{content.symptoms}</p>
                  </div>
                  <div className="feedback-section">
                    <h3>Feedback</h3>
                    <textarea name="symptomsFeedback" onChange={handleChange} />
                  </div>
                </div>
                <div className="entry-section">
                  <h2>Well-Being & Physical Health</h2>
                  <div className="section-content">
                    <h3>Exercise</h3>
                    <p>{content.exercise}</p>
                    <h3>Mood</h3>
                    <p>{content.mood}</p>
                    <h3>Stress</h3>
                    <p>{content.stress}</p>
                  </div>
                  <div className="feedback-section">
                    <h3>Observations</h3>
                    <textarea
                      name="wellBeingObservation"
                      onChange={handleChange}
                    />
                    <h3>Recommendations</h3>
                    <textarea
                      name="wellBeingRecommendation"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="entry-section">
                  <h2>Overall Assessment & Next Steps</h2>
                  <textarea name="overallAssessment" onChange={handleChange} />
                </div>
              </div>
            ))}
            <button type="submit" className="feedback-btn">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DoctorFeedback;
