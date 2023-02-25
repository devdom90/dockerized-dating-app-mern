const router = require("express").Router();
const bcrypt = require("bcrypt");
const { MongoClient } = require("mognodb")
require("dotenv").config();

const uri = process.env.MONGO_URI

router.post("/", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generatedId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const checkUser = await users.findOne({ email });

    if (checkUser) {
      return res.status(409).send("Die angegebene Email ist bereits vorhanden");
    }

    const formatedEmail = email.toLowerCase();

    const data = {
      user_id: generatedId,
      email: formatedEmail,
      hashed_password: hashedPassword,
    };

    const createUser = await users.insertOne(data);

    const token = jwt.sign(createUser, formatedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201).json({ token, userId: generatedId });
  } catch (err) {
    res.status(500).json("internal Server Error")
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
