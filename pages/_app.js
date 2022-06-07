// ####################################
// React && Plugins
// ####################################
import { Fragment, useEffect, Suspense } from "react";
import Head from "next/head";
import AOS from "aos";
import { appWithTranslation } from "next-i18next";
// ####################################

// ####################################
// CSS
// ####################################
import "aos/dist/aos.css";
import "../styles/swiper-bundle.min.css";
import "../styles/style.css";
// ####################################

// ####################################
// Components
// ####################################
import PagePanel from "../components/General/PagePanel";
// ####################################

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      // once: true,
      offset: 50,
    });
  }, []);

  const data = {
    ogSiteName: "pinelabscinema.com",
    description:
      "PineLabs Cinemas (PLC) is a multiplex cinema operator & the leading cinema online Malaysia. Get movie showtimes, cinema location & buy movie tickets online here.",
    ogImage: {
      src: `${process.env.domain}/ogImage.jpg`,
      width: "1200",
      height: "896",
    },
  };

  return (
    <Fragment>
      <Head>
        <title>PineLabs Cinema</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={data["description"]} />
        <link rel="icon" href="/fav-icon.png" />
        <meta
          property="og:site_name"
          content={data["ogSiteName"]}
          key="ogsitename"
        />
        <meta
          property="og:image"
          content={data["ogImage"]["src"]}
          key="ogimage"
          itemProp="image"
        />
        <meta property="og:image:width" content={data["ogImage"]["width"]} />
        <meta property="og:image:height" content={data["ogImage"]["height"]} />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>

      <PagePanel>
        <Component {...pageProps} />
      </PagePanel>
    </Fragment>
  );
}

export default appWithTranslation(MyApp);
