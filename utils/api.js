async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log("APIdata: ", response);

    return { status: 200, msg: "success", result: data };
  } catch (error) {
    return { status: 401, msg: `ERROR: ${error}`, result: null };
  }
}

// ####################################
// Movies
// ####################################
export async function getDiscoverMovies({
  page = 1,
  sort = "popularity.desc",
}) {
  // https://developers.themoviedb.org/3/discover/movie-discover
  const endpoint = `${process.env.movieDB.apiDomain}/discover/movie`;
  const params = `&page=${page}&sort_by=${sort}`;
  const url = `${endpoint}?api_key=${process.env.movieDB.apiKey}${params}`;
  return getData(url);
}

export async function getTrendingMovies({ page = 1, adult = false }) {
  // https://developers.themoviedb.org/3/trending/get-trending
  const endpoint = `${process.env.movieDB.apiDomain}/trending/movie/week`;
  const params = `&page=${page}&include_adult=${adult}`;
  const url = `${endpoint}?api_key=${process.env.movieDB.apiKey}${params}`;
  return getData(url);
}

export async function getMovieByID({ ID }) {
  // https://developers.themoviedb.org/3/movies/get-movie-details
  let id = String(ID);
  const endpoint = `${process.env.movieDB.apiDomain}/movie/${id}`;
  const url = `${endpoint}?api_key=${process.env.movieDB.apiKey}`;
  return getData(url);
}

export async function searchMovie({ keyword, page = 1 }) {
  // https://developers.themoviedb.org/3/search/search-movies
  const endpoint = `${process.env.movieDB.apiDomain}/search/movie/`;
  const params = `&query=${keyword}&page=${page}`;
  const url = `${endpoint}?api_key=${process.env.movieDB.apiKey}${params}`;
  return getData(url);
}

// ####################################
// Configuration
// ####################################
export async function getGenres() {
  // https://developers.themoviedb.org/3/genres/get-movie-list
  const endpoint = `${process.env.movieDB.apiDomain}/genre/movie/list`;
  const params = `&language=en-US`;
  const url = `${endpoint}?api_key=${process.env.movieDB.apiKey}${params}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const genres = data["genres"];
    let result = {};
    for (let n = 0; n < genres.length; n++) {
      result[genres[n]["id"]] = { ...genres[n] };
    }
    return { status: 200, msg: "success", result: result };
  } catch (error) {
    return { status: 401, msg: `ERROR: ${error}`, result: null };
  }
}

export async function getLanguages() {
  // https://developers.themoviedb.org/3/configuration/get-languages
  const endpoint = `${process.env.movieDB.apiDomain}/configuration/languages`;
  const url = `${endpoint}?api_key=${process.env.movieDB.apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    let result = {};
    for (let n = 0; n < data.length; n++) {
      result[data[n]["iso_639_1"]] = { ...data[n] };
    }
    return { status: 200, msg: "success", result: result };
  } catch (error) {
    return { status: 401, msg: `ERROR: ${error}`, result: null };
  }
}

// ####################################
// API Routes
// ####################################
export async function getUserMovies(obj) {
  const response = await fetch("/api/user/getMovies", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export async function postMovie(obj) {
  const response = await fetch("/api/user/postMovie", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export async function deleteMovie(obj) {
  const response = await fetch("/api/user/deleteMovie", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export async function createUser(obj) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

// Sorting Values: ,
// popularity.asc, popularity.desc,
// release_date.asc, release_date.desc,
// revenue.asc, revenue.desc,
// primary_release_date.asc, primary_release_date.desc,
// original_title.asc, original_title.desc,
// vote_average.asc, vote_average.desc,
// vote_count.asc, vote_count.desc
// default: popularity.desc
