import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import "../assets/css/appointment.css";
import { UserContext } from "../App";

const customStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 600,
      backgroundColor: "#f4f4f4",
      color: "#333",
      padding: "12px",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      fontWeight: 400,
      padding: "10px",
    },
  },
  rows: {
    style: {
      minHeight: "80px",
      "&:nth-of-type(odd)": {
        backgroundColor: "#f9f9f9",
      },
    },
  },
  pagination: {
    style: {
      fontSize: "14px",
      fontWeight: 500,
      padding: "10px",
    },
  },
};

function DoctorAppointments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        const filteredfetchedAppointments = response.data.appointments.filter(
          (appointment) => appointment.doctorId === user._id
        );
        setData(filteredfetchedAppointments);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching data", { position: "top-right" });
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = [
    {
      name: "Patient Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
    },
    { name: "E-mail", selector: (row) => row.email, grow: 1 },
    { name: "Date", selector: (row) => row.date },
    { name: "Time", selector: (row) => row.time },
    { name: "Service", selector: (row) => row.service },
    {
      name: "Doctor",
      selector: (row) => `${row.doctorfirstname} ${row.doctorlastname}`,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="content">
        <p>
          Manage appointments <Link to="/book-appointment">here</Link>
        </p>
        <h1>Your appointments</h1>
        <div className="list">
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            progressPending={loading}
            progressComponent={<div className="spinner">Loading...</div>}
          />
        </div>
      </div>
    </>
  );
}

export default DoctorAppointments;
