# 소개
소셜 미디어 플랫폼 서비스의 기능을 간단하게 구현<br/>
**회원가입/로그인/글작성/댓글작성** 외 **글수정/글삭제/댓글삭제/대댓글작성**을 추가하였습니다.

<br/>

# 사용 기술
React / NextJs / Redux / NodeJs / MySQL

<br/>

# 실행 방법
### 데이터베이스 설정
1. .env 파일에서 DB_PASSWORD 설정
2. 'server'폴더 -> 'config'폴더 -> config.js 파일에서 "username" 설정
<br/>

### 클라이언트 실행
새 터미널 생성 <br/>

$ cd server &nbsp; (서버 폴더로 이동) <br/>
$ npm install &nbsp; (서버 패키지 다운로드) <br/>
$ npx sequelize db:create &nbsp; (데이터베이스 스키마 및 모델 생성) <br/>
$ nodemon app &nbsp; (서버 실행) <br/>
<br/>

### 서버 실행
새 터미널 추가생성 <br/>

$ cd client &nbsp; (클라이언트 폴더로 이동) <br/>
$ npm install &nbsp; (클라이언트 패키지 다운로드) <br/> 
$ npm run dev &nbsp; (클라이언트 실행) <br/>

<br/>

# 프로젝트 중 생긴 문제 해결
### 1. 로그인 후 정보를 불러오지 못하는 상황
  (1) console.log에 undefined로 값을 불러오지 못한 것과 Network 탭에서 401 error를 먼저 확인해서 클라이언트 측 오류를 확인 <br/>
  (2) 다시 console.log를 확인해서 'redux-saga' 에러 문구가 많은 것을 보고 saga 쪽에 문제가 있는지 찾아보기 <br/>
  (3) **API 호출 후에 return으로 값을 받아오지 않아서 생긴 문제임을 알고 return을 추가하여 값 받아오기 해결** <br/>
<br/>

### 2. 새로고침 시 로그인이 풀리는 현상
  (1) 개발자모드의 Application탭 cookie에서 로그인한 유저의 쿠키가 남아있는 것을 확인 <br/>
  (2) useEffect를 통해 새로고침이 일어날 때마다 사용자의 정보를 불러오도록 데이터를 요청 <br/>
  (3) !새로고침하면 잠깐 로그인이 풀렸다가 다시 로그인이 되는것을 확인 <br/>
  (4) 브라우저에 접속하자마자 서버에 데이터를 요청해서 받아오는 SSR을 적용 <br/>
<br/>

### 3. undefined으로 값을 불러오지 못하거나, null값으로 인해 반복문에서 오류나는 경우
  (1) Redux DevTools를 이용해 REQUEST 요청 후 state 변화나 object에 값이 제대로 들어갔는지 확인 <br/> 
  (2) 데이터 변화가 일어나는 시점을 따라 console.log()로 데이터 확인하기 <br/>
  (3) 데이터 변화가 일어나는 첫 시점부터 관련 코드를 모두 주석하고 하나하나 씩 풀어가며 오류 시점 알아내기 <br/>
  (4) 오류난 시점을 알았으면 오타는 없는지 다른 메소드를 사용하진 않았는지 살펴보기 <br/>
<br/>

### 4. REQUEST -> SUCCESS 처리 후에도 state에 변화가 없는 경우 <br/>
  (1) reducer에서 switch문의 case마다 break가 입력되어 있는지 확인하기 <br/>
<br/>
 
### 5. 에러시점을 정확히 알 수 없는 경우
  (1) 데이터 변화가 일어나는 첫 시점부터 관련 코드를 모두 주석하고 하나하나 씩 풀어가며 에러 시점 찾아내기 <br/>
  (2) 에러난 시점을 알았으면 오타는 없는지 다른 메소드를 사용하진 않았는지 살펴보기 <br/>
