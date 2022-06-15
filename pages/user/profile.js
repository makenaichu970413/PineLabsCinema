// ####################################
// React && Plugins
// ####################################
import Head from "next/head";
import Image from "next/image";
import { useEffect, Fragment, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
// ####################################

// ####################################
// Components
// ####################################
import MoviesListing from "../../components/User/MoviesListing";
import Heading from "../../components/General/Heading";
import Message from "../../components/General/Message";
// ####################################

// ####################################
// Data
// ####################################
import { user } from "../../data/data";
// ####################################

function Profile(props) {
  const { session } = props;
  const { t, i18n } = useTranslation();

  //   const [loading, setLoading] = useState(true);
  //   const [loadedSession, setLoadedSession] = useState();
  //   const { data: session, status } = useSession();
  //   const router = useRouter();

  // console.log("session: ", session);

  //   console.log("status: ", status);

  //   useEffect(() => {
  //     getSession().then((session) => {
  //       if (!session) {
  //         router.push("/auth/login");
  //       } else {
  //         setLoading(false);
  //       }
  //       //   setLoadedSession(session);
  //     });
  //   }, []);

  return (
    <Fragment>
      <Heading data={t(user["heading"])}></Heading>

      <MoviesListing session={session} />
    </Fragment>
  );
}

export default Profile;

export async function getServerSideProps({ locale, req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      ...(await serverSideTranslations(locale, process.env.locales)),
    },
  };
}
