import axios from "axios";
import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import { 
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
  ALL_POST_REQUEST, ALL_POST_SUCCESS, ALL_POST_FAILURE,  
  UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE, 
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE, 
} from "../reducer/post";


/* 글 목록 */
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

/* 글 등록 */
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

/* 글 수정 */
function updatePostAPI(data) {
  return axios.patch(`/post/${data.PostId}`, data);
};

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data
    });
  }
};

/* 글 삭제 */
function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
};

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data
    });
  }
};

/* 댓글 등록 */
function addCommentAPI(data) {
  return axios.post(`/post/${data.PostId}/comment`, data);
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

/* 댓글 삭제 */
function removeCommentAPI(data) {
  return axios.delete(`/post/${data.PostId}/${data.commentId}`);
};

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data
    });
  }
};


function* watchAllPost() {
  yield takeLatest(ALL_POST_REQUEST, allPost);
};

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
};

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
};

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
};

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
};

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
};


export default function* postSaga() {
  yield all([
    fork(watchAllPost),
    fork(watchAddPost),
    fork(watchUpdatePost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
  ]);
}