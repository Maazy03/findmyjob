import { actionTypes, apiCreator } from "../common";

export const getListingOrders = body => dispatch => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/list_sell?page=${body.page}&&status=${body.status}`
    },
    actionTypes.GET_LISTING_APPROVED_ORDERS,
    dispatch
  );
};

export const getListingRequestOrders = body => dispatch => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/list_sell?page=${body.page}&&status=${body.status}`
    },
    actionTypes.GET_LISTING_REQUEST_ORDERS,
    dispatch
  );
};

export const approvedOrders = (id, status) => dispatch => {
  return apiCreator(
    {
      method: "PUT",
      endPoint: `/list_sell/${id}`,
      body: {
        status: status
      }
    },
    actionTypes.GET_LISTING_APPROVED_ORDERS,
    dispatch
  );
};
