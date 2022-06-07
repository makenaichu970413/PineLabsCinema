// ####################################
// React && Plugins
// ####################################
import { useEffect, Fragement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

// ####################################

function MovieCast(props) {
  const { data } = props;
  const { i } = data;

  return (
    <div className="cast-box">
      <div className="image">
        <Image
          src={`/images/play-page/cast${i + 1}.jpg`}
          layout="fill"
          alt={`cast-img-${i + 1}`}
        />
      </div>
      <span className="name">Dwayne Johnson</span>
    </div>
  );
}

export default MovieCast;
