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
      stress,
      patientId,
    });

    const result = await newEntry.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getEntries = async (req, res) => {
  try {
    const results = await DiaryModel.find({});
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

const updateEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await DiaryModel.findOneAndUpdate(
      { patientId: id },
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

const deleteEntry = () => {};

export { addEntry, getEntries, updateEntry };
