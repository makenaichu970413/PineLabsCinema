// ####################################
// React && Plugins
// ####################################
import { useEffect, Fragement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import ReactStars from "react-stars";
import { useTranslation } from "next-i18next";
import {
  handlePlayVideoClick,
  handleCloseVideoClick,
} from "../../utils/helper";
// ####################################

// ####################################
// COMPONENTS
// ####################################
import MovieSave from "../../components/Movie/MovieSave";
// ####################################

// ####################################
// DATA
// ####################################
import { movie } from "../../data/data";
// ####################################

function MovieBanner(props) {
  const { data } = props;
  const { t, i18n } = useTranslation();
  // console.log("data: ", data);

  const image = data["poster_path"]
    ? `${process.env.movieDB.imgDomain}/${data["poster_path"]}`
    : "/Images/no-img.jpg";

  return (
    <div className="play-container" id={`movie-${data["id"]}`}>
      <div className="play-img">
        <Image
          src={image}
          alt={`play-img-${data["id"]}`}
          layout="fill"
          unoptimized
        />
      </div>

      <div className="play-text">
        <h2>{data["title"]}</h2>

        <ReactStars
          className="rating"
          value={(data["vote_average"] / 10) * 5}
          count={5}
          size={30}
          // color1={"#ffcc0d"}
          color2={"#ffd700"}
          edit={false}
          half={true}
        />

        <div className="tags">
          {data["genres"].map((item, n) => {
            return (
              <span id={item["id"]} key={n}>
                {item["name"]}
              </span>
            );
          })}
        </div>

        <a className="watch-btn">
          <i className="bx bx-right-arrow" onClick={handlePlayVideoClick}></i>
          <span>{t(movie["trailer"])}</span>
        </a>

        <MovieSave data={data} />
      </div>

      <div className="play-video">
        <div className="video-box">
          <video
            id={"movie-trailer"}
            src={"/Images/play-page/Jumanji.mp4"}
            controls={true}
          ></video>

          <i className="bx bx-x close" onClick={handleCloseVideoClick}></i>
        </div>
      </div>
    </div>
  );
}

export default MovieBanner;
