const router = require("express").Router();
const { MongoClient } = require("mondodb");
require("dotenv").config();

const uri = process.env.MONGO_URI

router.get("/", async (req, res) => {
  const { userId, correspondingUserId } = req.query;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.status(200).send(foundMessages);
  } finally {
    await client.close();
  }
});

module.exports = router;