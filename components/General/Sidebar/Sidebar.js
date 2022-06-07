// ####################################
// React && Plugins
// ####################################
import React, { useEffect } from "react";
import Link from "next/link";
import { handleCloseMenuClick } from "../../../utils/helper";
// ####################################

// ####################################
// Data
// ####################################
import { sidebar } from "../../../data/data";
// ####################################

// ####################################
// Components
// ####################################
import Menu from "./Menu";
import Setting from "./Setting";
import CloseButton from "./CloseButton";
// ####################################

function Sidebar() {
  const { menu, setting } = sidebar;

  return (
    <section className="sidebar">
      <CloseButton />

      <Menu data={menu} />

      <Setting data={setting} />
    </section>
  );
}

export default Sidebar;
