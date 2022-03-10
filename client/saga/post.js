import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,  } from "../reducer/post";


function addPostAPI(data) {
  axios.post('/post', data);
};

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    console.log(action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data
    });
  }
};

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
};


export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ]);
}