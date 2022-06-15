// ####################################
// React && Plugins
// ####################################
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { handleCloseSearchForm } from "../../../utils/helper";
// ####################################

// ####################################
// DATA
// ####################################
import { movies as moviesData } from "../../../data/data";
// ####################################

function Search() {
  const router = useRouter();
  const [keyword, setKeyword] = useState(null);
  const { t, i18n } = useTranslation();

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13 && keyword && keyword != "") {
      // console.log("Down Enter: ", keyword);
      handleOnSearch();
    }
    return false;
  };

  const handleOnSearch = () => {
    const path = `/movie/search/keyword?search=${keyword}`;
    setKeyword(null);
    handleCloseSearchForm();
    router.push(path);
  };

  return (
    <div className="searc-box">
      <input
        type="search"
        name="search-movie"
        id="search-input"
        placeholder={t(moviesData["search"]["placeholder"])}
        onKeyDown={handleOnKeyDown}
        value={keyword}
        onKeyUp={(e) => setKeyword(e.target.value.trim())}
        onChange={(e) => setKeyword(e.target.value.trim())}
      />
      <i className="bx bx-search-alt-2" onClick={handleOnSearch}></i>
    </div>
  );
}

export default Search;
