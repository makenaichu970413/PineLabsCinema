// ####################################
// React && Plugins
// ####################################
import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
// ####################################

// ####################################
// Data
// ####################################
import { movies } from "../../data/data";
// ####################################

function SortingBar() {
  const router = useRouter();
  const { query } = router;
  const { t, i18n } = useTranslation();
  const { sort, order } = movies;

  const handleOnChange = () => {
    const sortBy = document.getElementById("sortBy");
    const sortOrder = document.getElementById("sortOrder");
    const value = `${sortBy.value}.${sortOrder.value}`;
    const path = `/movie/sort/order?sort=${value}`;
    router.push(path);

    // console.log("sortBy: ", sortBy.value);
  };

  return (
    <div className="sort-bar">
      <div className="sort-box">
        <div>
          <h2>{t(sort["title"])}:</h2>
          <select className="sort-by" id="sortBy" onChange={handleOnChange}>
            <option value="popularity" selected={true}>
              {t(sort["popularity"])}
            </option>
            <option value="release_date">{t(sort["release_date"])}</option>
            <option value="revenue">{t(sort["revenue"])}</option>
            <option value="original_title">{t(sort["original_title"])}</option>
          </select>
        </div>

        <div>
          <h2>{t(order["title"])}:</h2>
          <select
            className="sort-order"
            id="sortOrder"
            onChange={handleOnChange}
          >
            <option value="desc" selected={true}>
              {t(order["desc"])}
            </option>
            <option value="asc"> {t(order["asc"])}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SortingBar;
