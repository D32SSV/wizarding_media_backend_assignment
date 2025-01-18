import { Schema, model } from "mongoose";

const meetingSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    type: { type: String, requried: true, enum: ["Recurring", "One Time"] },
    meetingLink: { type: String, required: true },
    members: { type: [String], required: true },
  },
  { timestamps: true }
);

const Meeting = model("Meeting", meetingSchema);
export default Meeting;
