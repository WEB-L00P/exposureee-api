const express = require("express");
const sRouter = express.Router();

const { getStreamer } = require("../controllers/streamerController");

sRouter.get("/:username", getStreamer);

module.exports = sRouter;
