import React from "react";
import Styled from "styled-components";


const StyledAvatar = Styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  vertical-align: middle;
  background: #4F5681;
  text-align: center;
  font-size: 13px;
  color: #FFF;
`

const Avatar = () => {
  return (
    <StyledAvatar></StyledAvatar>
  )
}

export default Avatar;