import { actionTypes, apiCreator } from "../common";

export const getNotification = () => dispatch => {
  return apiCreator(
    { method: "GET", endPoint: `/notification` },
    actionTypes.GET_NOTIFICATION,
    dispatch
  );
};