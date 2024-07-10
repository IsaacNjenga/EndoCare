import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, require: true },
});

const UserModel = mongoose.model("user", UserSchema);
export { UserModel };
