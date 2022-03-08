import React from "react";
import Head from "next/head";

import Layout from "../components/Layout"

const Profile = () => {
  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | 토이스토리</title>
      </Head>
      <div>프로필 페이지</div>
    </Layout>
  )
}

export default Profile;