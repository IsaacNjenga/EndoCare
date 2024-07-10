import Login from "./pages/login";
import Register from "./pages/register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Logout from "./components/logout";
import NotFound from "./pages/notFound";
import Dashboard from "./pages/dashboard";
import Resources from "./pages/resources";
import Appointments from "./pages/appointments";
import BookAppointment from "./components/bookAppointment";
import ProtectedRoutes from "./components/protectedRoutes";
import DoctorAppointments from "./pages/doctorAppointments";
import PatientAppointments from "./pages/patientAppointments";
import Profile from "./components/profile";
import DoctorProfile from "./pages/doctorProfile";
import PatientProfile from "./pages/patientProfile";
import AddPatientProfile from "./pages/addPatientProfile";
import AddDoctorProfile from "./pages/addDoctorProfile";
import UpdatePatientProfile from "./pages/updatePatientProfile";
import UpdateDoctorProfile from "./pages/updateDoctorProfile";
import Diary from "./components/diary";

export const UserContext = createContext(null);

axios.defaults.baseURL = "http://localhost:3001/endocare/";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/appointments",
    element: (
      <ProtectedRoutes>
        <Appointments />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Appointments /> },
      {
        path: "/appointments/doctor-appointments",
        element: <DoctorAppointments />,
      },
      {
        path: "/appointments/patient-appointments",
        element: <PatientAppointments />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Profile /> },
      {
        path: "doctor-profile",
        element: <DoctorProfile />,
      },
      {
        path: "patient-profile",
        element: <PatientProfile />,
      },
      {
        path: "add-doctor-profile",
        element: <AddDoctorProfile />,
      },
      {
        path: "add-patient-profile",
        element: <AddPatientProfile />,
      },
    ],
  },
  {
    path: "update-doctor-profile/:id",
    element: <UpdateDoctorProfile />,
  },
  {
    path: "update-patient-profile/:id",
    element: <UpdatePatientProfile />,
  },
  {
    path: "/book-appointment",
    element: (
      <ProtectedRoutes>
        <BookAppointment />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/resources",
    element: (
      <ProtectedRoutes>
        <Resources />
      </ProtectedRoutes>
    ),
  },
  { path: "/diary", element: <Diary /> },
  { path: "/logout", element: <Logout /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("verify", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
