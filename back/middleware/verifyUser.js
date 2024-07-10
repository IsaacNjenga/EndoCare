import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

export const VerifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      try {
        if (err) {
          return res.status(401).json({ error: "Unauthorised" });
        }
        const user = await UserModel.findOne({ _id: payload._id }).select(
          "-password"
        );
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};
