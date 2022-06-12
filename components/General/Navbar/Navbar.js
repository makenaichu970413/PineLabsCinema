// ####################################
// React && Plugins
// ####################################
import React, { useEffect } from "react";
import Link from "next/link";
import {
  handleOpenMenuClick,
  handleOpenSearchForm,
  handleCloseSearchForm,
} from "../../../utils/helper";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
// ####################################

// ####################################
// Components
// ####################################
import Logo from "./Logo";
import Search from "./Search";
import UserImage from "./UserImage";
// ####################################

function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLogin = status === "authenticated";

  // {
  //   "user": {
  //      "email": "makenaichuweb@gmail.com"
  //   },
  //   "expires": "2022-07-11T16:51:46.228Z"
  // }
  // status:  authenticated

  const handleLoginClick = (e) => {
    router.push("/auth/login");
  };

  const handleLogoutClick = (e) => {
    signOut();
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="bars-icon" onClick={handleOpenMenuClick}>
          <i className="fa-solid fa-bars"></i>
        </div>

        <Logo />
      </div>

      <div className="overlay" onClick={handleCloseSearchForm}></div>

      <div className="search-form">
        <Search />
      </div>

      <div className="nav-right">
        <div id="search-btn" onClick={handleOpenSearchForm}>
          <i className="bx bx-search-alt-2"></i>
        </div>

        <Search />

        {!isLogin && (
          <div className="btn" onClick={handleLoginClick}>
            Login
          </div>
        )}

        {isLogin && (
          <>
            <div className="btn" onClick={handleLogoutClick}>
              Logout
            </div>

            <UserImage />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
