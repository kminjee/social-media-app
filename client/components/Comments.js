import React from "react";
import Styled from "styled-components";

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

const comments = [
  {
    id: 1,
    name: '김또리',
    text: '진짜 맛있었겠다!',
  },
  {
    id: 2,
    name: '김민지',
    text: '진짜 재밌었겠다!',
  },
  {
    id: 3,
    name: '김민아',
    text: '진짜 좋았었겠다!',
  },
]

const Comments = () => {
  return (
    <>
      {comments.map(comment => 
        <StyledComment key={comment.id}>
          <span className="uesrid">{comment.name}</span>
          <span className="text">{comment.text}</span>
        </StyledComment>
      )}
    </>
  )
}

export default Comments;