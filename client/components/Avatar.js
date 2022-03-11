import React from "react";
import Styled from "styled-components";


const StyledAvatar = Styled.img`
  box-sizing: border-box;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
  text-align: center;
`

const Avatar = () => {

  return (
    <StyledAvatar src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png"></StyledAvatar>
  )
}

export default Avatar;