import { actionTypes, apiCreator, actionCreator } from "../common";
import * as utils from "../../common/utils";
// import Axios from "axios";

export const getAllSchools = (index) => (dispatch) => {
  console.log("GET ALL SCHOOL ACTION KA DISPATCH", dispatch);
  return apiCreator(
    {
      method: "GET",
      endPoint: "/auth",
    },
    actionTypes.GET_ALL_SCHOOLS,
    dispatch
  );
};

export const revokeSchool = (body) => (dispatch) => {
  console.log("BODYYYY", body);
  apiCreator(
    { method: "POST", endPoint: "/auth/revokeSchool", body: body },
    actionTypes.REVOKE_SCHOOL,
    dispatch
  );
  dispatch(getAllSchools());
};

export const unrevokeSchool = (body, navigate) => async (dispatch) => {
  console.log("UN REVOKE SCHOOL ACTION", body)
  try {
    const res = await apiCreator(
      { method: "POST", endPoint: "/auth/unrevokeSchool", body: body },
      actionTypes.UN_REVOKE_SCHOOL,
      dispatch
    );
    navigate()
    // dispatch(remove());
    dispatch(getAllSchools());
    // utils._toast("School UnRevoked", "success");
  }
  catch (err) {
    console.log("UNREVOKE ERROR", err)
    utils._toast("School not UnRevoked", "error");
  }
};

export const getSchoolPaymentHistory = (body) => async (dispatch) => {
  console.log("SCHOOL PAHMENT HISTORY", body)
  try {
    const res = await apiCreator(
      { method: "POST", endPoint: "/billing/all", body: body },
      actionTypes.PAYMENT_HISTORY_SCHOOL,
      dispatch
    );
    console.log("PAYMENT TRY ", res)
    return res.result
  }

  catch (err) {
    console.log("ERROR", err)
    // utils._toast("School Already Present", "error");

  }
};

export const addSchool = (body, navigate, stopLoader, toggle) => async (dispatch) => {
  // console.log("HAN YAR BOLO",body)
  try {
    const res = await apiCreator(
      { method: "POST", endPoint: "/auth", body: body },
      actionTypes.ADD_SCHOOL,
      dispatch
    );
    console.log("+++", res);
    dispatch(getAllSchools());
    utils._toast("School Created", "success");
    // navigate();
    toggle();
    stopLoader()
  }

  catch (err) {
    console.log("ADD SCHOLL ERROR",err)
    stopLoader();
    utils._toast("School Already Present", "error");
    //  toggle();
    // console.log("YE TO ERROR HAI YAR", err.response);
  }
};
