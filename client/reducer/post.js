import produce from "immer";
import shortid from "shortid";

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const initialState = {
  postLoading: false,
  postDone: false,
  postError: null,
  posts: []
}

const dummyPost = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: shortid.generate(),
    name: '김사과',
  },
  Comments: []
})

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case ADD_POST_REQUEST:
      draft.postLoading = true;
      draft.postDone = false;
      draft.postError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.postLoading = false;
      draft.postDone = true;
      draft.posts.unshift(dummyPost(action.data));
      break;
    case ADD_POST_FAILURE:
      draft.postLoading = false;
      draft.postDone = false;
      draft.postError = action.error;
    default:
      break;
  };
});

export default reducer;