// ####################################
// React && Plugins
// ####################################
import { useEffect, Fragment, useState } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { formatDate } from "../../utils/helper";
import { findJsonInArr } from "../../utils/helper";
// ####################################

// ####################################
// Components
// ####################################
import Spinner from "../../components/General/Spinner";
import MovieCard from "./MovieCard";
// ####################################

// ####################################
// API
// ####################################
import { getUserMovies } from "../../utils/api";
// ####################################

function MoviesListing(props) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const [docID, setDocID] = useState(null);
  const { session } = props;

  const initial = async () => {
    const res = await getUserMovies({ userID: session.user.name });
    if (res["status"] === 201) {
      setMovies(res["result"]["movies"]);
      setDocID(res["result"]["_id"]);
    }
    setLoading(false);
    console.log("res: ", res);
  };

  useEffect(() => {
    initial();
  }, [loading]);

  useEffect(() => {
    // console.log("movies: ", movies);

    if (movies) {
      findJsonInArr(movies, "id", 857132);
    }
  }, [movies]);

  if (loading) {
    return <Spinner />;
  }

  if (movies.length) {
    return (
      <div className="user-movies">
        {movies.map((item, i) => {
          return (
            <MovieCard
              key={i}
              data={{ docID, ...item }}
              setLoading={setLoading}
            />
          );
        })}
      </div>
    );
  }
}

export default MoviesListing;
