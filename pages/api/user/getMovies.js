import { connectToDB } from "../../../utils/db";
import { hashPassword } from "../../../utils/auth";
import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { userID } = req.body;
    // console.log("userID: ", userID);

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
    const collection = "user-movies";
    // Get user movies
    const result = await db.collection(collection).findOne({
      userID: userID,
    });

    res.status(201).json({ status: 201, message: "Get user movies!", result });
    client.close();
  }
}

export default handler;

// const hashedPassword = await hashPassword(password);
// const result = await db.collection(collection).insertOne({
//   email: email,
//   password: hashedPassword,
// });
