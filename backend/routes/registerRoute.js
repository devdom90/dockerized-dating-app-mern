const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const client = new MongoClient(uri);
  const { Email, Password } = req.body;

  const generatedId = uuidv4();
  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const checkUser = await users.findOne({ Email });

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
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;