import React from "react";
import { useSelector } from "react-redux";
import Styled from "styled-components";

import PostForm from "./PostForm";
import Post from "./Post";


const StyledWrap = Styled.div`
  box-sizing: border-box;
  max-width: 50rem;
  min-width: 18.75rem;
  width: 80%;
  height 100%;
  margin: 0 auto;
`
const Main = () => {
  
  const { posts } = useSelector((state) => state.post)  
  return (
    <StyledWrap>
      <PostForm />
      <Post posts={posts} />
    </StyledWrap>
  )
}

export default Main;