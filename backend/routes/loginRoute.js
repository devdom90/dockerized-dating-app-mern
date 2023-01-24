const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const client = new MongoClient(uri);
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
  } finally {
    await client.close();
  }
});

module.exports = router;
