// ####################################
// React && Plugins
// ####################################
import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { formatDate, findJsonInArr } from "../../utils/helper";
import Link from "next/link";
import { useTranslation } from "next-i18next";
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

// ####################################
// REDUX
// ####################################
import { useStateValue } from "../../redux/StateProvider";
// ####################################

// ####################################
// Data
// ####################################
import { user } from "../../data/data";
// ####################################

function MoviesListing(props) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const [docID, setDocID] = useState(null);
  const { session } = props;
  const [{}, dispatch] = useStateValue();
  const { t, i18n } = useTranslation();

  const initial = async () => {
    const res = await getUserMovies({ userID: session.user.name });
    if (res["status"] === 201) {
      if (res["result"]) {
        setMovies(res["result"]["movies"]);
        setDocID(res["result"]["_id"]);
        dispatch({ type: "SET_USER", user: res["result"] });
      }
    }
    setLoading(false);
    console.log("res: ", res);
  };

  useEffect(() => {
    initial();
  }, [loading]);

  if (loading) {
    return <Spinner />;
  }

  if (movies && movies.length) {
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
  } else {
    return (
      <div className="user-no-movies">
        <i className="bx bx-search-alt"></i>
        <h2>{t(user["movie"]["h2"])}</h2>

        <Link href="/movie">
          <a className="btn">{t(user["movie"]["btn"]["no"])}</a>
        </Link>
      </div>
    );
  }
}

export default MoviesListing;
