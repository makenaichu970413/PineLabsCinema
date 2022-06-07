// ####################################
// React && Plugins
// ####################################
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { handleCloseMenuClick } from "../../../utils/helper";
// ####################################

function Setting(props) {
  const { data } = props;
  const { languages, language, theme } = data;
  const [light, setLight] = useState(false);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { locale, asPath } = router;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      // console.log("locale: ", window.location.pathname);
      // router.reload(window.location.pathname);
      setRefresh(false);
    }
  }, [asPath]);

  const handleLightClick = () => {
    document.body.classList.toggle("light");
    setLight(!light);
    handleCloseMenuClick();
  };

  const handleLanguageClick = (e) => {
    // console.log("locale: ", locale);
    // console.log("lang: ", lang);
    // console.log("asPath: ", asPath);
    const lang = e.target.getAttribute("data-lang");
    // i18n.changeLanguage(lang);
    setRefresh(true);
    router.push(`/${asPath}`, `/${asPath}`, { locale: lang });
    handleCloseMenuClick();
  };

  return (
    <ul className="setting">
      <li key={1} className="theme" onClick={handleLightClick}>
        {!light ? (
          <div className="icon light">
            <i className="bx bx-sun"></i>
          </div>
        ) : (
          <div className="icon dark">
            <i className="bx bxs-moon"></i>
          </div>
        )}

        <span className="name">
          {t(`${light ? theme["dark"] : theme["light"]}`)}
        </span>
      </li>

      <li key={2} className="language">
        <div className="icon">
          <i className="bx bx-globe"></i>
        </div>

        <span className="name"> {language[locale]["title"]}</span>

        <ul class="dropdown">
          {languages.map((item, i) => {
            return (
              <li key={i} data-lang={item} onClick={handleLanguageClick}>
                {language[item]["title"]}
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

export default Setting;
