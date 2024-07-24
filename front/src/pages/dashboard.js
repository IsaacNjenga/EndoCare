import React, { useContext } from "react";
import DoctorLandingPage from "../components/doctorLandingPage";
import PatientLandingPage from "../components/patientLandingPage";
import { UserContext } from "../App";

function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user.role === "doctor" ? <DoctorLandingPage /> : <PatientLandingPage />}
    </>
  );
}

export default Dashboard;
