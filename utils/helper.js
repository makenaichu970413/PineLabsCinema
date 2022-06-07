export const handleCloseMenuClick = (e = null) => {
  const btn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".sidebar");
  const bars = document.querySelector(".bars-icon");
  btn.classList.remove("active");
  menu.classList.remove("active");
  bars.classList.remove("active");
};

export const handleOpenMenuClick = (e = null) => {
  const btn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".sidebar");
  const bars = document.querySelector(".bars-icon");
  btn.classList.add("active");
  menu.classList.add("active");
  bars.classList.add("active");
};

export const removePunct = (str) => {
  var punctRE =
    /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
  var spaceRE = /\s+/g;
  var result = str.replace(punctRE, "").replace(spaceRE, " ");

  //   console.log("result: ", result);

  return result;
};

export const handleCloseSearchForm = (e = null) => {
  const overlay = document.querySelector(".overlay");
  const searchForm = document.querySelector(".search-form");
  overlay.classList.remove("active");
  searchForm.classList.remove("active");
};

export const handleOpenSearchForm = (e = null) => {
  const overlay = document.querySelector(".overlay");
  const searchForm = document.querySelector(".search-form");
  overlay.classList.add("active");
  searchForm.classList.add("active");
};

export const handlePlayVideoClick = (e = null) => {
  const videoBox = document.querySelector(".play-video");
  const video = document.querySelector("#movie-trailer");
  videoBox.classList.add("active");
  video.play();
};

export const handleCloseVideoClick = (e = null) => {
  const videoBox = document.querySelector(".play-video");
  const video = document.querySelector("#movie-trailer");
  videoBox.classList.remove("active");
  video.pause();
};
