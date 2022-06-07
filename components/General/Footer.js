// ####################################
// React && Plugins
// ####################################
import { useTranslation } from "next-i18next";
// ####################################

// ####################################
// DATA
// ####################################
import { common } from "../../data/data";
// ####################################

function Footer() {
  const curYear = new Date().getFullYear();
  const { credit } = common;
  const { t, i18n } = useTranslation();

  return (
    <section className="footer">
      <p className="credit">
        @{curYear} <span>PineLabs Cinema</span> | {t(credit)}
      </p>
    </section>
  );
}

export default Footer;
