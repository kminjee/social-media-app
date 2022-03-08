import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const App = ({ Component }) => {
  return(
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>토이스토리</title>
      </Head>
      <Component />
      <style global jsx>{`
        body {
          width: 100%;
          margin: 0 auto;
          padding: 0;
        }
      `}</style>
    </>
  )
}

App.propTypes =  {
  Component: PropTypes.elementType.isRequired,
}

export default App;