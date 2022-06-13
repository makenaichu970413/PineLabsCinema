// ####################################
// React && Plugins
// ####################################
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { handleOpenUserNavClick } from "../../utils/helper";
// ####################################

function UserImage() {
  return (
    <div className="user-image" onClick={handleOpenUserNavClick}>
      <Image
        src="/Images/user-img.jpeg"
        alt="user-img"
        layout="fill"
        unoptimized
      />
    </div>
  );
}

export default UserImage;
