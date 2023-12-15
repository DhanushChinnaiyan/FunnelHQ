const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./DB");
const userEntryRouter = require("./Routers/UserEntry.js");
const userAuth = require("./Controller/User_Authentication");
const cors = require("cors")
const app = express();
const passport = require("passport")
const session = require('express-session')
const passportStrategy = require("./passport");
const authRoute = require("./Routers/google_Auth");

// dot env configuration
dotenv.config();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors())
app.use(session({
  secret: 'somethingsecretgoeshere',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

// DB Connection
dbConnection();

// Routers
app.use("/api/user", userEntryRouter);
app.use("/auth",authRoute)

// server
app.listen(PORT, () => console.log(`Server listenin on port no : ${PORT}`));
