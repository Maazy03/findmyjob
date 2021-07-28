import { actionTypes, apiCreator } from "../common";

export const getDashboardOrders = () => dispatch => {
  return apiCreator(
    { method: "GET", endPoint: `/dashboard/orders` },
    actionTypes.GET_DASHBOARD_ORDERS,
    dispatch
  );
};