const router = require("express").Router();
const { MongoClient } = require("mondodb");
require("dotenv").config();

const uri = process.env.MONGO_URI

router.post("/", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const insertedMessage = await messages.insertOne(message);
    res.status(200).send(insertedMessage);
  } finally {
    await client.close();
  }
});

module.exports = router;