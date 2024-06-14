import { now } from "mongoose";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  partnerName: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  productName: {
    type: Array,
  },
  amount: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  assign: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

const Parter = mongoose.model("order", OrderSchema);
export default Parter;
