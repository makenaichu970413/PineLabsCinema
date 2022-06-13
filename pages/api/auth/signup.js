import { connectToDB } from "../../../utils/db";
import { hashPassword } from "../../../utils/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, rePassword } = req.body;
    // console.log("data: ", req.body);

    if (!email.includes("@")) {
      res.status(201).json({
        status: 422,
        message: "Invalid Input - email address should be include '@'.",
      });
      return;
    }

    if (password.trim().length < 7) {
      res.status(201).json({
        status: 422,
        message:
          "Invalid Input - password should also be at least 7 characters long.",
      });
      return;
    }

    if (password != rePassword) {
      res.status(201).json({
        status: 422,
        message: "The password and confirmed password are not same.",
      });
      return;
    }

    let client;
    try {
      client = await connectToDB();
    } catch (error) {
      res.status(201).json({
        status: 500,
        message: `Could not connect to database. ${error.message}`,
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
      res.status(201).json({
        status: 422,
        message: "Email exists already.",
      });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);
    const result = await db.collection(collection).insertOne({
      email: email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ status: 201, message: "User created successfully!" });
    client.close();
    return;
  }
}

export default handler;
