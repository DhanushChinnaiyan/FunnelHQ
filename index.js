const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./DB");
const userEntryRouter = require("./Routers/UserEntry.js");
const userAuth = require("./Controller/User_Authentication");
const cors = require("cors")
const app = express();

// dot env configuration
dotenv.config();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors())

// DB Connection
dbConnection();

// Routers
app.use("/api/user", userEntryRouter);
app.get("/api", userAuth, (req, res) => {
  try {
    res.status(200).json({ user:req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// server
app.listen(PORT, () => console.log(`Server listenin on port no : ${PORT}`));
