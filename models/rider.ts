import { now } from "mongoose";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RiderSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  referrencedBy: {
    type: String,
    required: false,
  },
  bankName: {
    type: String,
    required: false,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: false,
  },
});

const Rider = mongoose.model("rider", RiderSchema);
export default Rider;
