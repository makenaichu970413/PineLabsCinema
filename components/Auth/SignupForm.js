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
import { delay } from "../../utils/helper";
// ####################################

// ####################################
// API
// ####################################
import { createUser } from "../../utils/api";
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

function SignupForm() {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const rePasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [{}, dispatch] = useStateValue();
  const { t, i18n } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const rePassword = rePasswordInputRef.current.value;

    dispatch({
      type: "SET_MESSAGE",
      message: { status: 0, message: "Creating an user account..." },
    });
    const res = await createUser({ email, password, rePassword });

    if (res["status"] === 201) {
      delay(1500).then(async () => {
        handleLogin();
      });
    }
    dispatch({ type: "SET_MESSAGE", message: res });
  }

  async function handleLogin() {
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

  const handleLoginClick = (e) => {
    router.push("/auth/login");
  };

  return (
    <div className="auth" data-aos="fade-up" data-aos-delay="300">
      <form onSubmit={handleSubmit}>
        <h2>{t(auth["form"]["title"]["signup"])} </h2>

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

        <div className="input-box">
          <input
            name="re-password"
            type="password"
            ref={rePasswordInputRef}
            required
          />
          <label htmlFor="re-password">
            {t(auth["form"]["input"]["rePassword"])}
          </label>
        </div>

        <div className="btn-box">
          <input className="btn" type="submit" value={t(auth["btn"]["send"])} />
        </div>
      </form>

      <p className="switch-auth">
        {t(auth["form"]["p"]["signup"])}{" "}
        <span onClick={handleLoginClick}>{t(auth["form"]["a"]["signup"])}</span>
      </p>
    </div>
  );
}

export default SignupForm;
