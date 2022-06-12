import { connectToDB } from "../../../utils/db";
import { hashPassword } from "../../../utils/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, rePassword } = req.body;
    // console.log("data: ", req.body);

    if (password != rePassword) {
      res.status(421).json({
        message: "The password and confirmed password are not same.",
      });
      return;
    }

    const verify =
      !email || !email.includes("@") || !password || password.trim().length < 7;

    if (verify) {
      res.status(422).json({
        message:
          "Invalid Input - password should also be at least 7 characters long.",
      });
      return;
    }

    let client;
    try {
      client = await connectToDB();
    } catch (error) {
      res.status(500).json({
        msg: `Could not connect to database. ${error.message}`,
      });
      return;
    }

    const db = client.db();
    const collection = "users";

    // Check existing email
    const existingUser = await db.collection(collection).findOne({
      email: email,
    });

    if (existingUser) {
      res.status(422).json({
        message: "Email exists already!",
      });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);
    const result = await db.collection(collection).insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ msg: "User created successfully!" });
    client.close();
  }
}

export default handler;
