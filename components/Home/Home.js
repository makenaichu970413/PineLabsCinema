// ####################################
// React && Plugins
// ####################################
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
// ####################################

// ####################################
// DATA
// ####################################
import { movie, btn } from "../../data/data";
// ####################################

function Home() {
  const { t, i18n } = useTranslation();

  return (
    <section className="home" id="home">
      <div className="home-banner">
        <div className="home-img">
          <Image
            src={"/Images/home-background.png"}
            alt={`home-img`}
            layout="fill"
          />
        </div>

        <div className="home-content">
          <h1 className="title">hitman wife bodyguard</h1>

          <p>releasing 10 april </p>

          <Link href={"/movie/522931"}>
            <a className="watch-btn">
              <i className="bx bx-right-arrow"></i>
              <span>{t(movie["trailer"])}</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
