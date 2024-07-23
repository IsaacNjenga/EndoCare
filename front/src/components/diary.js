import React, { useContext } from "react";
import "../assets/css/diary.css";
import { UserContext } from "../App";
import PatientDiary from "./patientDiary";
import DoctorDiary from "./doctorDiary";

function Diary() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.role === "patient" ? <PatientDiary /> : <DoctorDiary />}      
    </>
  );
}

export default Diary;
