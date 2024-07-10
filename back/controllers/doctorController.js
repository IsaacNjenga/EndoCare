import express from "express";
import { DoctorModel } from "../models/doctor.js";

const createDoctor = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      gender,
      address,
      specialization,
      doctorId,
    } = req.body;
    const newDoctor = new DoctorModel({
      firstname,
      lastname,
      email,
      phone,
      gender,
      address,
      specialization,
      doctorId,
      postedBy: req.user._id,
    });
    const result = await newDoctor.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({});
    return res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await DoctorModel.findOneAndUpdate(
      { doctorId: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getDoctor = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const doctor = await DoctorModel.findById(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    return res.status(200).json({
      success: true,
      doctor: {
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        email: doctor.email,
        phone: doctor.phone,
        address: doctor.address,
        specialization: doctor.specialization,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export { getDoctor, getDoctors, createDoctor, updateDoctor };
