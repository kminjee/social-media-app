import React from "react";
import Styled from "styled-components";

const StyledPostForm = Styled.form`
  box-sizing: border-box;
  max-width: 50rem;
  min-width: 18.75rem;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;

  & textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #DDD;
    resize: none;
    font-size: 0.875rem;
    color: #666;
  }

  & textarea::placeholder {
    color: #CCC;
    font-size: 0.875rem;
  }

  & textarea:focus {
    outline: none;
    border: 1px solid #7784cc;
    box-shadow: 0 0 0 0.1rem rgb(59 65 99 / 25%);
  }

  & button {
    width: 100%;
    border: none;
    padding: 0.5rem;
    background: #4F5681;
    font-size: 0.875rem;
    color: #FFF;
    cursor: pointer;
  }

  & button:hover {
    background: #3b4163
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