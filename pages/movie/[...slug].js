// ####################################
// React && Plugins
// ####################################
import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { removePunct } from "../../utils/helper";
// ####################################

// ####################################
// COMPONENTS
// ####################################
import Spinner from "../../components/General/Spinner";
import Heading from "../../components/General/Heading";
import MovieGrids from "../../components/Movie/MovieGrids";
import SortingBar from "../../components/General/SortingBar";
// ####################################

// ####################################
// API
// ####################################
import { getGenres, searchMovie, getDiscoverMovies } from "../../utils/api";
// ####################################

// ####################################
// DATA
// ####################################
import { movies as moviesData } from "../../data/data";
// ####################################

function MoviesFilter(props) {
  const { query, data, genres } = props;
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("search result");
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const { search, order, sort } = moviesData;
  const { t, i18n } = useTranslation();

  if (!data) {
    return <Spinner />;
  }
  const result = data["result"];

  useEffect(() => {
    if (result) {
      setMovies(result["results"]);
      let text = "";
      if ("search" in query) {
        text = result["total_results"]
          ? t(search["result"], {
              number: result["total_results"],
              keyword: query["search"],
            })
          : t(search["empty"], {
              keyword: query["search"],
            });
      } else if ("sort" in query) {
        let value = query["sort"].split(".");
        let type = t(sort[value[0]]);
        let _order = t(order[value[1]]);
        text = `${result["total_results"]} movies are sorted by "${type}" in ${order} order`;
        text = t(sort["result"], {
          number: result["total_results"],
          sort: type,
          order: _order,
        });
      }
      setTitle(text);
    }
  }, [result]);

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

  const loadMoreData = async () => {
    console.log("Slug Query: ", query);
    let res = {};
    if ("search" in query) {
      res = await searchMovie({ page, keyword: query["search"] });
    } else if ("sort" in query) {
      res = await getDiscoverMovies({
        page,
        sort: `${query["sort"]}`,
      });
    }

    const movies = "result" in res ? res["result"]["results"] : null;
    if (movies) {
      console.log("movie: ", movies);
      setMovies((oldMovies) => {
        return [...oldMovies, ...movies];
      });
    }
  };

  return (
    <Fragment>
      <SortingBar />

      <Heading data={title}></Heading>

      {movies && <MovieGrids data={movies} genres={genres} />}
    </Fragment>
  );
}

export default MoviesFilter;

export async function getServerSideProps(context) {
  const { locale, query } = context;
  let data1 = null;
  const data2 = await getGenres();
  const genres = data2["status"] == 200 ? data2["result"] : {};

  if ("search" in query) {
    data1 = await searchMovie({ keyword: query["search"] });
  } else if ("sort" in query) {
    data1 = await getDiscoverMovies({
      sort: `${query["sort"]}`,
    });
  }

  return {
    props: {
      data: data1,
      genres,
      query,
      ...(await serverSideTranslations(locale, ["common", "movie", "movies"])),
    },
  };
}
