const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    channel_link: {
      type: String,
      default: null,
    },
    channel_id: {
      type: String,
      default: null,
    },
    stream_jwt: {
      type: String,
      default: null,
    },
    stream_id: {
      type: String,
      default: null,
    },
    mid: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountStatus: {
      type: String,
      default: "false",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dashboard", dashboardSchema);
