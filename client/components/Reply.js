import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import Styled from "styled-components";
import { REMOVE_REPLY_REQUEST } from "../reducer/post";

const StyledReply = Styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;

  & .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0;
    background: #EEE;
    width: 97%;
    font-size: 0.75rem;
    color: #666;

    & .username {
      width: 12%;
      padding: 0.2rem;
      text-align: center;
    }

    & .replyText {
      box-sizing: border-box;
      width: 100%;
      border: none;
      padding: 0.2rem;
    }

    & .replyDate {
      box-sizing: border-box;
      width: 15%;
      border: none;
      padding: 0.2rem;
      color: #999;
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

moment.locale('ko');

const Reply = ({ reply, PostId, CommentId }) => {

  const dispatch = useDispatch();

  const onRemove = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: REMOVE_REPLY_REQUEST,
      data: {
        replyId: reply.id,
        PostId: PostId,
        CommentId: CommentId
      }
    });
  }, [])

  return (
    <StyledReply>
      <div></div>
      <div className="box">
        <div className="username">{reply.User.name}</div>
        <div className="replyText">{reply.content}</div>
        <div className="replyDate">{moment(reply.createdAt).format('YYYY.MM.DD')}</div>
        <button className="replyRemoveBtn" onClick={onRemove}>✖</button>
      </div>
    </StyledReply>
  )
};

Reply.propTypes = {
  reply: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    User: PropTypes.object,
  }).isRequired
};

export default Reply;