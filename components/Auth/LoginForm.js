// ####################################
// React && Plugins
// ####################################
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { signIn } from "next-auth/react";
// ####################################

// ####################################
// REDUX
// ####################################
import { useStateValue } from "../../redux/StateProvider";
// ####################################

// ####################################
// Data
// ####################################
import { auth } from "../../data/data";
// ####################################

function LoginForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();
  const [{}, dispatch] = useStateValue();
  const { t, i18n } = useTranslation();

  const handleSignupClick = (e) => {
    router.push("/auth/signup");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    dispatch({
      type: "SET_MESSAGE",
      message: { status: 0, message: "authenticating" },
    });
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    console.log("result: ", result);

    let res;
    if (!result.error) {
      router.push("/user/profile");
      res = { status: 201, message: "You are logged in now." };
    } else {
      res = { status: 401, message: result["error"] };
    }
    dispatch({
      type: "SET_MESSAGE",
      message: res,
    });
  }

  return (
    <div className="auth" data-aos="fade-up" data-aos-delay="300">
      <form onSubmit={handleSubmit}>
        <h2>{t(auth["form"]["title"]["login"])}</h2>

        <div className="input-box">
          <input name="email" type="text" ref={emailInputRef} required />
          <label htmlFor="email">{t(auth["form"]["input"]["email"])}</label>
        </div>

        <div className="input-box">
          <input
            name="password"
            type="password"
            ref={passwordInputRef}
            required
          />
          <label htmlFor="password">
            {t(auth["form"]["input"]["password"])}
          </label>
        </div>

        <div className="btn-box">
          <input className="btn" type="submit" value={t(auth["btn"]["send"])} />
        </div>
      </form>

      <p className="switch-auth">
        {t(auth["form"]["p"]["login"])}{" "}
        <span onClick={handleSignupClick}>{t(auth["form"]["a"]["login"])}</span>
      </p>
    </div>
  );
}

export default LoginForm;
