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
import MovieSwiper from "../Movie/MovieSwiper";
// ####################################

// ####################################
// DATA
// ####################################
import { common } from "../../data/data";
// ####################################

function Popular(props) {
  const { data, genres } = props;
  const { t, i18n } = useTranslation();
  const { btn, heading } = common;

  return (
    <section className="trending" id="trending">
      <Heading data={t(heading["popular"])}>
        <div className="swiper-buttons">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </Heading>

      <MovieSwiper data={data} genres={genres} />
    </section>
  );
}

export default Popular;

// ===========================================
// Swiper Plugin
// ===========================================
// Tutorial ==>
// https://www.youtube.com/watch?v=vwYiYMxUu4o
// *Start from 26:00

// Installation ==>
// 1. Go to "get-started"
// https://swiperjs.com/get-started

// 2. Go to "Download assets"
// Eg: https://unpkg.com/browse/swiper@8.2.2/

// 3. Find & Download "swiper-bundle.min.css"
// 3.1 Put into "styles" folder
// 3.2 import into "_app.js"
// Eg: import "../styles/swiper-bundle.min.css";

// 4. Import the "swiper-bundle.min.js" from Online by import Script from "next/script"
// 4.1  <Script src="https://unpkg.com/swiper/swiper-bundle.min.js" onLoad={handleOnLoad} />

// 5. Copy the JS code into "handleOnLoad" function

// ===========================================
