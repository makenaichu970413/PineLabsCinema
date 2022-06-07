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
import MovieBox from "./MovieBox";
// ####################################

function MovieSwiper(props) {
  const { data, genres } = props;
  const max = 10;

  const handleOnLoad = async () => {
    var swiper = await new Swiper(".trending-swiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      // centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        510: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        758: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        900: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
    // console.log("swiper: ", swiper);
  };

  return (
    <div>
      <Script
        src="https://unpkg.com/swiper/swiper-bundle.min.js"
        onLoad={handleOnLoad}
      />

      <div className="swiper trending-swiper">
        <div className="swiper-wrapper">
          {data &&
            data.slice(0, max).map((item, i) => {
              return (
                <div className="swiper-slide" key={i}>
                  <MovieBox data={{ i, ...item }} genres={genres} />
                </div>
              );
            })}
        </div>

        {/* <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div className="swiper-pagination"></div> */}
      </div>
    </div>
  );
}

export default MovieSwiper;

// Refference ==>
// https://codesandbox.io/s/gzh3rr?file=/index.html:1988-2072
