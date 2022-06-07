// ####################################
// React && Plugins
// ####################################
import Head from "next/head";
import Image from "next/image";
import { useEffect, Fragment, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
// import useSWR from "swr";
// ####################################

// ####################################
// Components
// ####################################
import SortingBar from "../../components/General/SortingBar";
import Heading from "../../components/General/Heading";
import MovieGrids from "../../components/Movie/MovieGrids";
// ####################################

// ####################################
// API
// ####################################
import { getGenres, getTrendingMovies } from "../../utils/api";
// ####################################

// ####################################
// DATA
// ####################################
import { common } from "../../data/data";
// ####################################

export default function Movies(props) {
  const { initial, genres } = props;
  const [movies, setMovies] = useState(initial);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation();
  const { heading } = common;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (load) {
      console.log("PAGE: ", page);
      loadMoreData();
      setLoad(false);
    }
  }, [load]);

  const loadMoreData = async () => {
    const data = await getTrendingMovies({ page: page });
    const movies = data["result"] ? data["result"]["results"] : null;
    if (movies) {
      console.log("movie: ", movies);
      setMovies((oldMovies) => {
        return [...oldMovies, ...movies];
      });
    }
  };

  const handleScroll = (e) => {
    let scrollTop = e.target.documentElement.scrollTop;
    let winHeight = window.innerHeight;
    let scrollHeight = e.target.documentElement.scrollHeight;
    let curHeight = winHeight + scrollTop + 3;

    if (curHeight >= scrollHeight) {
      setLoad(true);
      setPage((page += 1));
    }
  };

  return (
    <Fragment>
      <SortingBar />

      <Heading data={t(heading["more"])}></Heading>

      {movies && <MovieGrids data={movies} genres={genres} />}
    </Fragment>
  );
}

export async function getServerSideProps({ locale }) {
  const data = await getTrendingMovies({});
  const data2 = await getGenres();
  const initial = data["result"] ? data["result"]["results"] : null;
  const genres = data2["status"] == 200 ? data2["result"] : {};

  return {
    props: {
      initial,
      genres,
      ...(await serverSideTranslations(locale, ["common", "movie", "movies"])),
    },
  };
}
