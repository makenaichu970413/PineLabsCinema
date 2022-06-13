// ####################################
// React && Plugins
// ####################################
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
// ####################################

// ####################################
// Data
// ####################################
import { auth } from "../../data/data";
// ####################################

function UserLogin() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const handleLoginClick = (e) => {
    router.push("/auth/login");
  };

  return (
    <div className="btn" onClick={handleLoginClick}>
      {t(auth["form"]["title"]["login"])}
    </div>
  );
}

export default UserLogin;
