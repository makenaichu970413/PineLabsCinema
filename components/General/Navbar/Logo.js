// ####################################
// React && Plugins
// ####################################
import { useEffect } from "react";
import Link from "next/link";
// ####################################

function Logo() {
  return (
    <Link href={"/"}>
      <a>
        <div className="logo">
          <i className="bx bx-camera-movie"></i>
          <h2>PLC</h2>
        </div>
      </a>
    </Link>
  );
}

export default Logo;
