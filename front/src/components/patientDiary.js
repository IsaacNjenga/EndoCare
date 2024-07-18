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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash as faSolidTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const MySwal = withReactContent(Swal);

function PatientDiary() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

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
        const fetchedDiary = response.data.results.filter(
          (diary) => diary.patientId === user._id
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

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure you want to delete this journal entry?",
      text: "You will lose this data forever!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`diary/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            const fetchedDiary = response.data.diaries;
            setData(fetchedDiary);
            MySwal.fire({
              title: "Deleted!",
              text: "Deleted successfully",
              icon: "success",
            });
          })
          .catch((err) => {
            MySwal.fire({
              title: "Error!",
              text: "An error occurred",
              icon: "error",
            });
          });
      }
    });
  };

  const viewEntry = (entry) => {
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="diary-container">
        <div className="header">
          <h1>Your Health Journal</h1>
          <Link to="/add-diary" className="add-entry-link">
            Add an entry
          </Link>
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
                  |
                  <button
                    onClick={() => viewEntry(diaryTable)}
                    className="view-entry-btn"
                  >
                    View this entry
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No entries found.</div>
        )}
      </div>
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
                <Link
                  to={`/update-diary/${selectedEntry._id}`}
                  className="update-entry-link"
                ><FontAwesomeIcon icon = {faPenToSquare}/>
                </Link>
                <button
                  className="cancel-btn"
                  onClick={() => deleteRecord(selectedEntry._id)}
                ><FontAwesomeIcon icon = {faSolidTrash}/>
                </button>
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

export default PatientDiary;
