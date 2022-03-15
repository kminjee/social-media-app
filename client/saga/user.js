import axios from "axios";
import { all, call, put, fork, takeLatest } from "redux-saga/effects";
import { 
  SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, 
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE
} from "../reducer/user";


/* 회원가입 */
function signupAPI(data) {
  return axios.post('/user', data);
};

function* signup(action) {
  try {
    yield call(signupAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data
    });
  }
};

/* 로그인 */
function loginAPI(data) {
  return axios.post('/user/login', data);
};

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data
    });
  }
};

/* 로그아웃 */
function logoutAPI() {
  return axios.post('/user/logout');
};

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOGOUT_SUCCESS
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data
    });
  }
};

/* 유저 정보 */
function loadUserAPI() {
  return axios.get('/user');
};

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data
    });
  }
};


function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
};

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
};

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
};

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
};

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadUser)
  ]);
};