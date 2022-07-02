const { i18n } = require("./next-i18next.config");

module.exports = () => {
  return {
    reactStrictMode: true,

    i18n,

    env: {
      SECRET: "a4895e4cbc2b102e4beb17ac19ed3fe8",
      domain: "https://pinelabscinema.vercel.app",
      movieDB: {
        apiDomain: "https://api.themoviedb.org/3",
        imgDomain: "https://image.tmdb.org/t/p/original",
        apiKey: "328c283cd27bd1877d9080ccb1604c91",
      },
      mongoDB: {
        username: "makenaichu970413",
        password: "NwXy1pG5l9BBUsp2",
        clustername: "cluster0",
        database: "pinelabs_cinema",
      },
      redirect: "https://www.cathaycineplexes.com.sg/",

      locales: ["common", "movie", "movies", "auth", "user"],
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
