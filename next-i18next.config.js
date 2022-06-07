const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "zh", "ms"],
    defaultLocale: "en",
    pages: {
      "*": "common",
    },
    localePath: path.resolve("./public/locales"),
  },
  react: {
    useSuspense: false,
  },
};
