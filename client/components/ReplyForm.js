import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styled from "styled-components";

import useInput from "../hooks/useInput";
import { ADD_REPLY_REQUEST } from "../reducer/post";

const StyledForm = Styled.form`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  

  & span {
    box-sizing: border-box;
    width: 15%;
    text-align: center;
    font-size: 0.75rem;
    color: #666;
    padding-right: 0.2rem;
  }

  & input {
    box-sizing: border-box;
    width: 85%;
    padding: 0.2rem;
    border: 1px solid #DDD;
    border-right: none;
    font-size: 0.75rem;
    color: #666;
    vertical-align: middle;
  }

  & input::placeholder {
    color: #CCC;
    vertical-align: middle;
  }

  & input:focus {
    outline: none;
    border: 1px solid #7784cc;
    box-shadow: 0 0 0 0.1rem rgb(59 65 99 / 25%);
  }

  & button {
    box-sizing: border-box;
    width: 10%;
    padding: 0.1rem;
    border: 1px solid #DDD;
    border-left: none;
    font-size: 0.75rem;
    color: #666;
    background: none;
    cursor: pointer;
  }
`

const ReplyForm = ({ postId, commentId }) => {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.user);
  const { addReplyDone } = useSelector((state) => state.post);
  const [reply, onChangeReply, setReply] = useInput('');

  useEffect(() => {
    if (addReplyDone) {
      setReply('');
    }
  }, [addReplyDone])

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch({
      type: ADD_REPLY_REQUEST,
      data: {
        content: reply,
        PostId: postId,
        CommentId: commentId,
        UesrId: info.id
      }
    });
  }, [reply])

  return (
    <StyledForm onSubmit={onSubmit}>
      <span>{info.name}</span>
      <input 
        type="text" 
        value={reply}
        onChange={onChangeReply}
        placeholder="답글을 남겨주세요" 
      />
      <button type="submit">등록</button>
    </StyledForm>
  )
}

export default ReplyForm;