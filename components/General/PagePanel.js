// ####################################
// React && Plugins
// ####################################
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { handleCloseMenuClick } from "../../utils/helper";
// ####################################

// ####################################
// Components
// ####################################
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import BackTop from "./BackTop";
import Footer from "./Footer";
// ####################################

import React from "react";

function PagePanel(props) {
  const { children } = props;

  return (
    <Fragment>
      <Navbar />

      <Sidebar />

      <div onClick={handleCloseMenuClick}>
        <main>{children}</main>

        <BackTop />

        <Footer />
      </div>
    </Fragment>
  );
}

export default PagePanel;
