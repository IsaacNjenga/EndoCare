import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    fasting: { type: String },
    prelunch: { type: String },
    postlunch: { type: String },
    night: { type: String },
    morning: { type: String },
    evening: { type: String },
    breakfast: { type: String },
    lunch: { type: String },
    snack: { type: String },
    dinner: { type: String },
    exercise: { type: String },
    symptoms: { type: String },
    mood: { type: String },
    stress: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    patientId: { type: String },
    doctorId: { type: String },
    doctorfirstname: { type: String },
    doctorlastname: { type: String },
    doctoremail: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "diary" }
);

const DiaryModel = new mongoose.model("diary", diarySchema);
export { DiaryModel };
