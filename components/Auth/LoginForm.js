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

function LoginForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  const handleSignupClick = (e) => {
    router.push("/auth/signup");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    console.log("result: ", result);

    if (!result.error) {
      // show profile if success
      router.push("/user/profile");
    }
  }

  return (
    <div className="auth" data-aos="fade-up" data-aos-delay="300">
      <form onSubmit={handleSubmit}>
        <h2>login</h2>

        <div className="input-box">
          <input name="email" type="text" ref={emailInputRef} required />
          <label htmlFor="email">email</label>
        </div>

        <div className="input-box">
          <input
            name="password"
            type="password"
            ref={passwordInputRef}
            required
          />
          <label htmlFor="password">password</label>
        </div>

        <div className="btn-box">
          <input className="btn" type="submit" value="send" />
        </div>
      </form>

      <p className="switch-auth">
        Not a Member? <span onClick={handleSignupClick}>Create Account</span>
      </p>
    </div>
  );
}

export default LoginForm;
