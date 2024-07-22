import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { UserContext } from "../App";
import axios from "axios";
import Pcos from "../diagnosis/pcos";
import Loader from "../components/loader";
import Diabetes1 from "../diagnosis/type1diabetes";
import Diabetes2 from "../diagnosis/type2diabetes";
import Cortisol from "../diagnosis/cortisol";
import AdrenalFatigue from "../diagnosis/adrenalFatigue";

function Resources() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("patients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const fetchedProfile = response.data.patients[0];
      setData(fetchedProfile);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patient profile:", error);
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
      setDoctorData(fetchedProfile);
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchDoctorProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <div>Error loading data or no data available</div>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Patient's Diagnosis: {data.illness}</h1>
      {data.illness === "Type-2 Diabetes" && <Diabetes2 />}
      {data.illness === "Type-1 Diabetes" && <Diabetes1 />}
      {data.illness === "Adrenal Fatigue" && <AdrenalFatigue />}
      {data.illness === "Polycystic Ovary Syndrome (PCOS)" && <Pcos />}
      {data.illness === "Cortisol & Aldosterone Deficiency" && <Cortisol />}
    </div>
  );
}

export default Resources;
