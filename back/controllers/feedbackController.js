import { FeedbackModel } from "../models/feedback.js";

const createFeedback = async (req, res) => {
  try {
    const {
      bloodSugarObservation,
      bloodSugarRecommendation,
      medicationFeedback,
      mealsFeedback,
      symptomsFeedback,
      wellBeingObservation,
      wellBeingRecommendation,
      overallAssessment,
      doctorfirstname,
      doctorlastname,
      diaryId,
    } = req.body;

    const newFeedbackBody = new FeedbackModel({
      bloodSugarObservation,
      bloodSugarRecommendation,
      medicationFeedback,
      mealsFeedback,
      symptomsFeedback,
      wellBeingObservation,
      wellBeingRecommendation,
      overallAssessment,
      doctorfirstname,
      doctorlastname,
      diaryId,
      postedBy: req.user._id,
    });

    const result = await newFeedbackBody.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.find({});
    return res.status(200).json({ success: true, feedback });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const feedback = await FeedbackModel.findById(id);
    if (!feedback) {
      return res.status(404).json({ error: "No matching feedback entry" });
    }
    const deleteFeedback = await FeedbackModel.findByIdAndDelete({ _id: id });
    const feedbacks = await FeedbackModel.find({});
    return res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await FeedbackModel.findOneAndUpdate(
      { diaryId: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ error: error.message });
  }
};

export { createFeedback, getFeedback, deleteFeedback, updateFeedback };
