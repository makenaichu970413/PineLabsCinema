// ####################################
// React && Plugins
// ####################################
import Head from "next/head";
import Image from "next/image";
import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession, getSession, signOut } from "next-auth/react";
// ####################################

// ####################################
// Components
// ####################################
import Spinner from "../../components/General/Spinner";
import LoginForm from "../../components/Auth/LoginForm";
// ####################################

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getSession((session) => {
  //     if (session) {
  //       router.push("/user/profile");
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, [router]);

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <Fragment>
      <LoginForm />
    </Fragment>
  );
}

export async function getServerSideProps({ locale, req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/user/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "movie", "movies"])),
    },
  };
}
