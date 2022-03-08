import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Styled from "styled-components";

import Avatar from "./Avatar";

const StyledNav = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  max-width: 50rem;
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;

  & a {
    text-decoration: none;
    color: #000;
  }
`;

const Layout = ({ children }) => {

  return (
    <>
      <StyledNav>
        <Link href="/"><a>홈</a></Link>
        <Link href="/profile"><a><Avatar /> 김민지님</a></Link>
      </StyledNav>
      <div>{children}</div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;