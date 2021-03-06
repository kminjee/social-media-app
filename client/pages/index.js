import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import wrapper from '../store/configureStore';
import axios from "axios";
import Head from "next/head";

import Layout from "../components/Layout";
import Login from "../components/Login";
import Main from "../components/Main";

import { LOAD_USER_REQUEST } from "../reducer/user";

const Home = () => {

  const { loginDone } = useSelector((state) => state.user);

  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>{loginDone ? "메인" : "로그인"}</title>
      </Head>
      {loginDone ? <Main /> : <Login />}
    </Layout>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_REQUEST
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;