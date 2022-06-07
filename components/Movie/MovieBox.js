// ####################################
// React && Plugins
// ####################################
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import ReactStars from "react-stars";
import Image from "next/image";
// ####################################

function MovieBox(props) {
  const { data, genres = null } = props;
  const delay = (data["i"] + 1) * 150;

  const image = data["poster_path"]
    ? `${process.env.movieDB.imgDomain}/${data["poster_path"]}`
    : "/Images/no-img.jpg";

  function Tags() {
    let isAdult = data["adult"];
    let IDs = data["genre_ids"].length ? data["genre_ids"] : null;
    // console.log("data: ", data);
    // console.log("genres: ", genres);

    return (
      <div className="tags">
        {/* <span>{data["original_language"]}</span> */}

        {isAdult && <span className={"red"}>18+</span>}

        {genres &&
          IDs &&
          IDs.map((id, k) => {
            if (id in genres) {
              return <span key={k}>{genres[id]["name"]}</span>;
            }
          })}
      </div>
    );
  }

  return (
    <div
      className="movie-box"
      id={data["id"]}
      // data-aos="fade-up"
      // data-aos-delay={delay}
    >
      <div className="image">
        <Image src={image} alt={`movie-img-${data["id"]}`} layout="fill" />
      </div>
      <div className="content">
        <div className="movie">
          <h2 className="title">{data["title"]}</h2>

          {Tags()}

          <ReactStars
            className="rating"
            value={(data["vote_average"] / 10) * 5}
            count={5}
            size={22}
            // color1={"#ffcc0d"}
            color2={"#ffd700"}
            edit={false}
            half={true}
          />
        </div>
      </div>

      <div className="overlay">
        <div className="movie">
          <h2 className="title">{data["title"]}</h2>
          {Tags()}
        </div>
        <Link href={`/movie/${data["id"]}`}>
          <a className="watch-btn">
            <i className="bx bx-right-arrow"></i>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default MovieBox;
