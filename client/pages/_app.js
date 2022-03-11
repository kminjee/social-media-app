import React from "react";
import PropTypes from "prop-types";
import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return(
    <>
      <Component />
      <style global jsx>{`
        body {
          width: 100%;
          margin: 0 auto;
          padding: 0;
          cursor: default;
        }
      `}</style>
    </>
  )
}

App.propTypes =  {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);