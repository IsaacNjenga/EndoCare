import React, { useContext } from "react";
import { UserContext } from "../App";
import DoctorProfile from "../pages/doctorProfile.js";
import PatientProfile from "../pages/patientProfile.js";

function Profile() {
  const { user } = useContext(UserContext);
  return <>{user.role === "doctor" ? <DoctorProfile /> : <PatientProfile />}</>;
}

export default Profile;
