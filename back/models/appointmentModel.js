import mongoose from "mongoose";

const AppointmentSchame = new mongoose.Schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    patientId: { type: String },
    date: { type: String, require: true },
    time: { type: String, require: true },
    service: { type: String, require: true },
    doctorId: { type: String, require: true },
    doctorfirstname: { type: String, require: true },
    doctorlastname: { type: String, require: true },
    doctoremail: { type: String, require: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { collection: "appointments" }
);

const AppointmentModel = mongoose.model("appointment", AppointmentSchame);
export { AppointmentModel };
