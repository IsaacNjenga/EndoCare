import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String },
    address: { type: String },
    illness: { type: String },
    doctorfirstname: { type: String },
    doctorlastname: { type: String },
    doctorId: { type: String },
    doctoremail: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { collection: "patient" }
);

const PatientModel = mongoose.model("patient", patientSchema);
export { PatientModel };
