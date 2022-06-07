// ####################################
// React && Plugins
// ####################################
import Head from "next/head";
import Image from "next/image";
import { useEffect, Fragment } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// ####################################

// ####################################
// Components
// ####################################
import Home from "../components/Home/Home";
import Popular from "../components/Home/Popular";
import Explore from "../components/Home/Explore";
// ####################################

// ####################################
// API
// ####################################
import { getGenres, getTrendingMovies } from "../utils/api";
// ####################################

export default function home(props) {
  const { movies, genres } = props;

  return (
    <Fragment>
      <Home />

      {movies && <Popular data={movies} genres={genres} />}

      {movies && (
        <Explore data={movies.slice(12, movies.length)} genres={genres} />
      )}
    </Fragment>
  );
}

export async function getStaticProps({ locale }) {
  const data1 = await getTrendingMovies({});
  const data2 = await getGenres();
  const movies = data1["result"] ? data1["result"]["results"] : null;
  const genres = data2["status"] == 200 ? data2["result"] : {};

  return {
    props: {
      genres,
      movies,
      ...(await serverSideTranslations(locale, ["common", "movie", "movies"])),
    },

    revalidate: 1800,
  };
}

// ##################################
// i18next
// ##################################
// https://app.i18nexus.com/
// https://www.youtube.com/watch?v=UwzN8R6h9-U&t=904s
// npm install --save next-i18next
// npm install i18nexus-cli -g
// i18nexus pull -p ./ -k 1HM154gAYXt4rxyUnINuug

// ##################################

// npm install swr
