const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const eventRouter = require("./routes/events");
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());

// Enable all CORS requests
app.use(cors());

// Register route
app.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  // Check if the email is already taken
  const users = JSON.parse(fs.readFileSync("users.json"));
  const user = users.find((user) => user.email === email);
  if (user) {
    return res.status(400).send("Email already taken");
  }

  // Save the user details in the JSON file
  users.push({ email, username, password });
  fs.writeFileSync("users.json", JSON.stringify(users));

  res.send("User registered successfully");
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are correct
  const users = JSON.parse(fs.readFileSync("users.json"));
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  req.session.user = user.email;

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // Generate and send JWT token
  const token = jwt.sign({ email: user.email }, "secret");
  res.send({ user, token });
});

// Mount event router on '/events' path
app.use("/events", eventRouter);

app.listen(5000, () => console.log("Server started on port 5000"));
