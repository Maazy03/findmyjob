import { actionTypes } from "../common/types";

const initialState = {
  notification: "",
};

export const notificationReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GET_NOTIFICATION:
      return {
        ...state,
        notification: payload.result,
      };
    default:
      return state;
  }
};
