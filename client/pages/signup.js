import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import Styled from "styled-components";

import useInput from "../hooks/useInput";
import { SIGNUP_REQUEST } from "../reducer/user";

const SignupForm = Styled.form`
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
const CheckMessage = Styled.p`
  width: 50%;
  margin: 0 auto;
  padding: 0;
  font-size: 0.875rem;
  color: red;
  text-align: left;
`

const Signup = () => {

  const dispatch = useDispatch();

  const [userId, onChangeUserId] = useInput('');
  const [userName, onChangeUserName] = useInput('');
  const [userPassword, onChangeUserPassword] = useInput('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordCheckMessage, setPasswordCheckkMessage] = useState(false);
  const onChangeConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value);
    setPasswordCheckkMessage(event.target.value !== userPassword);
  }, [userPassword]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (userPassword !== confirmPassword) {
      return setPasswordCheckkMessage(true)
    }
    dispatch({
      type: SIGNUP_REQUEST,
      data: {
        userId,
        userName,
        userPassword
      },
    });
    Router.replace('/')
  }, [userPassword, confirmPassword])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | 토이스토리</title>
      </Head>
      <SignupForm onSubmit={onSubmit}>
        <h1>회원가입</h1>
        <div>
          <label htmlFor="uesr-id"></label>
          <input 
            name="user-id" 
            type="text" 
            placeholder="아이디를 입력해주세요"
            value={userId}
            onChange={onChangeUserId}
            autoComplete="off" 
            required />
        </div>
        <div>
          <label htmlFor="uesr-name"></label>
          <input 
            name="user-name" 
            type="text" 
            placeholder="이름을 입력해주세요" 
            autoComplete="off" 
            value={userName}
            onChange={onChangeUserName}
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
        <div>
          <label htmlFor="uesr-confirm-password"></label>
          <input 
            name="uesr-confirm-password" 
            type="password" 
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="비밀번호를 한번 더 입력해주세요" 
            autoComplete="off" 
            required 
          />
        </div>
        {passwordCheckMessage && <CheckMessage>비밀번호가 일치하지 않습니다.</CheckMessage>}
        <button type="submit">가입하기</button>
        <Link href="/"><a>돌아가기</a></Link>
      </SignupForm>
    </>
  )
}

export default Signup;