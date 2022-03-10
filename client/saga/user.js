import axios from "axios";
import { all, call, delay, put, fork, takeLatest } from "redux-saga/effects";
import { 
  SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE

} from "../reducer/user";


function signupAPI(data) {
  axios.post('/user', data);
};

function* signup(action) {
  try {
    // const result = yield call(signupAPI, action.data);
    yield delay(1000);
    yield put({
      type: SIGNUP_SUCCESS,
      data: action.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data
    });
  }
};

function loginAPI(data) {
  axios.post('/login', data);
};

function* login(action) {
  console.log(action)
  try {
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOGIN_SUCCESS,
      data: action.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data
    });
  }
};

function logoutAPI(data) {
  axios.post('/logout', data);
};

function* logout(action) {
  try {
    // const result = yield call(logoutAPI, action.data);
    yield delay(1000);
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


function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
};

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
};

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
};

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout)
  ]);
};