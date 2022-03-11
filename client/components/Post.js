import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import Styled from "styled-components";

import Avatar from "./Avatar";
import CommentForm from "./CommentForm";
import { REMOVE_COMMENT_REQUEST, REMOVE_POST_REQUEST, UPDATE_POST_REQUEST } from "../reducer/post";


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
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #DDD;
    padding-bottom: 0.6rem;

    & .inner {
      display: flex;
      justify-content: left;
      align-items: center;
    }
  }

  & textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #DDD;
    resize: none;
    font-size: 0.875rem;
    color: #666;
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

  & .editBtn {
    border: none;
    font-size: 0.75rem;
    color: #666;
    background: none;
    cursor: pointer;
  }

  & .editBtn:hover {
    color: #000;
  }

  & .updateBtn {
    width: 100%;
    text-align: right;
    padding-bottom: 0.7rem;
    font-weight: bold;
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
  font-size: 0.75rem;

  & .uesrid {
    width: 20%;
    color: #666;
  }
  
  & .text {
    width: 70%;
    font-size: 0.75rem;
    color: #666;
  }

  & .removeBtn {
    width: 10%;
    text-align: right;
    font-size: 0.75rem;
    color: #666;
    cursor: pointer;
  }

  & .removeBtn:hover {
    color: #000;
  }
`
moment.locale('ko');


const Post = ({ post }) => {

  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.user);

  const [commentBox, setCommentBox] = useState(false);
  const [myPost, setMyPost] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [content, setContent] = useState(post.content);

  useEffect (() => {
    if (post.User.id === info.id) {
      setMyPost(true);
    }
  }, [info.id]);

  const onToggle = useCallback(() => {
    setCommentBox(prev => !prev);
  }, []);

  const onChangeContent = useCallback((e) => {
    e.preventDefault();
    setContent(e.target.value);
  }, [content]);

  const onUpdatePost = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: {
        PostId: post.id,
        content: content
      }
    });
    setEditPost(prev => !prev);
  }, [content]);

  const onRemovePost = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id
    });
  }, []);

  const onRemoveComment = useCallback((commentId) => (e) => {
    e.preventDefault();
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: {
        PostId: post.id,
        commentId : commentId
      }
    })
  }, []);

  return(
    <> 
      <StyledPost key={post.id}>
        <div className="info">
          <div className="inner">
            <Avatar />
            <div className="name-date">
              <div className="name">{post.User.name}</div>
              <div className="date">{moment(post.createdAt).format('YYYY.MM.DD')}</div>
            </div>
          </div>
          {myPost &&
            <div>          
              <button 
                className="editBtn" 
                onClick={() => { 
                  setEditPost(prev => !prev);
                }}
              >수정</button>
              <button className="editBtn" onClick={onRemovePost}>삭제</button>
            </div>
          }
        </div>
        {editPost 
          ? 
          <div>
            <textarea 
              cols="80" 
              rows="5" 
              value={content}
              onChange={onChangeContent}
              autoComplete="off"
            />
            <button className="editBtn updateBtn" onClick={onUpdatePost}>수정하기</button>
          </div>

          : 
          <div className="content">{post.content}</div>
        }
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
                <span className="removeBtn" onClick={onRemoveComment(comment.id)}>삭제</span>
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