// ####################################
// React && Plugins
// ####################################
import { useEffect } from "react";
import Link from "next/link";
// ####################################

function BackTop() {
  useEffect(() => {
    // ======================
    // Back To Top
    // ======================
    const back2Top = document.querySelector(".back2Top");
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        back2Top.classList.add("active");
      } else {
        back2Top.classList.remove("active");
      }
    });

    const smoothScrollToTop = () => {
      var i = window.pageYOffset;
      var time = 15;
      var gap = i / time;
      var min = -i / gap;

      var timer = setInterval(function () {
        window.scrollTo(0, i);
        i -= gap;
        // console.log("i: ", i);
        if (i < min) clearInterval(timer);
      }, time);
    };

    back2Top.onclick = () => {
      smoothScrollToTop();
    };
  }, []);

  return (
    <div className="back2Top">
      <i className="fas fa-chevron-up"></i>
    </div>
  );
}

export default BackTop;
