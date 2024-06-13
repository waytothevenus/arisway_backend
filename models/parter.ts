import { now } from "mongoose";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  productName: {
    type: Array,
  },
  phoneNumber: {
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

const Parter = mongoose.model("bookingCall", PartnerSchema);
export default Parter;
