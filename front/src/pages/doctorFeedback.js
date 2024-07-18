import React from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

function DoctorFeedback() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/diary");
  };
  return (
    <>
      <Navbar />
      <button onClick={back}>Back</button>
      <div>Coming soon</div>
    </>
  );
}

export default DoctorFeedback;
