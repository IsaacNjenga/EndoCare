import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    doctorId: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    specialization: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { collection: "doctor" }
);

const DoctorModel = mongoose.model("doctor", doctorSchema);
export { DoctorModel };
