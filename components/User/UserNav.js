// ####################################
// React && Plugins
// ####################################
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useSession, signOut } from "next-auth/react";
// ####################################

// ####################################
// REDUX
// ####################################
import { useStateValue } from "../../redux/StateProvider";
// ####################################

// ####################################
// Data
// ####################################
import { user } from "../../data/data";
// ####################################

function UserNav() {
  const [{}, dispatch] = useStateValue();
  const { t, i18n } = useTranslation();

  const handleLogoutClick = (e) => {
    dispatch({
      type: "SET_MESSAGE",
      message: { status: 201, message: "You have logged out." },
    });
    signOut();
  };

  return (
    <div className="user-nav">
      <ul>
        <Link href="/user/profile">
          <li>
            <i className="bx bx-user"></i>{" "}
            <span>{t(user["nav"]["profile"])}</span>
          </li>
        </Link>

        <li onClick={handleLogoutClick}>
          <i className="bx bx-exit"></i>
          <span>{t(user["nav"]["logout"])}</span>
        </li>
      </ul>
    </div>
  );
}

export default UserNav;
