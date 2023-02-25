const router = require("express").Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Get Users
router.get("/get-users", async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI));
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

// Get Users by Id
router.get("/users", async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();

    res.status(200).json(foundUsers);
  } finally {
    await client.close();
  }
});

// Get Gendered Users Endpoint
router.get("/gendered-users", async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);
  const gender = req.query.gender;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = { gender_identity: { $eq: gender } };
    const foundUsers = await users.find(query).toArray();
    res.status(200).json(foundUsers);
  } finally {
    await client.close();
  }
});

module.exports = router;
