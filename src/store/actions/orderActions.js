import { actionTypes, apiCreator } from "../common";

export const getAllOrders = (order) => (dispatch) => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/orders?page=${order.page}&&status=${order.action}`,
    },
    actionTypes.GET_ALL_ORDERS,
    dispatch
  );
};

export const getPortraitOrders = (index) => (dispatch) => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/portrait_orders?page=${index.page}`,
    },
    actionTypes.GET_PORTRAIT_ORDERS,
    dispatch
  );
};

export const getListingOrders = (index) => (dispatch) => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/list_sell?page=${index.page}`,
    },
    actionTypes.GET_LISTING_ORDERS,
    dispatch
  );
};

export const getPendingOrders = (order) => (dispatch) => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/orders?page=${order.page}&&status=${order.action}`,
    },
    actionTypes.GET_PENDING_ORDERS,
    dispatch
  );
};

export const approvedOrder = (id, action) => (dispatch) => {
  return apiCreator(
    {
      method: "PUT",
      endPoint: `/orders/${id}?action=${action}`,
    },
    actionTypes.SUCCESS,
    dispatch
  );
};

export const tracking = (id, body) => (dispatch) => {
  return apiCreator(
    {
      method: "PUT",
      endPoint: `/orders/tracking/${id}`,
      body: {
        tracking: body,
      },
    },
    null,
    dispatch
  );
};

export const setCharges = (body) => (dispatch) => {
  return apiCreator(
    {
      method: "POST",
      endPoint: `/charges`,
      body,
    },
    actionTypes.SET_CHARGES,
    dispatch
  );
};

export const getCharges = () => (dispatch) => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/charges`,
    },
    actionTypes.GET_CHARGES,
    dispatch
  );
};
