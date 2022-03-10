import produce from "immer";
import shortid from "shortid";

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const initialState = {
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  commentLoading: false,
  commentDone: false,
  commentError: null,
  allPost: []
}

export const DummyPost = (data) => ({
  id: shortid.generate(),
  content: data.content,
  Comments: [],
  User: {
    id: data.userId,
    name: data.userName
  }
})

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.allPost.unshift(DummyPost(action.data));
      console.log(action.data);
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
      const post = draft.allPost.find((value) => value.id === action.data.postId);
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