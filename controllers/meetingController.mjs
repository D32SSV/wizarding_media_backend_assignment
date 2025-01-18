import moment from "moment";
import Meeting from "../models/meetingModel.mjs";

export async function check(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      message: "You Are Cool",
    },
  });
}

export async function getMeetings(req, res) {
  try {
    const meetings = await Meeting.find();
    return res.status(200).json({
      success: true,
      data: meetings,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ sucess: false, data: { error: err, message: err.message } });
  }
}

export async function createMeeting(req, res) {
  console.log("CREATE MEETING ROUTE HIT>>>");

  const { title, date, time, type, meetingLink, members } = req.body;

  try {
    const newMeeting = new Meeting({
      title,
      date,
      time,
      type,
      meetingLink,
      members,
    });
    await newMeeting.save();
    return res.status(200).json({
      success: true,
      data: {
        message: "new meeting created succesfully",
      },
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      data: { error: err, message: err.message },
    });
  }
}

export async function getMeetingsByMonth(req, res) {
  console.log("GETMEETINGBYMONTHLOGGED");

  try {
    const { month, year } = req.query;
    // console.log(month, year);

    if (
      !month ||
      !year ||
      isNaN(month) ||
      isNaN(year) ||
      month < 1 ||
      month > 12
    ) {
      return res.status(400).json({ message: "Invalid month or year." });
    }

    const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = moment(`${year}-${month}-01`).endOf("month").toDate();

    const meetings = await Meeting.find({
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: 1, time: 1 });

    const meetingsByDate = meetings.reduce((acc, meeting) => {
      const meetingDate = moment(meeting.date).format("DD-MM-YYYY");

      if (!acc[meetingDate]) {
        acc[meetingDate] = [];
      }
      acc[meetingDate].push(meeting);

      return acc;
    }, {});

    res.status(200).json({ success: true, data: meetingsByDate });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res
      .status(500)
      .json({ sucess: false, data: { error: err, message: err.message } });
  }
}

export async function getMeetingById(req, res) {
  try {
    const { meetingId } = req.params;

    if (!meetingId) {
      return res.status(400).json({ message: "Meeting ID is required." });
    }

    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    console.error("Error fetching meeting details:", error);
    res
      .status(500)
      .json({ success: false, data: { message: error.message, error } });
  }
}

export async function deleteMeeting(req, res) {
  try {
    const { meetingId } = req.params;
    if (!meetingId) {
      return res.status(400).json({ message: "Meeting ID is required." });
    }

    const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);

    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    res.status(200).json({
      success: true,
      data: { message: "Meeting deleted successfully" },
    });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res
      .status(500)
      .json({ success: false, data: { message: error.message, error } });
  }
}

export async function updateMeeting(req, res) {
  try {
    const { meetingId } = req.params; 
    const updatedData = req.body; 

    if (!meetingId || !updatedData) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      updatedData,
      {
        new: true, 
        runValidators: true,
      }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    res.status(200).json({
      success: true,
      data: updatedMeeting,
    });
  } catch (error) {
    console.error("Error updating meeting:", error);
    res
      .status(500)
      .json({ success: false, data: { message: error.message, error } });
  }
}
