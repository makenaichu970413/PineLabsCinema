// ####################################
// React && Plugins
// ####################################
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { handleCloseMenuClick } from "../../../utils/helper";
// ####################################

function CloseButton() {
  useEffect(() => {
    window.onscroll = (e) => {
      if (window.innerWidth < 991) {
        handleCloseMenuClick();
      }
    };
  }, []);

  return (
    <button className="menu-btn" onClick={handleCloseMenuClick}>
      <div className="hamburger"></div>
    </button>
  );
}

export default CloseButton;
