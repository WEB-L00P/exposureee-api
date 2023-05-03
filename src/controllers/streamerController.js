const dashboardModel = require("../models/dashboard");
const userModel = require("../models/user");

const getStreamer = async (req, res) => {
  const username = req.params.username;
  try {
    const userData = await userModel.find({
      username: username,
    });

    if (userData.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const dashboardData = await dashboardModel.find({
      userId: userData,
    });

    res.status(200).json({
      streamerData: userData,
      dashboardInfo: dashboardData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { getStreamer };
