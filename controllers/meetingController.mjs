import Meeting from "../models/meetingModel.mjs";

export async function check(req, res) {
  try {
    return res.status(200).json({
      success: true,
      data: {
        message: "You Are Cool",
      },
    });
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function getMeetings(req, res) {
  try {
    const meetings = await Meeting.find();
    return res.status(200).json({
      success: true,
      data: meetings,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
}



export async function createMeeting(req, res) {
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
