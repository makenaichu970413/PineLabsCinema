import { connectToDB } from "../../../utils/db";
import { MongoClient, ObjectId } from "mongodb";
// https://www.codegrepper.com/code-examples/javascript/frameworks/nextjs/mongoose+.updateone%28
// https://www.section.io/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/#updating-a-post

async function handler(req, res) {
  if (req.method === "POST") {
    const { userID, movie } = req.body;
    console.log("req: ", req.body);

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
    const collection = "user-movies";
    // Check existing usser movies
    const userMovies = await db.collection(collection).findOne({
      userID: userID,
    });

    let result = {};
    if (!userMovies) {
      let obj = { userID, movies: [movie] };
      result = await db.collection(collection).insertOne(obj);
      res.status(201).json({ status: 201, message: "New movie added!" });
    } else {
      const movies = userMovies.movies;
      const existingMovie = movies.filter((item) => item.id === movie.id);
      if (existingMovie.length) {
        res.status(201).json({ status: 201, message: "Movie have added!" });
      } else {
        const newMovies = [movie, ...movies];
        result = await db
          .collection(collection)
          .updateOne(
            { _id: new ObjectId(userMovies._id) },
            { $set: { movies: newMovies } }
          );
        res.status(201).json({ status: 201, message: "New movie added!" });
      }
    }
    client.close();
    return;
  }
}

export default handler;

