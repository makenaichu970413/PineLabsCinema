const { i18n } = require("./next-i18next.config");

module.exports = () => {
  return {
    reactStrictMode: true,

    i18n,

    env: {
      domain: "https://pinelabscinema.vercel.app",
      movieDB: {
        apiDomain: "https://api.themoviedb.org/3",
        imgDomain: "https://image.tmdb.org/t/p/original",
        apiKey: "328c283cd27bd1877d9080ccb1604c91",
      },
      mongoDB: {
        username: "makenaichu970413",
        password: "Chu970413045109",
        clustername: "cluster0",
        database: "pinelabs_cinema",
      },
      redirect: "https://www.cathaycineplexes.com.sg/",
    },

    images: {
      domains: [
        "image.tmdb.org",
        "pinelabscinema.vercel.app",
        "pinelabscinema-86vkgrkd0-makenaichu970413.vercel.app",
      ],
    },
  };
};
