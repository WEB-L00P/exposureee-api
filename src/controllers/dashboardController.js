const dashboardModel = require("../models/dashboard");

const createProfile = async (req, res) => {
  const {
    name,
    username,
    email,
    channel_link,
    channel_id,
    stream_jwt,
    stream_id,
    mid,
    userId,
  } = req.body;

  const newEntry = new dashboardModel({
    name: name,
    username: username,
    email: email,
    channel_link: channel_link,
    channel_id: channel_id,
    stream_jwt: stream_jwt,
    stream_id: stream_id,
    mid: mid,
    userId: userId,
    accountStatus: "true",
  });

  try {
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const updateProfile = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    username,
    email,
    channel_link,
    channel_id,
    stream_jwt,
    stream_id,
    mid,
  } = req.body;

  const newEntry = {
    name: name,
    username: username,
    email: email,
    channel_link: channel_link,
    channel_id: channel_id,
    stream_jwt: stream_jwt,
    stream_id: stream_id,
    mid: mid,
    accountStatus: "true",
  };

  try {
    await dashboardModel.findByIdAndUpdate(id, newEntry, { new: true });
    res.status(200).json(newEntry);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const getProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await dashboardModel.find({ userId: id });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { createProfile, getProfile, updateProfile };
