import React, { useCallback, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import Styled from "styled-components";

import ReplyForm from "./ReplyForm";
import Reply from "./Reply";
import { REMOVE_COMMENT_REQUEST } from "../reducer/post";

const StyledComment = Styled.div`
  box-sizing: border-box;
  
  & .inner {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    color: #666;
    width: 100%;
    padding: 0.2rem 0;

    & .uesrname {
      width: 12%;
    }

    & .text {
      box-sizing: border-box;
      padding: 0 0.2rem;
      width: 65%;
    }

    & .date {
      box-sizing: border-box;
      padding: 0 0.2rem;
      width: 12%;
      color: #999;
    }

    & .replyBtn, .removeBtn {
      box-sizing: border-box;
      padding-left: 0.2rem;
      width: 5%;
      cursor: pointer;
      text-align: right;
    }
  }

  & .replyBox {
    margin: 0.5rem 0;
  }
`
moment.locale('ko');

const Comment = ({ postId, comment }) => {

  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.user);
  const [replyMode, setReplyMode] = useState(false);

  const onToggleReply = useCallback((commentId) => (e) => {
    e.preventDefault();
    if (comment.id === commentId) {
      setReplyMode(prev => !prev);
    }
  }, []);

  const onRemoveComment = useCallback((commentId) => (e) => {
    e.preventDefault();
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: {
        PostId: postId,
        commentId : commentId
      }
    });
  }, []);

  return (
    <StyledComment key={comment.id}>
      <div className="inner">
        <div className="uesrname">{comment.User.name}</div>
        <div className="text">{comment.content}</div>
        <div className="date">{moment(comment.createdAt).format('YYYY.MM.DD')}</div>
        <div className="replyBtn" onClick={onToggleReply(comment.id)}>💬</div>
        {comment.User.id === info.id && <div className="removeBtn" onClick={onRemoveComment(comment.id)}>✖</div>}
      </div>
      {replyMode && 
        <div className="replyBox">
          <ReplyForm postId={postId} commentId={comment.id} />
          {comment.Replies && comment.Replies.map(reply => 
            <Reply key={reply.id} reply={reply} PostId={postId} CommentId={comment.id} />
          )}
        </div>
      }
  </StyledComment>
  )
}

Comment.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    User: PropTypes.object,
  }).isRequired
}

export default Comment;