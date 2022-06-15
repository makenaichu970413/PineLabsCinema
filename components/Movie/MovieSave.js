// ####################################
// React && Plugins
// ####################################
import { useEffect, Fragment, useState } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { findJsonInArr } from "../../utils/helper";
// ####################################

// ####################################
// API
// ####################################
import { postMovie } from "../../utils/api";
// ####################################

// ####################################
// REDUX
// ####################################
import { useStateValue } from "../../redux/StateProvider";
// ####################################

function MovieSave(props) {
  // const { data: session, status } = useSession();
  const [{ user }, dispatch] = useStateValue();
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
    getSession().then(async (session) => {
      if (!session) {
        router.push("/auth/login");
      } else {
        // console.log(data);
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
        dispatch({
          type: "SET_MESSAGE",
          message: { status: 0, message: null },
        });
        const res = await postMovie(req);
        dispatch({ type: "SET_MESSAGE", message: res });
      }
    });
  };

  const initial = () => {
    if (user) {
      const { index, obj } = findJsonInArr(user["movies"], "id", id);
      // console.log("index: ", index);

      if (index > -1) {
        const saveBtn = document.querySelector(".movie-save");
        saveBtn.classList.add("active");
      }
    }
  };

  useEffect(() => {
    initial();
  }, []);

  return (
    <div className="movie-save" onClick={handleSaveMovie}>
      <i className="bx bx-bookmark-heart"></i>
    </div>
  );
}

export default MovieSave;
