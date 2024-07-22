import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import { UserContext } from "../App";
import axios from "axios";
import "../assets/css/doctorFeedback.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash as faSolidTrash } from "@fortawesome/free-solid-svg-icons";

const MySwal = withReactContent(Swal);

function UpdateDoctorFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
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
  const [data, setData] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [patientId, setPatientId] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);

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
          (diary) => diary.doctorId === user._id && diary._id === id
        );
        if (fetchedDiary) {
          setData(fetchedDiary);
          setPatientId(fetchedDiary[0].patientId.toString());
        }
      }
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get("doctors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const fetchedProfile = response.data.doctors.filter(
        (doctor) => doctor.doctorId === user._id
      );
      setDoctorProfile(fetchedProfile);
      setFirstname(fetchedProfile[0].firstname.toString());
      setLastname(fetchedProfile[0].lastname.toString());
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedback = async () => {
    const result = await axios.get("feedback", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const fetchedFeedback = result.data.feedback.find(
      (feedback) => id === feedback.diaryId
    );
    setValues({
      bloodSugarObservation: fetchedFeedback.bloodSugarObservation || "",
      bloodSugarRecommendation: fetchedFeedback.bloodSugarRecommendation || "",
      medicationFeedback: fetchedFeedback.medicationFeedback || "",
      mealsFeedback: fetchedFeedback.mealsFeedback || "",
      symptomsFeedback: fetchedFeedback.symptomsFeedback || "",
      wellBeingObservation: fetchedFeedback.wellBeingObservation || "",
      wellBeingRecommendation: fetchedFeedback.wellBeingRecommendation || "",
      overallAssessment: fetchedFeedback.overallAssessment || "",
      doctorfirstname: fetchedFeedback.doctorfirstname || "",
      doctorlastname: fetchedFeedback.doctorlastname || "",
      diaryId: fetchedFeedback.diaryId || "",
      id: fetchedFeedback._id,
      doctorId: fetchedFeedback.doctorId,
    });
  };

  useEffect(() => {
    if (user._id) {
      fetchDiary();
    }
    fetchDoctorProfile();
    fetchFeedback();
  }, [user._id]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const valuesData = {
      ...values,
      doctorfirstname: firstname,
      doctorlastname: lastname,
      doctorId: user._id,
      patientId,
    };
    axios
      .put(`update-feedback/${id}`, valuesData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((result) => {
        if (result.data.success) {
          setLoading(false);
          toast.success("Feedback Updated!", {
            position: "top-right",
            autoClose: 2000,
          });
          navigate("/diary");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Error updating the feedback");
      });
  };

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure you want to delete the feedback for this entry?",
      text: "You will lose this data forever!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`feedback/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            const fetchedFeedback = response.data.feedbacks;
            setData(fetchedFeedback);
            MySwal.fire({
              title: "Deleted!",
              text: "Deleted successfully",
              icon: "success",
            });
            navigate("/diary");
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
      <div className="doctor-feedback">
        <div className="container">
          <h1 className="title">Doctor Feedback</h1>
          <button
            className="cancel-btn"
            onClick={() => deleteRecord(values.id)}
          >
            <FontAwesomeIcon icon={faSolidTrash} />
          </button>
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
                    <p>{content.fasting}mg/dL</p>
                    <h3>Pre-Lunch</h3>
                    <p>{content.prelunch}mg/dL</p>
                    <h3>Post-Lunch</h3>
                    <p>{content.postlunch}mg/dL</p>
                    <h3>Night</h3>
                    <p>{content.night}mg/dL</p>
                  </div>
                  <div className="feedback-section">
                    <h3>Observations</h3>
                    <textarea
                      name="bloodSugarObservation"
                      onChange={handleChange}
                      value={values.bloodSugarObservation}
                    />
                    <h3>Recommendations</h3>
                    <textarea
                      name="bloodSugarRecommendation"
                      onChange={handleChange}
                      value={values.bloodSugarRecommendation}
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
                      value={values.medicationFeedback}
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
                    <textarea
                      name="mealsFeedback"
                      onChange={handleChange}
                      value={values.mealsFeedback}
                    />
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
                    <textarea
                      name="symptomsFeedback"
                      onChange={handleChange}
                      value={values.symptomsFeedback}
                    />
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
                      value={values.wellBeingObservation}
                    />
                    <h3>Recommendations</h3>
                    <textarea
                      name="wellBeingRecommendation"
                      onChange={handleChange}
                      value={values.wellBeingRecommendation}
                    />
                  </div>
                </div>
                <div className="entry-section">
                  <h2>Overall Assessment & Next Steps</h2>
                  <textarea
                    name="overallAssessment"
                    onChange={handleChange}
                    value={values.overallAssessment}
                  />
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

export default UpdateDoctorFeedback;
