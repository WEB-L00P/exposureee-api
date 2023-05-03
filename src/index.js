const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
port = process.env.PORT || 3000;

const userRouter = require("./routes/userRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const streamerRouter = require("./routes/streamerRoute");

//Routes
app.get("/", (req, res) => {
  res.status(404).json({ message: "This api need authentication" });
});

app.use("/users", userRouter);
app.use("/dashboard", dashboardRouter);
app.use("/streamer", streamerRouter);

//DB Connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Running on http://127.0.0.1:${port}`);
    });
    console.log(`Connected To DataBase`);
  })
  .catch((err) => {
    console.log(err);
  });
