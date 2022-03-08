import React from "react";
import Styled from "styled-components";

import Layout from "../components/Layout";
import PostForm from "./PostForm";
import Post from "./Post";


const StyledWrap = Styled.div`
  box-sizing: border-box;
  max-width: 50rem;
  width: 80%;
  height 100%;
  margin: 0 auto;
`

const Main = () => {
  return (
    <Layout>
      <StyledWrap>
        <PostForm />
        <Post />
      </StyledWrap>
    </Layout>
  )
}

export default Main;