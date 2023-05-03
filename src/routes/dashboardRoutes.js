const express = require("express");
const auth = require("../middlewares/auth");
const dRouter = express.Router();

const {
  createProfile,
  getProfile,
  updateProfile,
} = require("../controllers/dashboardController");

dRouter.get("/:id", auth, getProfile);

dRouter.post("/", auth, createProfile);

dRouter.put("/update/:id", auth, updateProfile);

module.exports = dRouter;
