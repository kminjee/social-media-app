import React from "react";
import Styled from "styled-components";


const StyledAvatar = Styled.span`
  box-sizing: border-box;
  width: 3.125rem;
  border-radius: 50%;
  padding: 0.25rem 0.5rem;
  vertical-align: middle;
  background: #4F5681;
  color: #FFF;
`

const Avatar = () => {
  return (
    <StyledAvatar>김</StyledAvatar>
  )
}

export default Avatar;