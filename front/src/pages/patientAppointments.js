import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Loader from "../components/loader";
import "../assets/css/appointment.css";
import { UserContext } from "../App";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
      padding: "14px",
    },
  },
  rows: {
    style: {
      minHeight: "72px",
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

function PatientAppointments() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        const fetchedAppointments = response.data.appointments.filter(
          (appointment) => appointment.postedBy === user._id
        );
        setData(fetchedAppointments);
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

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure you want to cancel this appointment?",
      text: "You will lose this allocated time slot!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`appointment/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            const fetchedAppointments = response.data.appointments.filter(
              (appointment) => appointment.postedBy === user._id
            );
            setData(fetchedAppointments);
            MySwal.fire({
              title: "Cancelled!",
              text: "Cancelled successfully",
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

  const columns = [
    {
      name: "Patient",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      grow: 2,
    },
    { name: "E-mail", selector: (row) => row.email, grow: 3 },
    { name: "Date", selector: (row) => row.date },
    { name: "Time", selector: (row) => row.time },
    { name: "Service", selector: (row) => row.service },
    {
      name: "Doctor",
      selector: (row) => `${row.doctorfirstname} ${row.doctorlastname}`,
    },
    { name: "Doctor's E-mail", selector: (row) => row.doctoremail, grow: 3 },
    {
      name: "",
      selector: (row) => (
        <>
          <button className="cancel-btn" onClick={() => deleteRecord(row._id)}>
            Cancel Appointment
          </button>
        </>
      ),
      grow: 5,
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <div className="content">
        {user.role === "patient" ? (
          <p>
            Book an appointment{" "}
            <button className="appointment-btn">
              <Link to="/book-appointment">here</Link>
            </button>
          </p>
        ) : null}
        <h1>Your appointments</h1>
        <div className="list">
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
          />
        </div>
      </div>
    </>
  );
}

export default PatientAppointments;
