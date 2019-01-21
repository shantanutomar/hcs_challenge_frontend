import { appActionsConstants } from "./appActionsConstants";

/*
Handles the actions for displaying user notifications
*/

export const showMessageSnackBottom = (
  message,
  intent = "info",
  ttl = 4000
) => ({
  type: appActionsConstants.SHOW_MESSAGE_SNACK_BOTTOM,
  message,
  intent,
  ttl
});

export const hideSnackBottom = () => ({
  type: appActionsConstants.HIDE_MESSAGE_SNACK_BOTTOM
});
