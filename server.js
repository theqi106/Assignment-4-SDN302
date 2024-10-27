const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/info", (req, res) => {
  res.json({
    data: {
      fullName: "To The Vi",
      studentCode: "QE170234",
    },
  });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
