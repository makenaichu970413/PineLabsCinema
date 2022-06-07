// ####################################
// React && Plugins
// ####################################
import { useEffect, Fragement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "next-i18next";
// ####################################

// ####################################
// COMPONENTS
// ####################################
import MovieCast from "./MovieCast";
// ####################################

// ####################################
// DATA
// ####################################
import { movie, btn } from "../../data/data";
// ####################################

function MovieDetail(props) {
  const { data } = props;
  const { t, i18n } = useTranslation();

  // const lang =
  //   data["original_language"] in langs
  //     ? langs[data["original_language"]]["english_name"]
  //     : "unknown";

  const langs = data["spoken_languages"];
  const lang = langs.length > 0 ? langs[0]["english_name"] : "unknown";

  return (
    <div className="about-movie">
      <h2>{data["title"]}</h2>
      <p>{data["overview"]}</p>

      <h2 className="info-heading">{t(movie["info"])}</h2>
      <div className="info">
        <div>
          <h3>{t(movie["genres"])}: </h3>
          <div className="tags">
            {data["genres"].map((item, n) => {
              return <span key={n}>{item["name"]}</span>;
            })}
          </div>
        </div>

        <div>
          <h3>{t(movie["language"])}: </h3>
          <span>{lang}</span>
        </div>

        <div>
          <h3>{t(movie["duration"])}: </h3>
          <span>
            {data["runtime"]} {t(movie["minute"])}
          </span>
        </div>

        <div>
          <h3>{t(movie["date"])}: </h3>
          <span>{data["release_date"]}</span>
        </div>
      </div>

      <h2 className="cast-heading">{t(movie["cast"])}</h2>
      <div className="cast">
        {[1, 2, 3, 4, 5, 6].map((item, i) => {
          return <MovieCast key={i} data={{ i: i }} />;
        })}
      </div>
    </div>
  );
}

export default MovieDetail;
