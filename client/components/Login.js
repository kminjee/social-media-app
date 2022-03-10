import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Styled from "styled-components";

import useInput from "../hooks/useInput";
import { LOGIN_REQUEST } from "../reducer/user";

const LoginForm = Styled.form`
  box-sizing: border-box;
  max-width: 50rem;
  min-width: 18.75rem;
  width: 80%;
  height 100%;
  margin: 0 auto;
  text-align: center;

  & h1 {
    color: #4F5681;
  }

  & input { 
    box-sizing: border-box;
    width: 50%;
    margin: 0.1rem 0;
    padding: 0.35rem;
    border: 1px solid #DDD;
    font-size: 0.875rem;
    color: #666;
  }

  & input::placeholder {
    font-size: 0.875rem;
    color: #CCC;
  }

  & input:focus {
    outline: none;
    border: 1px solid #7784cc;
    box-shadow: 0 0 0 0.1rem rgb(59 65 99 / 25%);
  }

  & button {
    box-sizing: border-box;
    width: 50%;
    margin: 0.2rem;
    padding: 0.3rem 0;
    border: none;
    font-size: 0.875rem;
    color: #FFF;
    background: #4F5681;
    cursor: pointer;
  }

  & button:hover {
    background: #3b4163
  }

  & a {
    display: block;
    font-size: 0.875rem;
    color: #666;
  }
`

const Login = () => {

  const dispatch = useDispatch();
  const [userEmail, onChangeUserEmail] = useInput('');
  const [userPassword, onChangeUserPassword] = useInput('');

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch({
      type: LOGIN_REQUEST,
      data: { userEmail, userPassword }
    });
  }, [userEmail, userPassword])
  return (
    <>
      <LoginForm onSubmit={onSubmit}>
        <h1>로그인</h1>
        <div>
          <label htmlFor="uesr-email"></label>
          <input 
            name="user-email" 
            type="text" 
            value={userEmail}
            onChange={onChangeUserEmail}
            placeholder="이메일을 입력해주세요" 
            autoComplete="off" 
            required 
          />
        </div>
        <div>
          <label htmlFor="uesr-password"></label>
          <input 
            name="user-password" 
            type="password" 
            value={userPassword}
            onChange={onChangeUserPassword}
            placeholder="비밀번호를 입력해주세요" 
            autoComplete="off" 
            required 
          />
        </div>
        <button type="submit">로그인</button>
        <Link href="/signup"><a>아직 회원이 아니신가요?</a></Link>
      </LoginForm>
    </>
  )
}

export default Login;
