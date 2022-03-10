import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import { ADD_POST_TO_ME } from "../reducer/user";
import { 
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,  
} from "../reducer/post";


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
    yield put({
      type: ADD_POST_TO_ME,
      data: action.data
    })
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data
    });
  }
};

function addCommentAPI(data) {
  axios.post('/post/comment', data);
};

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    console.log(action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data
    });
  }
};


function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
};

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
};


export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment)
  ]);
}