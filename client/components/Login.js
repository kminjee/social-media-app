import React from "react";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <h1>토이스토리</h1>
      <form>
        <div>
          <label htmlFor="uesr-id"></label>
          <input name="user-id" type="text" placeholder="아이디를 입력해주세요" autoComplete="off" required />
        </div>
        <div>
          <label htmlFor="uesr-password"></label>
          <input name="user-password" type="password" placeholder="비밀번호를 입력해주세요" autoComplete="off" required />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <Link href="/signup"><a>아직 회원이 아니신가요?</a></Link>
      </form>
    </>
  )
}

export default Login;
