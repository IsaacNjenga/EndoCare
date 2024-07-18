import express from "express";
import { DiaryModel } from "../models/diary.js";

const addEntry = async (req, res) => {
  try {
    const {
      fasting,
      prelunch,
      postlunch,
      night,
      morning,
      evening,
      breakfast,
      lunch,
      snack,
      dinner,
      exercise,
      symptoms,
      patientId,
      mood,
      doctorId,
      doctorfirstname,
      doctorlastname,
      firstname,
      lastname,
      doctoremail,
      stress,
    } = req.body;
    const newEntry = new DiaryModel({
      fasting,
      prelunch,
      postlunch,
      night,
      morning,
      evening,
      breakfast,
      lunch,
      snack,
      dinner,
      exercise,
      symptoms,
      mood,
      doctorId,
      doctorfirstname,
      doctorlastname,
      firstname,
      lastname,
      doctoremail,
      stress,
      patientId,
      postedBy: req.user._id,
    });

    const result = await newEntry.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getEntries = async (req, res) => {
  try {
    const results = await DiaryModel.find({ postedBy: req.user._id });
    if (!results) {
      return res.status(404).json({ error: "Journal entry not found" });
    }

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getAllEntries = async (req, res) => {
  try {
    const results = await DiaryModel.find({});
    if (!results) {
      return res.status(404).json({ error: "empty" });
    }
    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await DiaryModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Diary not found" });
    }
    return res.status(200).json({ success: true, ...result._doc });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteEntry = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const diary = await DiaryModel.findById(id);
    if (!diary) {
      return res.status(404).json({ error: "No matching diary entry" });
    }
    const deleteDiary = await DiaryModel.findByIdAndDelete({ _id: id });
    const diaries = await DiaryModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, diaries });
  } catch (error) {
    console.error("Error deleting this appointment:", error);
    return res.status(500).json({ error: error.message });
  }
};

export { addEntry, getEntries, updateEntry, deleteEntry, getAllEntries };
