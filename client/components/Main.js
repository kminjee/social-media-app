import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styled from "styled-components";

import PostForm from "./PostForm";
import Post from "./Post";
import { ALL_POST_REQUEST } from "../reducer/post";
import { LOAD_USER_REQUEST } from "../reducer/user";


const StyledWrap = Styled.div`
  box-sizing: border-box;
  max-width: 50rem;
  min-width: 18.75rem;
  width: 80%;
  height 100%;
  margin: 0 auto;
`
const Main = () => {
  
  const dispatch = useDispatch();
  const { allPost } = useSelector((state) => state.post);
  
  useEffect(() => {
    dispatch({
      type: ALL_POST_REQUEST
    });
  },[]);

  return (
    <StyledWrap>
      <PostForm />
      {allPost?.map(post => 
        <Post key={post.id} post={post} />
      )}
    </StyledWrap>
  )
};

export default Main;