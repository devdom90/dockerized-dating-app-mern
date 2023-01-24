const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const addMatchRoute = require("./routes/addMatchRoute");
const userRoutes = require("./routes/userRoutes");
const userUpdateRoute = require("./routes/userUpdateRoute");
const getMessagesRoute = require("./routes/getMessagesRoute");
const addMessageRoute = require("./routes/addMessageRoute");

//App config / Port
const PORT = 8000;
const uri = process.env.MONGO_URI;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//--------ROUTES-------//

// Register Endpoint
app.post("/register", registerRoute);

// Login Endpoint
app.post("/login", loginRoute);

// Update Match Endpoint
app.put("/addmatch", addMatchRoute);

// Get User/ User by Id / User by Gender Endpoint
app.get("/user", userRoutes);

// Update a User Endpoint
app.put("/update-user", userUpdateRoute);

// Get Messages by from_userId and to_userId
app.get("/messages", getMessagesRoute);

// Add Message Endpoint
app.post("/addmessage", addMessageRoute);


app.listen(PORT, () => console.log("Server running on PORT " + PORT));
