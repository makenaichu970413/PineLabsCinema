// ####################################
// React && Plugins
// ####################################
import { useEffect, Fragment, useState } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { formatDate } from "../../utils/helper";
// ####################################

// ####################################
// API
// ####################################
import { postMovie } from "../../utils/api";
// ####################################

function MovieSave(props) {
  // const { data: session, status } = useSession();
  const router = useRouter();
  const { data } = props;
  const {
    id,
    original_title,
    genres,
    poster_path,
    overview,
    spoken_languages,
  } = data;

  const handleSaveMovie = () => {
    getSession().then((session) => {
      if (!session) {
        router.push("/auth/login");
      } else {
        console.log(data);
        const newMovie = {
          id,
          original_title,
          genres,
          poster_path,
          overview,
          spoken_languages,
          vote_average: (data["vote_average"] / 10) * 5,
          created_date: Date.now(),
        };
        const req = { userID: session.user.name, movie: newMovie };
        postMovie(req);
      }
    });
  };

  return (
    <div className="movie-save" onClick={handleSaveMovie}>
      <i className="bx bx-bookmark-heart"></i>
    </div>
  );
}

export default MovieSave;
