// ####################################
// React && Plugins
// ####################################
import React, { useEffect } from "react";
import Link from "next/link";
// ####################################

function UserImage() {
  return (
    <Link href="/">
      <div className="user-image">
        <img src="/images/user-img.jpeg" alt="user-img" />
      </div>
    </Link>
  );
}

export default UserImage;
