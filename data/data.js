export const sidebar = {
  menu: [
    { href: "/", title: "side.home", icon: "bx bx-home" },
    {
      href: "/movie/sort/order?sort=popularity.desc",
      title: "side.trend",
      icon: "bx bxs-hot",
    },
    {
      href: "/movie/sort/order?sort=release_date.desc",
      title: "side.explore",
      icon: "bx bx-compass",
    },
    { href: "/movie", title: "side.movies", icon: "bx bx-movie-play" },
    { href: "/user/profile", title: "side.fav", icon: "bx bx-book-heart" },
  ],

  setting: {
    theme: { dark: "side.dark", light: "side.light" },

    languages: ["en", "zh", "ms"],

    language: {
      en: { title: "english" },
      zh: { title: "中文" },
      ms: { title: "malay" },
    },
  },
};

export const movies = {
  order: {
    asc: "movies:order.asc",
    desc: "movies:order.desc",
    title: "movies:order.title",
  },
  search: {
    empty: "movies:search.empty",
    placeholder: "movies:search.placeholder",
    result: "movies:search.result",
  },
  sort: {
    original_title: "movies:sort.original_title",
    popularity: "movies:sort.popularity",
    release_date: "movies:sort.release_date",
    result: "movies:sort.result",
    revenue: "movies:sort.revenue",
    title: "movies:sort.title",
  },
};

export const movie = {
  cast: "movie:movie.cast",
  date: "movie:movie.date",
  duration: "movie:movie.duration",
  genres: "movie:movie.genres",
  info: "movie:movie.info",
  language: "movie:movie.language",
  minute: "movie:movie.minute",
  trailer: "movie:movie.trailer",
};

export const common = {
  btn: { book: "btn.book", more: "btn.more" },
  heading: { more: "home.more", popular: "home.popular" },
  credit: "credit",
};

export const auth = {
  form: {
    title: { login: "auth:form.title.login", signup: "auth:form.title.signup" },

    a: {
      login: "auth:form.a.login",
      signup: "auth:form.a.signup",
    },

    p: {
      login: "auth:form.p.login",
      signup: "auth:form.p.signup",
    },

    input: {
      email: "auth:form.input.email",
      password: "auth:form.input.password",
      rePassword: "auth:form.input.rePassword",
    },
  },

  btn: {
    send: "common:btn.send",
  },
};

export const user = {
  movie: {
    btn: {
      view: "common:btn.view",
      no: "user:movie.no.btn",
    },
    h2: "user:movie.no.h2",
  },

  heading: "user:profile.heading",

  nav: {
    logout: "user:nav.logout",
    profile: "user:nav.profile",
  },
};
