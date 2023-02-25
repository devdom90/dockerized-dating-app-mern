const router = require("express").Router();
require("dotenv").config();

const uri = process.env.MONGO_URI

router.put("/", async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

module.exports = router;