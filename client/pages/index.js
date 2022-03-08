import React, { useState } from "react";
import Head from "next/head";

import Login from "../components/Login";
import Main from "../components/Main";

const Home = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{isLogin ? "메인 | 토이스토리" : "로그인 | 토이스토리"}</title>
      </Head>
      {isLogin ? <Main /> : <Login />}
    </>
  )
}

export default Home;