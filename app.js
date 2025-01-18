import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// var cors = require('cors')

import Routes from "./routes/meetingRoutes.mjs";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
let isConnected = false;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", Routes);

if (!isConnected) {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      isConnected = true;
      console.log("DB connected");
    });
  } catch (error) {
    console.error(error);
  }
} else {
  console.log("DB Already Connected");
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
