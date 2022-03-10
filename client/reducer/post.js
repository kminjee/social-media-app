import produce from "immer";

export const ALL_POST_REQUEST = 'ALL_POST_REQUEST';
export const ALL_POST_SUCCESS = 'ALL_POST_SUCCESS';
export const ALL_POST_FAILURE = 'ALL_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const initialState = {
  allPostLoading: false,
  allPostDone: false,
  allPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  commentLoading: false,
  commentDone: false,
  commentError: null,
  allPost: []
}

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case ALL_POST_REQUEST:
      draft.allPostLoading = true;
      draft.allPostDone = false;
      draft.allPostError = null;
      break;
    case ALL_POST_SUCCESS:
      draft.allPostLoading = false;
      draft.allPostDone = true;
      draft.allPost = draft.allPost.concat(action.data)
      break;
    case ALL_POST_FAILURE:
      draft.allPostLoading = false;
      draft.allPostDone = false;
      draft.allPostError = action.error;
    
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.allPost.unshift(action.data);
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostDone = false;
      draft.addPostError = action.error;

    case ADD_COMMENT_REQUEST:
      draft.commentLoading = true;
      draft.commentDone = false;
      draft.commentError = null;
      break;
    case ADD_COMMENT_SUCCESS:
      draft.commentLoading = false;
      draft.commentDone = true;
      const post = draft.allPost.find((value) => value.id === action.data.PostId);
      post.Comments.unshift(action.data);
      break;
    case ADD_COMMENT_FAILURE:
      draft.commentLoading = false;
      draft.commentDone = false;
      draft.commentError = action.error; 

    default:
      break;
  };
});

export default reducer;