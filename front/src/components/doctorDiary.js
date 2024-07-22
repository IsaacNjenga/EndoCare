import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../assets/css/diary.css";
import bloodSugarIcon from "../assets/icons/blood-sugar.png";
import symptomsIcon from "../assets/icons/symptoms.png";
import medicationIcon from "../assets/icons/medication.png";
import exerciseIcon from "../assets/icons/exercise.png";
import dietIcon from "../assets/icons/diet.png";
import axios from "axios";
import { format } from "date-fns";
import Loader from "./loader";
import { UserContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function DoctorDiary() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedFeedbackEntry, setSelectedFeedbackEntry] = useState(null);
  const [feedbackContent, setFeedbackContent] = useState(false);
  const [values, setValues] = useState({
    bloodSugarObservation: "",
    bloodSugarRecommendation: "",
    medicationFeedback: "",
    mealsFeedback: "",
    symptomsFeedback: "",
    wellBeingObservation: "",
    wellBeingRecommendation: "",
    overallAssessment: "",
    doctorfirstname: "",
    doctorlastname: "",
    diaryId: "",
    doctorId: "",
  });

  const fetchDiary = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get("allEntries", {
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

  const fetchFeedback = async (diaryId) => {
    try {
      const result = await axios.get("feedback", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const fetchedFeedback = result.data.feedback.find(
        (feedback) =>
          feedback.doctorId === user._id && feedback.diaryId === diaryId
      );
      if (fetchedFeedback) {
        setValues({
          bloodSugarObservation: fetchedFeedback.bloodSugarObservation || "",
          bloodSugarRecommendation:
            fetchedFeedback.bloodSugarRecommendation || "",
          medicationFeedback: fetchedFeedback.medicationFeedback || "",
          mealsFeedback: fetchedFeedback.mealsFeedback || "",
          symptomsFeedback: fetchedFeedback.symptomsFeedback || "",
          wellBeingObservation: fetchedFeedback.wellBeingObservation || "",
          wellBeingRecommendation:
            fetchedFeedback.wellBeingRecommendation || "",
          overallAssessment: fetchedFeedback.overallAssessment || "",
          doctorfirstname: fetchedFeedback.doctorfirstname || "",
          doctorlastname: fetchedFeedback.doctorlastname || "",
          diaryId: diaryId,
          id: fetchedFeedback._id,
          doctorId: fetchedFeedback.doctorId,
          createdAt:fetchedFeedback.createdAt
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return false;
    }
  };

  useEffect(() => {
    if (user._id) {
      fetchDiary();
    }
  }, [user._id]);

  const viewEntry = async (entry) => {
    const hasFeedback = await fetchFeedback(entry._id);
    setFeedbackContent(hasFeedback);
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  const viewFeedback = async (feedbackEntry) => {
    try {
      const hasFeedback = await fetchFeedback(feedbackEntry._id);
      if (!hasFeedback) {
        setFeedbackContent("Feedback pending...");
      } else {
        setFeedbackContent(hasFeedback);
      }
      setSelectedFeedbackEntry(feedbackEntry);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedbackContent("Error fetching feedback. Please try again later.");
    }
  };

  const closeFeedbackModal = () => {
    setSelectedFeedbackEntry(null);
  };

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="diary-container">
        <div className="header">
          <h1>Your Patients' Health Journals</h1>
        </div>
        {data.length > 0 ? (
          <div className="diary-grid">
            {data.map((diaryTable, index) => (
              <div key={index} className="diary-card">
                <div className="entry-header">
                  <h3>
                    {format(
                      new Date(diaryTable.createdAt),
                      "EEEE, MMM do, yyyy"
                    )}
                  </h3>{" "}
                  <h3>
                    Patient: {diaryTable.firstname} {diaryTable.lastname}
                  </h3>
                  <button
                    onClick={() => viewEntry(diaryTable)}
                    className="view-entry-btn"
                  >
                    View Journal
                  </button>{" "}
                  |
                  <button
                    onClick={() => viewFeedback(diaryTable)}
                    className="view-feedback-btn"
                  >
                    View Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No entries found.</div>
        )}
      </div>
      {selectedFeedbackEntry && (
        <div className="modal-overlay" onClick={closeFeedbackModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-btn-div">
              <button className="close-btn" onClick={closeFeedbackModal}>
                Close
              </button>
            </div>
            <br />
            {typeof feedbackContent === "string" ? (
              <p>{feedbackContent}</p>
            ) : (
              <div className="feedback-entry-details">
                <div className="feedback-header">
                  {" "}
                  <Link
                    to={`/update-feedback/${selectedFeedbackEntry._id}`}
                    className="update-entry-link"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </div>
                <h2>
                  {format(
                    new Date(values.createdAt),
                    "EEEE, MMM do, yyyy"
                  )}
                </h2>
                <h2>Observation on the patient's Blood Sugar Levels</h2>
                <p>{values.bloodSugarObservation}</p> <h2>Recommendation</h2>
                <p>{values.bloodSugarRecommendation}</p> <h2>The Medication</h2>
                <p>{values.medicationFeedback}</p> <h2>Patient Meals & Diet</h2>
                <p>{values.mealsFeedback}</p>
                <h2>Experienced Symptoms & Solution</h2>
                <p>{values.symptomsFeedback}</p> <h2>Well-Being</h2>
                <p>{values.wellBeingObservation}</p>{" "}
                <h2>Recommendation for patient's well-being</h2>
                <p>{values.wellBeingRecommendation}</p>{" "}
                <h2>Overall Assessment for Patient</h2>
                <p>{values.overallAssessment}</p> <h2></h2>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedEntry && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-btn-div">
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
            <br />
            <div className="diary-entry-details">
              <div className="entry-header">
                {feedbackContent ? (
                  <Link
                    to={`/update-feedback/${selectedEntry._id}`}
                    className="update-entry-link"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                ) : (
                  <Link
                    to={`/doctors-feedback/${selectedEntry._id}`}
                    className="update-entry-link"
                  >
                    Give Feedback
                  </Link>
                )}{" "}
              </div>
              <div className="entry-content">
                <h2>
                  {format(
                    new Date(selectedEntry.createdAt),
                    "EEEE, MMM do, yyyy"
                  )}
                </h2>
                <br />
                <hr />
                <br />
                <div className="entry-section-group">
                  <img src={bloodSugarIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Blood Sugar Levels</u>
                  </h2>
                  <div className="entry-row">
                    <div className="entry-section">
                      <h3>Before Breakfast</h3>
                      <p>{selectedEntry.bloodsugarfasting}</p>
                    </div>
                    <div className="entry-section">
                      <h3>After Breakfast</h3>
                      <p>{selectedEntry.afterbreakfast}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Before Lunch</h3>
                      <p>{selectedEntry.beforelunch}</p>
                    </div>
                    <div className="entry-section">
                      <h3>After Lunch</h3>
                      <p>{selectedEntry.afterlunch}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Before Dinner</h3>
                      <p>{selectedEntry.beforedinner}</p>
                    </div>
                    <div className="entry-section">
                      <h3>After Dinner</h3>
                      <p>{selectedEntry.afterdinner}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Other</h3>
                      <p>{selectedEntry.other}</p>
                    </div>
                  </div>
                </div>
                <br /> <hr />
                <br />
                <div className="entry-section-group">
                  <img src={medicationIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Medication</u>
                  </h2>
                  <div className="entry-row">
                    <div className="entry-section">
                      <h3>Morning</h3>
                      <p>{selectedEntry.morningdose}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Afternoon</h3>
                      <p>{selectedEntry.afternoon}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Evening</h3>
                      <p>{selectedEntry.evening}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Night</h3>
                      <p>{selectedEntry.nightdose}</p>
                    </div>
                  </div>
                </div>
                <br /> <hr />
                <br />
                <div className="entry-section-group">
                  <img src={dietIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Diet</u>
                  </h2>
                  <div className="entry-row">
                    <div className="entry-section">
                      <h3>Breakfast</h3>
                      <p>{selectedEntry.breakfast}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Lunch</h3>
                      <p>{selectedEntry.lunch}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Dinner</h3>
                      <p>{selectedEntry.dinner}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Snack</h3>
                      <p>{selectedEntry.snack}</p>
                    </div>
                  </div>
                </div>
                <br /> <hr />
                <br />
                <div className="entry-section-group">
                  <img src={symptomsIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Symptoms</u>
                  </h2>
                  <div className="entry-row">
                    <div className="entry-section">
                      <p>{selectedEntry.symptoms}</p>
                    </div>
                  </div>
                </div>
                <br /> <hr />
                <br />
                <div className="entry-section-group">
                  <img src={exerciseIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Exercise</u>
                  </h2>
                  <div className="entry-row">
                    <div className="entry-section">
                      <h3>Duration</h3>
                      <p>{selectedEntry.duration}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Type</h3>
                      <p>{selectedEntry.exercisetype}</p>
                    </div>
                  </div>
                </div>
                <br /> <hr />
                <br />
                <div className="entry-section-group">
                  <img src={symptomsIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Overall Well-being</u>
                  </h2>
                  <div className="entry-row">
                    <div className="entry-section">
                      <h3>Overall Well-being</h3>
                      <p>{selectedEntry.wellbeing}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Sleep Quality</h3>
                      <p>{selectedEntry.sleep}</p>
                    </div>
                  </div>
                </div>
                <br />
                <div className="entry-section-group">
                  <img src={symptomsIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Other Notes</u>
                  </h2>
                  <div className="entry-row">
                    <div className="entry-section">
                      <p>{selectedEntry.othernotes}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="entry-footer">
                <Link
                  to={`/update-entry/${selectedEntry._id}`}
                  className="update-entry-link"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorDiary;
