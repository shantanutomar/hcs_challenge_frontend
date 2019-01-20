import { userActionsConstants } from "./userActionsConstants";
import { history } from "../../Helpers/history";
import customAxios from "../../Helpers/customAxios";
import { API_PATH } from "../../api";

export const userActions = {
  authenticate,
  logout,
  register
};

export function logout() {
  localStorage.removeItem("user");
  return { type: userActionsConstants.USER_LOGOUT };
}
function authenticate(username, password) {
  return dispatch => {
    dispatch(request());

    customAxios
      .post(
        `${API_PATH.dev.BASE_URL}/users/authenticate`,
        { userName: username, password },
        {
          headers: { "Content-Type": "application/json" },
          method: "POST"
        }
      )
      .then(
        response => {
          dispatch(success(response));
          history.push("/");
        },
        error => {
          console.log("In error");
          dispatch(failure(error));
        }
      );
  };

  function request() {
    return { type: userActionsConstants.AUTH_REQUEST };
  }
  function success(user) {
    console.log(user);
    return { type: userActionsConstants.AUTH_SUCCESS, user };
  }
  function failure(error) {
    return { type: userActionsConstants.AUTH_FAILURE, error };
  }
}

function register(userData) {
  return dispatch => {
    dispatch(request());

    customAxios
      .post(
        `${API_PATH.dev.BASE_URL}/users/register`,
        { ...userData },
        {
          headers: { "Content-Type": "application/json" },
          method: "POST"
        }
      )
      .then(
        user => {
          dispatch(success());
          history.push("/login");
        },
        error => {
          console.log("In error");
          dispatch(failure(error));
          // alert(error);
        }
      );
  };

  function request() {
    return { type: userActionsConstants.AUTH_REQUEST };
  }
  function success(user) {
    return { type: userActionsConstants.AUTH_SUCCESS, user };
  }
  function failure(error) {
    return { type: userActionsConstants.AUTH_FAILURE, error };
  }
}
