import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Styled from "styled-components";

import Avatar from "./Avatar";
import CommentForm from "./CommentForm";


const StyledPost = Styled.div`
  box-sizing: border-box;
  max-width: 50rem;
  min-width: 18.75rem;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  border: 1px solid #DDD;
  padding: 1rem;

  & .info {
    box-sizing: border-box;
    display: flex;
    justify-content: left;
    align-items: center;
    border-bottom: 1px solid #DDD;
    padding-bottom: 0.6rem;
  }

  & .name-date {
    display: inline-block;  
    padding-left: 0.5rem;

    & .name {
      font-size: 0.875rem;
      color: #666;
    }

    & .date {
      font-size: 0.75rem;
      color: #999;
    }
  }

  & .content {
    box-sizing: border-box;
    padding: 1rem 0;
    font-size: 0.875rem;
    color: #666;
  }

  & .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #DDD;
    padding-top: 0.6rem;
    cursor: pointer;
    font-size: 0.75rem;
    color: #999;
  }

`
const StyledComment = Styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 0.2rem 0;
  font-size: 0.875rem;

  & .uesrid {
    width: 20%;
    color: #666;
  }
  
  & .text {
    width: 80%;
    color: #666;
  }
`
moment.locale('ko');


const Post = ({ post }) => {

  const [commentBox, setCommentBox] = useState(false);

  const onToggle = useCallback(() => {
    setCommentBox(prev => !prev);
  }, [])

  return(
    <> 
      <StyledPost key={post.id}>
        <div className="info">
          <div><Avatar /></div>
          <div className="name-date">
            <div className="name">{post.User.name}</div>
            <div className="date">{moment(post.createdAt).format('YYYY.MM.DD')}</div>
          </div>
        </div>
        <div className="content">{post.content}</div>
        <div className="comment" onClick={onToggle}>
          <div className="total">댓글 {post.Comments.length}개</div>
          <div className="btn">댓글 달기</div>
        </div>
        {commentBox && 
          <div>
            <CommentForm post={post} />
            {post.Comments.map(comment => 
              <StyledComment key={comment.id}>
                <span className="uesrid">{comment.User.name}</span>
                <span className="text">{comment.content}</span>
              </StyledComment>
            )}
          </div>
        }
      </StyledPost>
    </>
  )
}

Post.proptypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    User: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
}

export default Post;