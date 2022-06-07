// ####################################
// React && Plugins
// ####################################
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { handleCloseMenuClick, removePunct } from "../../../utils/helper";
// ####################################

import React from "react";

function Menu(props) {
  const { t, i18n } = useTranslation();
  const { data } = props;
  const router = useRouter();

  useEffect(() => {
    let path = router.asPath;
    path = removePunct(path);
    const id = `side-${path}`;
    const nav = document.querySelector(`#${id} a`);

    // console.log("id: ", id);
    // console.log("nav: ", nav);

    if (nav) {
      nav.classList.add("active");

      data.map((item) => {
        let _id = `side-${item.href.replace("#", "")}`;

        if (_id != id) {
          let _nav = document.querySelector(`#${_id} a`);
          // console.log("_nav: ", _nav);
          _nav.classList.remove("active");
        }
      });
    }

    handleCloseMenuClick();
  }, [router.asPath]);

  return (
    <ul className="side-menu">
      {data.map((item, i) => {
        const delay = (i + 1) * 150;

        return (
          <li key={i} id={`side-${item.href.replace("#", "")}`}>
            <Link href={item.href}>
              <a>
                <div className="icon">
                  <i className={item.icon}></i>
                </div>
                <span className="name">{t(`common:${item.title}`)}</span>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Menu;
