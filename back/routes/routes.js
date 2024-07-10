import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { VerifyUser } from "../middleware/verifyUser.js";
import { Register, Login, Auth } from "../controllers/userController.js";
import {
  createAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";
import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
} from "../controllers/doctorController.js";
import {
  createPatient,
  getPatients,
  updatePatient,
  getPatient,
} from "../controllers/patientController.js";

router.post(
  "/register",
  [
    (body("name")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isEmail()
      .withMessage("Invalid e-mail address"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isLength({ min: 8, max: 30 })
      .withMessage("Password length should be 8-30 characters")),
  ],
  Register
);

router.post(
  "/login",
  [
    (body("email")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isEmail()
      .withMessage("Invalid e-mail address"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isLength({ min: 8, max: 30 })
      .withMessage("Password length should be 8-30 characters")),
  ],
  Login
);

router.get("/verify", VerifyUser, Auth);

//route for appointments
router.post("/createAppointment", VerifyUser, createAppointment);
router.get("/appointments", VerifyUser, getAppointments);

//route for doctors
router.post("/createDoctor", VerifyUser, createDoctor);
router.get("/doctors", VerifyUser, getDoctors);
router.get("/doctor/:id", VerifyUser, getDoctor);
router.put("/update-doctor/:id", VerifyUser, updateDoctor);

//route for patients
router.post("/createPatient", VerifyUser, createPatient);
router.get("/patients", VerifyUser, getPatients);
router.get("/getPatient/:id", VerifyUser, getPatient);
router.put("/update-patient/:id", VerifyUser, updatePatient);

export { router as Router };
