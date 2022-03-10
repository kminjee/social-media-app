import React, { useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

import Layout from "../components/Layout";
import Login from "../components/Login";
import Main from "../components/Main";

const Home = () => {

  const { loginDone } = useSelector((state) => state.user);

  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>{loginDone ? "메인 | 토이스토리" : "로그인 | 토이스토리"}</title>
      </Head>
      {loginDone ? <Main /> : <Login />}
    </Layout>
  )
}

export default Home;