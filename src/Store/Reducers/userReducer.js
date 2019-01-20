import { userActionsConstants } from "../Actions/userActionsConstants";

const initialState = {
  user: {},
  loggedIn: false,
  loggingIn: false,
  registering: false
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActionsConstants.AUTH_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    case userActionsConstants.AUTH_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userActionsConstants.AUTH_FAILURE:
      return {
        user: {},
        loggedIn: false,
        loggingIn: false,
        registering: false
      };
    case userActionsConstants.USER_LOGOUT:
      return {
        user: {},
        loggedIn: false,
        loggingIn: false,
        registering: false
      };
    case userActionsConstants.REGISTER_REQUEST:
      return { ...state, registering: true };
    case userActionsConstants.REGISTER_SUCCESS:
      return {
        user: {},
        loggedIn: false,
        loggingIn: false,
        registering: false
      };
    case userActionsConstants.REGISTER_FAILURE:
      return {
        user: {},
        loggedIn: false,
        loggingIn: false,
        registering: false
      };

    default:
      return state;
  }
}
