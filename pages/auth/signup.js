// ####################################
// React && Plugins
// ####################################
import Head from "next/head";
import Image from "next/image";
import { useEffect, Fragment } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession, getSession, signOut } from "next-auth/react";
// ####################################

// ####################################
// Components
// ####################################
import SignupForm from "../../components/Auth/SignupForm";
// ####################################

export default function signup() {
  return (
    <Fragment>
      <SignupForm />
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
      ...(await serverSideTranslations(locale, process.env.locales)),
    },
  };
}
