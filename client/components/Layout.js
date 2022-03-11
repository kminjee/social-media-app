import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import Styled from "styled-components";

import Avatar from "./Avatar";
import { LOGOUT_REQUEST } from "../reducer/user";

const StyledNav = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  max-width: 50rem;
  min-width: 18.75rem;
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;

  & a {
    padding-top: 0.3rem;
    text-decoration: none;
    font-size: 0.875rem;
    color: #666;
  }
`;
const StyledInfo = Styled.div`
  font-size: 0.875rem;
  color: #666;
  cursor: default;

  & button {
    border: none;
    padding-top: 0.3rem;
    font-size: 0.875rem;
    color: #666;
    background: none;
    cursor: pointer;
  
    :hover {
      color: #000;
    }
  }
`;

const Layout = ({ children }) => {

  const { loginDone, info } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST
    });
  });

  return (
    <>
      {loginDone &&    
        <StyledNav>
          <div>
            <Link href="/"><a>메인</a></Link>
          </div>
          <StyledInfo>
            {info.name}님 | 
            <button onClick={onLogout}> 로그아웃</button> 
          </StyledInfo>
        </StyledNav>
      }
      <div>{children}</div>
    </>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;