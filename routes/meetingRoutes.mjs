import express from "express";
import {
  check,
  getMeetings,
  createMeeting,
} from "../controllers/meetingController.mjs";

const router = express.Router();

router.get("/", check);
router.get("/getmeeting", getMeetings);
router.post("/createmeeting", createMeeting);

export default router;
