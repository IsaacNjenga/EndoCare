import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../assets/css/diary.css";
import axios from "axios";
import Loader from "./loader";
import { UserContext } from "../App";

function Diary() {
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
          data.map((diary, index) => (
            <div key={index} className="diary-entry">
              <div className="entry-section">
                <p>{diary._id}</p>
                <h2>Fasting</h2>
                <p>{diary.fasting}</p>
              </div>
              <div className="entry-section">
                <h2>Pre-Lunch</h2>
                <p>{diary.prelunch}</p>
              </div>
              <div className="entry-section">
                <h2>Post-Lunch</h2>
                <p>{diary.postlunch}</p>
              </div>
              <div className="entry-section">
                <h2>Night</h2>
                <p>{diary.night}</p>
              </div>
              <div className="entry-section">
                <h2>Morning</h2>
                <p>{diary.morning}</p>
              </div>
              <div className="entry-section">
                <h2>Evening</h2>
                <p>{diary.evening}</p>
              </div>
              <div className="entry-section">
                <h2>Breakfast</h2>
                <p>{diary.breakfast}</p>
              </div>
              <div className="entry-section">
                <h2>Lunch</h2>
                <p>{diary.lunch}</p>
              </div>
              <div className="entry-section">
                <h2>Snack</h2>
                <p>{diary.snack}</p>
              </div>
              <div className="entry-section">
                <h2>Dinner</h2>
                <p>{diary.dinner}</p>
              </div>
              <div className="entry-section">
                <h2>Exercise</h2>
                <p>{diary.exercise}</p>
              </div>
              <div className="entry-section">
                <h2>Symptoms</h2>
                <p>{diary.symptoms}</p>
              </div>
              <div className="entry-section">
                <h2>Mood</h2>
                <p>{diary.mood}</p>
              </div>
              <div className="entry-section">
                <h2>Stress</h2>
                <p>{diary.stress}</p>
              </div>{" "}
              <Link
                to={`/update-diary/:${diary._id}`}
                className="add-entry-link"
              >
                Update this entry
              </Link>
            </div>
          ))
        ) : (
          <div>No entries found.</div>
        )}
      </div>
    </>
  );
}

export default Diary;
