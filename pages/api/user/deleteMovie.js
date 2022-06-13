import { connectToDB } from "../../../utils/db";
import { MongoClient, ObjectId } from "mongodb";
import { findJsonInArr } from "../../../utils/helper";

async function handler(req, res) {
  if (req.method === "POST") {
    const { docID, movieID } = req.body;
    console.log("req: ", req.body);

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
    // Check existing usser movies
    const userMovies = await db.collection(collection).findOne({
      _id: new ObjectId(docID),
    });

    let result = {};
    const movies = userMovies.movies;

    if (movies) {
      const { index, obj } = findJsonInArr(movies, "id", movieID);
      if (index > -1) {
        movies.splice(index, 1); // 2nd parameter means remove one item only
        result = await db
          .collection(collection)
          .updateOne(
            { _id: new ObjectId(docID) },
            { $set: { movies: movies } }
          );
        res.status(201).json({ status: 201, message: "Movie has deleted!" });
      }
    }

    client.close();
    return;
  }
}

export default handler;
