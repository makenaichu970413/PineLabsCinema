// ####################################
// React && Plugins
// ####################################
import { useEffect, Fragement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// ####################################

// ####################################
// API
// ####################################
import { getLanguages, getMovieByID, getTrendingMovies } from "../../utils/api";
// ####################################

// ####################################
// COMPONENTS
// ####################################
import MetaHead from "../../components/General/MetaHead";
import Spinner from "../../components/General/Spinner";
import MovieBanner from "../../components/Movie/MovieBanner";
import MovieDetail from "../../components/Movie/MovieDetail";
// ####################################

// ####################################
// DATA
// ####################################
import { movie, common } from "../../data/data";
// ####################################

export default function Movie(props) {
  const { movie } = props;
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { btn } = common;

  if (router.isFallback) {
    return <Spinner />;
  }

  console.log("movie: ", movie);
  const meta = {
    title: movie["title"],
    description: movie["title"],
    ogURL: movie["title"],
    ogTitle: movie["original_title"],
    description: movie["overview"],

    ogImage: {
      src: movie["poster_path"]
        ? `${process.env.movieDB.imgDomain}/${movie["poster_path"]}`
        : `${process.env.domain}/ogImage.jpg`,
      width: "1200",
      height: "896",
    },
  };

  return (
    <>
      <MetaHead data={meta} />
      <div className="movie-detail">
        <MovieBanner data={movie} />

        <div className="btn-box">
          <a
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            href={process.env.redirect}
          >
            {t(btn["book"])}
          </a>
        </div>

        <MovieDetail data={movie} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const data = await getTrendingMovies({ page: 1 });
  const result = data["result"] ? data["result"]["results"] : null;
  const paths = result.map((item) => {
    return { params: { id: String(item["id"]) } };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { locale, params } = context;
  const movieID = params.id;
  const data1 = await getMovieByID({ ID: movieID });
  const movie = data1["status"] == 200 ? data1["result"] : null;
  // const data2 = await getLanguages();
  // const langs = data2["status"] == 200 ? data2["result"] : {};

  return {
    props: {
      movie,
      ...(await serverSideTranslations(locale, ["common", "movie", "movies"])),
    },
    revalidate: 900,
  };
}
