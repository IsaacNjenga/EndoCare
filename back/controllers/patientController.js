import express from "express";
import mongoose from "mongoose";
import { PatientModel } from "../models/patient.js";

const createPatient = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      gender,
      address,
      patientId,
      illness,
      doctorfirstname,
      doctorlastname,
      doctorId,
      doctoremail,
    } = req.body;
    const newPatient = new PatientModel({
      patientId,
      firstname,
      lastname,
      email,
      phone,
      gender,
      address,
      illness,
      doctorfirstname,
      doctorlastname,
      doctorId,
      doctoremail,
      postedBy: req.user._id,
    });
    const result = await newPatient.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, patients });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json(401).json({ error: "No ID specified" });
  }
  try {
    const result = await PatientModel.findOneAndUpdate(
      { patientId: id },
      { ...req.body },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Patient not found" });
    }
    return res.status(200).json({ success: true, ...result._doc });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getPatient = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json(401).json({ error: "No ID specified" });
  }
  try {
    const patient = await PatientModel.findById(id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    return res.status(200).json({
      success: true,
      patient: {
        firstname: patient.firstname,
        lastname: patient.lastname,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
        illness: patient.illness,
        doctorfirstname: patient.doctorfirstname,
        doctorlastname: patient.doctorlastname,
        doctoremail: patient.doctoremail,
        doctorId: patient.doctorId,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  //console.log("Deleting patient with ID:", id); // Check the received ID

  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const patient = await PatientModel.findOne({ patientId: id });
    if (!patient) {
      //console.log(`Patient with ID ${id} not found`);
      return res.status(404).json({ error: "Patient not found" });
    }

    await PatientModel.findOneAndDelete({ patientId: id });
    //console.log(`Patient with ID ${id} deleted successfully`);
    return res.status(200).json({ success: true, message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error during patient deletion:", error);
    return res.status(500).json({ error: error.message });
  }
};



export { getPatient, getPatients, createPatient, updatePatient, deletePatient };
