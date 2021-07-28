import { actionTypes, apiCreator } from "../common";

export const getPortraitOrders = (body) => (dispatch) => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/portrait_orders?page=${body.page}&&status=${body.status}`,
    },
    actionTypes.GET_PORTRAIT_ORDERS,
    dispatch
  );
};

export const getPortraitRequestOrders = (body) => (dispatch) => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/portrait_orders?page=${body.page}&&status=${body.status}`,
    },
    actionTypes.GET_PORTRAIT_REQUEST_ORDERS,
    dispatch
  );
};
export const deletePortraitOrder = (id) => (dispatch) => {
  return apiCreator(
    {
      method: "DELETE",
      endPoint: `/portrait_orders/:${id}`,
    },
    actionTypes.GET_PORTRAIT_REQUEST_ORDERS,
    dispatch
  );
};

export const tracking = (id, body) => (dispatch) => {
  return apiCreator(
    {
      method: "PUT",
      endPoint: `/portrait_orders/tracking/${id}`,
      body: {
        tracking: body,
      },
    },
    null,
    dispatch
  );
};

export const onApproved = (id, status) => (dispatch) => {
  return apiCreator(
    {
      method: "PUT",
      endPoint: `/portrait_orders/${id}?status=${status}`,
    },
    actionTypes.Approved_PORTRAIT_ORDERS,
    dispatch
  );
};
