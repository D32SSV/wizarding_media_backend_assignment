import express from "express";
import {
  check,
  getMeetings,
  createMeeting,
  getMeetingsByMonth,
} from "../controllers/meetingController.mjs";
import { getMeetingById } from "../controllers/meetingController.mjs";
import { deleteMeeting } from "../controllers/meetingController.mjs";
import { updateMeeting } from "../controllers/meetingController.mjs";

const router = express.Router();

router.get("/", check);
router.get("/getmeeting", getMeetings);
router.get("/getmeetingbymonth", getMeetingsByMonth);
router.get("/:meetingId", getMeetingById);
router.delete("/:meetingId", deleteMeeting);
router.put("/:meetingId", updateMeeting);
router.post("/createmeeting", createMeeting);

export default router;
