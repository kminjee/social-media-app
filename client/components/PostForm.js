import React from "react";
import Styled from "styled-components";

const StyledPostForm = Styled.form`
  box-sizing: border-box;
  max-width: 50rem;
  width: 100%;
  margin: 0 auto;
  padding-top: 1rem;

  & textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #EEE;
    resize: none;
  }

  & textarea:focus {
    outline: none;
    border: 1px solid #DDD;
  }

  & button {
    width: 10%;
    border: none;
    padding: 0.5rem;
    background: #4F5681;
    color: #FFF;
    cursor: pointer;
  }
`

const PostForm = () => {
  return(
    <StyledPostForm>
      <textarea cols="80" rows="5" placeholder="오늘 어떤 일이 있었나요?" autoComplete="off" />
      <button type="submit">등록</button>
    </StyledPostForm>
  )
}

export default PostForm;