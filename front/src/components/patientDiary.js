import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../assets/css/diary.css";
import axios from "axios";
import { format } from "date-fns";
import Loader from "./loader";
import { UserContext } from "../App";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function PatientDiary() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
            const fetchedDiary = response.data.diaries
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
            {data.map((diary, index) => (
              <div key={index} className="diary-card">
                <div className="entry-header">
                  <Link
                    to={`/update-diary/${diary._id}`}
                    className="update-entry-link"
                  >
                    Update
                  </Link>
                  <button
                    className="cancel-btn"
                    onClick={() => deleteRecord(diary._id)}
                  >
                    Delete this entry
                  </button>
                </div>
                <div className="entry-content">
                  <h3>
                    {format(new Date(diary.createdAt), "EEEE, MMM do, yyyy")}
                  </h3>
                  <div className="entry-section-group">
                    <h2>Blood Sugar Levels</h2>
                    <div className="entry-row">
                      <div className="entry-section">
                        <h3>Fasting</h3>
                        <p>{diary.fasting}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Pre-Lunch</h3>
                        <p>{diary.prelunch}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Post-Lunch</h3>
                        <p>{diary.postlunch}</p>
                      </div>
                    </div>
                    <div className="entry-row">
                      <div className="entry-section">
                        <h3>Night</h3>
                        <p>{diary.night}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Morning</h3>
                        <p>{diary.morning}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Evening</h3>
                        <p>{diary.evening}</p>
                      </div>
                    </div>
                  </div>
                  <div className="entry-section-group">
                    <h2>Meals</h2>
                    <div className="entry-row">
                      <div className="entry-section">
                        <h3>Breakfast</h3>
                        <p>{diary.breakfast}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Lunch</h3>
                        <p>{diary.lunch}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Snack</h3>
                        <p>{diary.snack}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Dinner</h3>
                        <p>{diary.dinner}</p>
                      </div>
                    </div>
                  </div>
                  <div className="entry-section-group">
                    <h2>Well-being</h2>
                    <div className="entry-row">
                      <div className="entry-section">
                        <h3>Exercise</h3>
                        <p>{diary.exercise}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Symptoms</h3>
                        <p>{diary.symptoms}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Mood</h3>
                        <p>{diary.mood}</p>
                      </div>
                      <div className="entry-section">
                        <h3>Stress</h3>
                        <p>{diary.stress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No entries found.</div>
        )}
      </div>
    </>
  );
}

export default PatientDiary;
