import React, { useContext } from "react";
import { UserContext } from "../App";
import DoctorAppointments from "./doctorAppointments";
import PatientAppointments from "./patientAppointments";

function Appointments() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user.role === "doctor" ? (
        <DoctorAppointments />
      ) : (
        <PatientAppointments />
      )}
    </>
  );
}

export default Appointments;
