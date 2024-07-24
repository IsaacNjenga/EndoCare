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
import { format, parseISO } from "date-fns";
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
          const sortedDiary = fetchedDiary.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setData(sortedDiary);
        }
      }
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupEntriesByDate = (diaries) => {
    return diaries.reduce((acc, diary) => {
      const date = format(parseISO(diary.createdAt), "yyyy-MM-dd");
      acc[date] = acc[date] || [];
      acc[date].push(diary);
      return acc;
    }, {});
  };

  const groupedEntries = groupEntriesByDate(data);

  const sortedEntriesDates = Object.keys(groupedEntries).sort(
    (a, b) => new Date(b) - new Date(a)
  );

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
          createdAt: fetchedFeedback.createdAt,
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
          <h1 style={{ color: "white" }}>Your Patients' Health Journals</h1>
        </div>
        {data.length > 0 ? (
          <div className="diary-grid">
            {sortedEntriesDates.map((date) => (
              <div key={date} className="diary-date-group">
                <h2 style={{ color: "white" }}>
                  <u>{format(new Date(date), "EEEE, MMM do, yyyy")}</u>
                </h2>
                {groupedEntries[date].map((diaryTable) => (
                  <div key={diaryTable._id} className="diary-card">
                    <div className="entry-header">
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
            ))}
            <br />
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
                    Edit <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </div>
                <br />
                <h2>
                  <u>
                    {format(new Date(values.createdAt), "EEEE, MMM do, yyyy")}
                  </u>
                </h2> <br />
                <hr />
                <h2>Blood Sugar Levels</h2>
                <h2>• Observations</h2>
                <p>{values.bloodSugarObservation}</p>
                <h2>• Recommendation</h2>
                <p>{values.bloodSugarRecommendation}</p>
                <hr />
                <h2>• Medication</h2>
                <p>{values.medicationFeedback}</p>
                <br />
                <hr />
                <h2>• Patient Meals & Diet</h2>
                <p>{values.mealsFeedback}</p>
                <h2>• Experienced Symptoms & Solutions</h2>
                <p>{values.symptomsFeedback}</p>
                <br />
                <hr />
                <h2>Well-Being & Mental Health</h2>
                <h2>• Observations</h2>
                <p>{values.wellBeingObservation}</p> <h2>• Recommendation</h2>
                <p>{values.wellBeingRecommendation}</p> <br />
                <hr />
                <h2>• Overall Assessment & Next Steps</h2>
                <p>{values.overallAssessment}</p>
                <br />
                <hr />
                <br />
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
                    Edit <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                ) : (
                  <Link
                    to={`/doctors-feedback/${selectedEntry._id}`}
                    className="update-entry-link"
                  >
                    Give Feedback
                  </Link>
                )}
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
                      <h3>Fasting</h3>
                      <p>{selectedEntry.fasting}mg/dL</p>
                    </div>
                    <div className="entry-section">
                      <h3>Pre-Lunch</h3>
                      <p>{selectedEntry.prelunch}mg/dL</p>
                    </div>
                    <div className="entry-section">
                      <h3>Post-Lunch</h3>
                      <p>{selectedEntry.postlunch}mg/dL</p>
                    </div>
                    <div className="entry-section">
                      <h3>Night</h3>
                      <p>{selectedEntry.night}mg/dL</p>
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
                      <p>{selectedEntry.morning}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Evening</h3>
                      <p>{selectedEntry.evening}</p>
                    </div>
                  </div>
                </div>
                <br /> <hr />
                <br />
                <div className="entry-section-group">
                  <img src={dietIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Meals</u>
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
                      <h3>Snack</h3>
                      <p>{selectedEntry.snack}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Dinner</h3>
                      <p>{selectedEntry.dinner}</p>
                    </div>
                  </div>
                </div>
                <br /> <hr />
                <br />
                <div className="entry-section-group">
                  <img src={symptomsIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Symptoms Today</u>
                  </h2>
                  <div className="entry-row">
                    <div className="entry-section">
                      <h3>Symptoms</h3>
                      <p>{selectedEntry.symptoms}</p>
                    </div>
                  </div>
                </div>
                <br /> <hr />
                <br />
                <div className="entry-section-group">
                  <img src={exerciseIcon} alt="icon" className="icon" />
                  <h2>
                    • <u>Well-Being & Physical Health</u>
                  </h2>
                  <div className="entry-row">
                    <div className="entry-section">
                      <h3>Exercise</h3>
                      <p>{selectedEntry.exercise}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Mood</h3>
                      <p>{selectedEntry.mood}</p>
                    </div>
                    <div className="entry-section">
                      <h3>Stress</h3>
                      <p>{selectedEntry.stress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorDiary;
