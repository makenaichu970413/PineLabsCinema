// ####################################
// React && Plugins
// ####################################
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import {
  handleCloseMenuClick,
  handleCloseUserNavClick,
} from "../../utils/helper";
// ####################################

// ####################################
// Components
// ####################################
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import BackTop from "./BackTop";
import Footer from "./Footer";
import Message from "./Message";
import UserNav from "../User/UserNav";
// ####################################

// ####################################
// REDUX
// ####################################
import { useStateValue } from "../../redux/StateProvider";
// ####################################

import React from "react";

function PagePanel(props) {
  const [{ message }, dispatch] = useStateValue();
  const { children } = props;

  const handleOutClick = () => {
    handleCloseMenuClick();
    handleCloseUserNavClick();
  };

  return (
    <Fragment>
      <Navbar />

      <Sidebar />

      <div className="main" onClick={handleOutClick}>
        <UserNav />

        <main>{children}</main>

        <BackTop />

        <Footer />
      </div>

      <Message />
    </Fragment>
  );
}

export default PagePanel;
