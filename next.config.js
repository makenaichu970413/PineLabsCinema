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

      redirect: "https://www.cathaycineplexes.com.sg/",
    },
    images: {
      domains: ["image.tmdb.org"],
    },
  };
};
