// ####################################
// React && Plugins
// ####################################
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import Script from "next/script";
import { useTranslation } from "next-i18next";
// ####################################

// ####################################
// Components
// ####################################
import Heading from "../General/Heading";
import MovieGrids from "../Movie/MovieGrids";
// ####################################

// ####################################
// DATA
// ####################################
import { common } from "../../data/data";
// ####################################

function Explore(props) {
  const { data, genres } = props;
  const { t, i18n } = useTranslation();
  const { btn, heading } = common;

  return (
    <section className="explore" id="explore">
      <Heading data={t(heading["more"])}></Heading>

      <MovieGrids data={data} genres={genres} />

      <div className="btn-box">
        <Link href="/movie">
          <a className="btn">{t(btn["more"])}</a>
        </Link>
      </div>
    </section>
  );
}

export default Explore;
