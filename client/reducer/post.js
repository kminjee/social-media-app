import produce from "immer";

export const ALL_POST_REQUEST = 'ALL_POST_REQUEST';
export const ALL_POST_SUCCESS = 'ALL_POST_SUCCESS';
export const ALL_POST_FAILURE = 'ALL_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const ADD_REPLY_REQUEST = 'ADD_REPLY_REQUEST';
export const ADD_REPLY_SUCCESS = 'ADD_REPLY_SUCCESS';
export const ADD_REPLY_FAILURE = 'ADD_REPLY_FAILURE';

export const initialState = {
  allPostDone: false,
  allPostError: null,
  addPostDone: false,
  addPostError: null,
  updatePostDone: false,
  updatePostError: null,
  removePostDone: false,
  removePostError: null,
  addCommentDone: false,
  addCommentError: null,
  removeCommentDone: false,
  removeCommentError: null,
  addReplyDone: false,
  addReplyError: null,
  allPost: []
}

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    /* 글 목록 */
    case ALL_POST_REQUEST:
      draft.allPostDone = false;
      draft.allPostError = null;
      break;
    case ALL_POST_SUCCESS:
      draft.allPostDone = true;
      draft.allPost = draft.allPost.concat(action.data)
      break;
    case ALL_POST_FAILURE:
      draft.allPostDone = false;
      draft.allPostError = action.error;
    
    /* 글 등록 */
    case ADD_POST_REQUEST:
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostDone = true;
      draft.allPost.unshift(action.data);
      break;
    case ADD_POST_FAILURE:
      draft.addPostDone = false;
      draft.addPostError = action.error;

    /* 글 수정 */
    case UPDATE_POST_REQUEST:
      draft.updatePostDone = false;
      draft.updatePostError = null;
      break;
    case UPDATE_POST_SUCCESS:
      draft.updatePostDone = true;
      draft.allPost.find((value) => value.id === action.data.PostId).content = action.data.content;
      break;
    case UPDATE_POST_FAILURE:
      draft.updatePostDone = false;
      draft.updatePostError = action.error;

    /* 글 삭제 */
    case REMOVE_POST_REQUEST:
      draft.updatePostDone = false;
      draft.updatePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.updatePostDone = true;
      draft.allPost = draft.allPost.filter((value) => value.id !== action.data.PostId);
      break;
    case REMOVE_POST_FAILURE:
      draft.updatePostDone = false;
      draft.updatePostError = action.error;

    /* 댓글 등록 */
    case ADD_COMMENT_REQUEST:
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS:
      draft.addCommentDone = true;
      draft.allPost.find((value) => value.id === action.data.PostId).Comments.unshift(action.data);
      break;
    case ADD_COMMENT_FAILURE:
      draft.addCommentDone = false;
      draft.addCommentError = action.error; 

    /* 댓글 삭제 */
    case REMOVE_COMMENT_REQUEST:
      draft.removeCommentDone = false;
      draft.removeCommentError = null;
      break;
    case REMOVE_COMMENT_SUCCESS:
      draft.removeCommentDone = true;
      draft.allPost.find((value) => value.id === action.data.PostId).Comments = draft.allPost.find((value) => value.id === action.data.PostId).Comments.filter((value) => value.id !== action.data.commentId);
      break;
    case REMOVE_COMMENT_FAILURE:
      draft.removeCommentDone = false;
      draft.removeCommentError = action.error; 

    /* 답글 등록 */
    case ADD_REPLY_REQUEST:
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_REPLY_SUCCESS:
      draft.addCommentDone = true;
      draft.allPost.find((value) => value.id === action.data.PostId)
        .Comments.find((value) => value.id === action.data.CommentId)
        .Replies.unshift(action.data);
      break;
    case ADD_REPLY_FAILURE:
      draft.addCommentDone = false;
      draft.addCommentError = action.error; 

    default:
      break;
  };
});

export default reducer;