import axios from "axios";
import { all, delay, fork, put, takeLatest, call } from "redux-saga/effects";
import { 
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
  ALL_POST_REQUEST, ALL_POST_SUCCESS, ALL_POST_FAILURE,  
} from "../reducer/post";


function allPostAPI() {
  return axios.get('/post');
};

function* allPost() {
  try {
    const result = yield call(allPostAPI);
    yield put({
      type: ALL_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ALL_POST_FAILURE,
      error: err.response.data
    });
  }
};

function addPostAPI(data) {
  return axios.post('/post', { content: data });
};

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data
    });
  }
};

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
};

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data
    });
  }
};



function* watchAllPosts() {
  yield takeLatest(ALL_POST_REQUEST, allPost);
};

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
};

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
};


export default function* postSaga() {
  yield all([
    fork(watchAllPosts),
    fork(watchAddPost),
    fork(watchAddComment)
  ]);
}