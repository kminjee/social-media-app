import React, { useState, useCallback } from "react";
import Styled from "styled-components";

import Avatar from "./Avatar";
import CommentForm from "./CommentForm";
import Comments from "./Comments";


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

const posts = [
  {
    id: 1,
    name: '김또리',
    text: '오늘 고구마 과자 먹었다!',
  },
  {
    id: 2,
    name: '김민지',
    text: '오늘 강남 갔다 왔다!',
  },
  {
    id: 3,
    name: '김민아',
    text: '오늘 드라이브 했다!',
  },
]

const Post = () => {

  const [commentBox, setCommentBox] = useState(false)
  const onToggle = useCallback(() => {
    setCommentBox(prev => !prev);
  })

  return(
    <>
      {posts.map(post => 
        <StyledPost key={post.id}>
          <div className="info">
            <div><Avatar /></div>
            <div className="name-date">
              <div className="name">{post.name}</div>
              <div className="date">2022.03.09</div>
            </div>
          </div>
          <div className="content">{post.text}</div>
          <div className="comment" onClick={onToggle}>
            <div className="total">댓글 0개</div>
            <div className="btn">댓글 달기</div>
          </div>
          {commentBox && 
            <div>
              <CommentForm />
              <Comments />
            </div>
          }
        </StyledPost>
      )}
    </>
  )
}

export default Post;