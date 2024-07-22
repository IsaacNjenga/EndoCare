import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    bloodSugarObservation: { type: String },
    bloodSugarRecommendation: { type: String },
    medicationFeedback: { type: String },
    mealsFeedback: { type: String },
    symptomsFeedback: { type: String },
    wellBeingObservation: { type: String },
    wellBeingRecommendation: { type: String },
    overallAssessment: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    diaryId: { type: String },
    doctorfirstname: { type: String },
    doctorId: { type: String },
    patientId: { type: String },
    doctorlastname: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "feedback" }
);

const FeedbackModel = new mongoose.model("feedback", feedbackSchema);
export { FeedbackModel };
