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
// API
// ####################################
import { createUser } from "../../utils/api";
// ####################################

function SignupForm() {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const rePasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const rePassword = rePasswordInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      console.log("result: ", result);
    } else {
      try {
        const result = await createUser({ email, password, rePassword });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleLoginClick = (e) => {
    router.push("/auth/login");
  };

  return (
    <div className="auth" data-aos="fade-up" data-aos-delay="300">
      <form onSubmit={handleSubmit}>
        <h2>Signup </h2>

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

        <div className="input-box">
          <input
            name="re-password"
            type="password"
            ref={rePasswordInputRef}
            required
          />
          <label htmlFor="re-password">confirm password</label>
        </div>

        <div className="btn-box">
          <input className="btn" type="submit" value="send" />
        </div>
      </form>

      <p className="switch-auth">
        Already Have an Account?{" "}
        <span onClick={handleLoginClick}>Login Now</span>
      </p>
    </div>
  );
}

export default SignupForm;
