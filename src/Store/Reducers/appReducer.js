import { appActionsConstants } from "../Actions/appActionsConstants";

const initialAppGlobalsState = {
  showSnackBottom: false,
  snackIntent: "",
  snackMessage: "",
  snackAutoHideDuration: 0
};

const ACTION_HANDLERS = {
  [appActionsConstants.SHOW_MESSAGE_SNACK_BOTTOM]: (state, action) => ({
    ...state,
    showSnackBottom: true,
    snackIntent: action.intent,
    snackMessage: action.message,
    snackAutoHideDuration: action.ttl
  }),
  [appActionsConstants.HIDE_MESSAGE_SNACK_BOTTOM]: (state, action) => ({
    ...state,
    showSnackBottom: false,
    snackIntent: "",
    snackMessage: "",
    snackAutoHideDuration: 0
  })
};

export default function appGlobalsReducer(
  state = initialAppGlobalsState,
  action
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
