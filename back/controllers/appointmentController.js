import express from "express";
import { AppointmentModel } from "../models/appointmentModel.js";

const createAppointment = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      date,
      time,
      service,
      doctorId,
      doctorfirstname,
      patientId,
      doctorlastname,
      doctoremail,
    } = req.body;

    const newAppointment = new AppointmentModel({
      firstname,
      lastname,
      email,
      date,
      time,
      service,
      doctorId,
      doctorfirstname,
      patientId,
      doctorlastname,
      doctoremail,
      postedBy: req.user._id,
    });

    const result = await newAppointment.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({});
    return res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment does not exist" });
    }
    const deleteAppointment = await AppointmentModel.findByIdAndDelete({
      _id: id,
    });
    const appointments = await AppointmentModel.find({});
    return res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error deleting this appointment:", error);
    return res.status(500).json({ error: error.message });
  }
};

export { createAppointment, getAppointments, deleteAppointment };
