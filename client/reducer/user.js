import produce from "immer";

export const initialState = {
  signupDone: false,
  signupError: null,
  loginDone: false,
  loginError: null,
  logoutDone: false,
  logoutError: null,
  loadUserDone: false,
  loadUserError: null,
  info: null
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case SIGNUP_REQUEST:
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGNUP_SUCCESS:
      draft.signupDone = true;
      break;
    case SIGNUP_FAILURE:
      draft.signupDone = false;
      draft.signupError = action.error;
      break;

    case LOGIN_REQUEST:
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOGIN_SUCCESS:
      draft.loginDone = true;
      draft.info = action.data;
      break;
    case LOGIN_FAILURE:
      draft.loginDone = false;
      draft.loginError = action.error;
      break;

    case LOGOUT_REQUEST:
      draft.logoutDone = false;
      draft.logoutError = null;
      break;
    case LOGOUT_SUCCESS:
      draft.loginDone = false;
      draft.logoutDone = true;
      draft.info = null;
      break;
    case LOGOUT_FAILURE:
      draft.logoutDone = false;
      draft.logoutError = action.error;
      break;

    case LOAD_USER_REQUEST:
      draft.loadUserDone = false;
      draft.loadUserError = null;
      break;
    case LOAD_USER_SUCCESS:
      draft.loadUserDone = true;
      draft.loginDone = true;
      draft.info = action.data;
      break;
    case LOAD_USER_FAILURE:
      draft.loadUserDone = false;
      draft.loadUserError = action.error;
      break;

    case ADD_POST_TO_ME:
      draft.info.Posts.unshift({ id: action.data })

    default:
      break;
  };
});

export default reducer;