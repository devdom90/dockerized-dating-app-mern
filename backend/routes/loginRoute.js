const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI

router.post("/", async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);
  const { Email, Password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ Email });

    const correctPassword = await bcrypt.compare(
      Password,
      user.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, Email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id });
    }

    res.status(400).json("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(500).json("internal Server Error")
  } finally {
    await client.close();
  }
});

module.exports = router;
