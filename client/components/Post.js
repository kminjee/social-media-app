import React, { useState, useCallback } from "react";
import Styled from "styled-components";

import Avatar from "./Avatar";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const Post = () => {

  const posts = [
    {
      id: 1,
      name: '김또리',
      text: '오늘 고구마 과자 먹었다!',
      Images: [],
    },
    // {
    //   id: 2,
    //   name: '김민지',
    //   text: '오늘 강남 갔다 왔다!',
    //   Images: [
    //     { 
    //       src: 'https://cdn3.iconfinder.com/data/icons/plein-samples/48/amusement-256.png' 
    //     }
    //   ],
    // },
    // {
    //   id: 3,
    //   name: '김민아',
    //   text: '오늘 드라이브 했다!',
    //   Images: [],
    // },
  ]

  const [commentBox, setCommentBox] = useState(false)
  const onToggle = useCallback(() => {
    setCommentBox(prev => !prev);
  })

  return(
    <div>
      {posts.map(post => 
        <div key={post.id}>
          <div><Avatar /> {post.name}</div>
          <div>{post.Images.map(image => <img src={image.src}></img>)}</div>
          <div>{post.text}</div>
        </div>
      )}
      <div>
        <span>댓글 0개</span>
        <span onClick={onToggle} >댓글 달기</span>
      </div>
      {commentBox && 
        <div>
          <CommentForm />
          <Comments />
        </div>
      }
    </div>
  )
}

export default Post;