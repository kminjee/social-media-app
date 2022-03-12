import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Styled from "styled-components";

import useInput from "../hooks/useInput";
import { ADD_REPLY_REQUEST } from "../reducer/post";

const StyledForm = Styled.form`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;

  & .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0;
    background: #EEE;
    width: 97%;
    font-size: 0.75rem;
    color: #666;

    & div {
      box-sizing: border-box;
      width: 12%;
      padding: 0.2rem;
      text-align: center;
    }

    & input {
      box-sizing: border-box;
      width: 100%;
      border: none;
      padding: 0.2rem;
    }

    & input::placeholder {
      color: #CCC;
      font-size: 0.75rem;
    }

    & button {
      box-sizing: border-box;
      width: 8%;
      background: none;
      border: none;
      padding: 0.2rem;
      font-size: 0.75rem;
      color: #666;
      cursor: pointer;
    }
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
      <div></div>
      <div className="box">
        <div>{info.name}</div>
        <input 
          type="text" 
          value={reply}
          onChange={onChangeReply}
          placeholder="답글을 남겨주세요" 
        />
        <button type="submit">등록</button>
      </div>

    </StyledForm>
  )
};

ReplyForm.propTypes = {
  postId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
};

export default ReplyForm;