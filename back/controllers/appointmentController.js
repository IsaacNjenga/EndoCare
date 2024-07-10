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
      doctorlastname,
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
      doctorlastname,
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

const deleteAppointment = async (req, res) => {};

export { createAppointment, getAppointments, deleteAppointment };
