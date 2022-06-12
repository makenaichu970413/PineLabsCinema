// ####################################
// React && Plugins
// ####################################
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import ReactStars from "react-stars";
import Image from "next/image";
import { useRouter } from "next/router";
// ####################################

// ####################################
// API
// ####################################
import { deleteMovie } from "../../utils/api";
// ####################################

function MovieCard(props) {
  const route = useRouter();
  const { data, setLoading } = props;
  const image = data["poster_path"]
    ? `${process.env.movieDB.imgDomain}/${data["poster_path"]}`
    : "/Images/no-img.jpg";

  //   console.log("movie: ", data);

  function Tags() {
    return (
      <div className="tags">
        {data["genres"] &&
          data["genres"].map((item, i) => {
            return <span key={i}>{item["name"]}</span>;
          })}
      </div>
    );
  }

  function Languages() {
    return (
      <div className="tags green">
        {data["spoken_languages"] &&
          data["spoken_languages"].map((item, i) => {
            return <span key={i}>{item["english_name"]}</span>;
          })}
      </div>
    );
  }

  const handleDeleteClick = async () => {
    let req = { docID: data["docID"], movieID: data["id"] };
    console.log("req: ", req);
    const res = await deleteMovie(req);
    console.log("res: ", res);
    if (res["status"] === 201) {
      //   route.push("/user/profile");
      setLoading(true);
    }
  };

  return (
    <div className="movie-card">
      <div className="delete-movie" onClick={handleDeleteClick}>
        <i className="bx bxs-tag-x"></i>
      </div>

      <div className="image">
        <Image
          src={image}
          alt={`movie-img-${data["id"]}`}
          layout="fill"
          unoptimized
        />
      </div>

      <div className="content">
        <h2 className="title">{data["original_title"]}</h2>

        {Tags()}

        {Languages()}

        <ReactStars
          className="rating"
          value={data["vote_average"]}
          count={5}
          size={22}
          // color1={"#ffcc0d"}
          color2={"#ffd700"}
          edit={false}
          half={true}
        />

        <Link href={`/movie/${data["id"]}`}>
          <a className="btn">view</a>
        </Link>
        {/* <p>{data["overview"]}</p> */}
      </div>
    </div>
  );
}

export default MovieCard;
