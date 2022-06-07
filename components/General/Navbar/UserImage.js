// ####################################
// React && Plugins
// ####################################
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ####################################

function UserImage() {
  return (
    <Link href="/">
      <div className="user-image">
        <Image src="/images/user-img.jpeg" alt="user-img" layout="fill" />
      </div>
    </Link>
  );
}

export default UserImage;
