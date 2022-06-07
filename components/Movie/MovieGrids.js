// ####################################
// React && Plugins
// ####################################
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import Script from "next/script";
// ####################################

// ####################################
// Components
// ####################################
import MovieBox from "../Movie/MovieBox";
// ####################################

function MovieGrids(props) {
  const { data, genres } = props;

  return (
    <div className="movie-grids">
      {data &&
        data.map((item, i) => {
          return <MovieBox key={i} data={{ i, ...item }} genres={genres} />;
        })}
    </div>
  );
}

export default MovieGrids;
