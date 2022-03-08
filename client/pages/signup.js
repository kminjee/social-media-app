import React from "react";
import Head from "next/head";
import Link from "next/link";

const Signup = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | 토이스토리</title>
      </Head>
      <h1>회원가입</h1>
      <form>
        <div>
          <label htmlFor="uesr-id"></label>
          <input name="user-id" type="text" placeholder="아이디를 입력해주세요" autoComplete="off" required />
        </div>
        <div>
          <label htmlFor="uesr-name"></label>
          <input name="user-name" type="text" placeholder="이름을 입력해주세요" autoComplete="off" required />
        </div>
        <div>
          <label htmlFor="uesr-password"></label>
          <input name="user-password" type="password" placeholder="비밀번호를 입력해주세요" autoComplete="off" required />
        </div>
        <div>
          <label htmlFor="uesr-confirm-password"></label>
          <input name="uesr-confirm-password" type="password" placeholder="비밀번호를 한번 더 입력해주세요" autoComplete="off" required />
        </div>
        <Link href="/"><button type="button">돌아가기</button></Link>
        <button type="submit">회원가입</button>
      </form>
    </>
  )
}

export default Signup;