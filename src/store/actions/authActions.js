import { actionTypes, apiCreator, actionCreator } from "../common";
import * as utils from "../../common/utils";
// import Axios from "axios";

export const login = (body, navigate, stopLoader) => async (dispatch) => {
  console.log("LOGIN REDUX", body);
  let response;
  try {
    console.log("TRUEEEwwwww")
    
    response = await apiCreator(
      {
        method: "POST",
        endPoint: "/superAdmin/login",
        body: body,
      },
      actionTypes.LOGIN,
      dispatch
      );
    console.log("LOGIN RESPONSE ADDED", response);
    navigate();
    

  } catch (error) {
      console.log('ssdd===',error)
    console.log("FALSEwwww")
    stopLoader();
    console.log("LOGIN ERROR",error);
    // utils._toast("INVALID EMAIL or PASSWORD", "error");
    if(error.msg=="Network Error")
    {
      utils._toast("NETWORK ERROR", "error");
    }
    else
    {
      utils._toast("INVALID EMAIL or PASSWORD", "error");
    }
  }
  return response;
 
  // return apiCreator(
  //   { method: "POST", endPoint: "/login", body: body },
  //   actionTypes.LOGIN,
  //   dispatch
  // );
};

export const signupEmail = (body, navigate, stopLoader) => async (dispatch) => {
  console.log("SIGN UP EMAIL REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "/superAdmin/verifyEmail", body: body },
      actionTypes.SIGNUP,
      dispatch
    );
    console.log("SIGN UP EMAIL ADDED RESPONSE", response);
    // utils._toast("EMAIL VErify", "error");

    navigate();
  } catch (err) {
    stopLoader();
    console.log("JJOJO",err);
    if(err.message=="Network Error")
    {
      utils._toast("NETWORK ERROR", "error");
    }
    else
    { 
        utils._toast("INVALID EMAIL", "error");
    }
  }
  return response;
};

export const signUpDataEmail = (body) => (dispatch) => {
  return actionTypes.SIGNUPEMAILDATA, dispatch;
};

export const signupOTP = (body, navigate, stopLoader) => async (dispatch) => {
  console.log("SIGN UP OTP REDUX", body);
  console.log("SIGNUP OTP EMAIL", body.email);
  console.log("SIGNUP OTP CODE", body.OTPcode);

  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: "/superAdmin/verifyOTP",
        body: body,
      },
      actionTypes.SIGNUP_OTP,
      dispatch
    );
    console.log("SIGNUP_OTP ADDED RESPONSE", response);
    // utils._toast("SIGNPPPPPPPPPPPPPPPPPPPPOTP", "sucess");

    navigate();
  } catch (err) {
    console.log("ERROR", err.message);
    stopLoader();
    if(err.message=="Network Error")
    {
      utils._toast("NETWORK ERROR", "error");
    }
    else
    {
      utils._toast("INVALID OTP", "error");
    }
  }
  return response;
};

export const signupPassword = (body, navigate, stopLoader) => async (
  dispatch
) => {
  console.log("SIGN UP PASSWORD REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "/superAdmin/setPassword", body: body },
      actionTypes.SIGNUP_PASSWORD,
      dispatch
    );
    console.log("SIGN UP PASSWORD  ADDED RESPONSE", response);

    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    if(err.message=="Network Error")
    {
      utils._toast("NETWORK ERROR", "error");
    }
    else
    {
      utils._toast("INVALID CREDENTIALS", "error");
    }
  }
  return response;
};

export const forgetNewPassword = (body, navigate, stopLoader) => async (
  dispatch
) => {
  console.log("FORGET NEW PASSWORD REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "/superAdmin/setPassword", body: body },
      actionTypes.FORGET_NEW_PASSWORD,
      dispatch
    );
    console.log("FORGET NEW PASSWORD ADDED RESPONSE", response);

    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    if(err.message=="Network Error")
    {
      utils._toast("NETWORK ERROR", "error");
    }
    else
    {
      utils._toast("INCORRECT PASSWORD", "error");
    }
  }
  return response;
};

export const updateNewPassword = (body,navigate,stopLoader) => async (dispatch) => {
  console.log("UPDATE NEW PASSWORD REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "/superAdmin/updatePassword", body: body },
      actionTypes.UPDATE_NEW_PASSWORD,
      dispatch
    );
    stopLoader();
    console.log("UPDATE NEW PASSWORD ADDED RESPONSE", response);

    navigate()
  }
   catch (err) {
    stopLoader();
    console.log(err.message);
    if(err.message=="Network Error")
    {
      utils._toast("NETWORK ERROR", "error");
    }
    else
    {
      utils._toast("OLD PASSWORD INCORRECT", "error");
    }
  }
  return response;
};


export const updateName = (body,navigate, stopLoader) => async (dispatch) => {
  console.log("UPDATE NAME REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "/superAdmin/updateName", body: body },
      actionTypes.UPDATE_NAME,
      dispatch
    );
    stopLoader();
    console.log("UPDATE NAME ADDED RESPONSE", response);
    navigate()

    // navigate()
  } catch (err) {
    stopLoader();
    console.log(err.message);
    if(err.message=="Network Error")
    {
      utils._toast("NETWORK ERROR", "error");
    }
    else
    {
      utils._toast("INVALID CREDENTIALS", "error");
    }
  }
  return response;

};

export const addAdmin = (body,navigate, stopLoader) => async (dispatch) => {
  console.log("Create new Admin REDUX", body.email);
  let response;

  try {
     response = await apiCreator(
      {
        method: "POST",
        endPoint: "/superAdmin/verifyPassword",
        body: { email: body.logEmail, password: body.password },
      },
      // console.log("YAHAN TAK TO CHAL GAYA", body.logEmail),
      actionTypes.PASSWORD_VERIFICATION,
      dispatch
    )

    if(response)
    {
    console.log("response 1", response);
     response = await apiCreator(
      { method: "POST", endPoint: "/superAdmin", body: { email: body.email } },
      actionTypes.CREATE_NEW_ADMIN,
      dispatch
    );
    console.log("response 2", response);
    stopLoader();
    // console.log("CREATE NEW ADMIN RES", response);
    navigate()
  } 
}
  
  catch (err) {
    stopLoader();
    // console.log("Masla hogaya authAction dekho", err.response.data.error);
    if(err.message=="Network Error")
    {
      utils._toast("NETWORK ERROR", "error");
    }
    else
    {
      utils._toast(err.response.data.error, "error");
    }
  }
  return response;
};


export const removeSuperAdmin = (body,navigate, stopLoader) => async (dispatch) => {
  console.log("DELETE SUPER ADMIN REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "DELETE", endPoint: "/superAdmin", body: body },
      actionTypes.DELETE_SUPER_ADMIN,
      dispatch
    );
    stopLoader();
    console.log("DELETE SUPER ADMIN ADDED RESPONSE", response);
    navigate()

    // navigate()
  } catch (err) {
    stopLoader();
    console.log(err.message);
    if(err.message=="Network Error")
    {
      utils._toast("NETWORK ERROR", "error");
    }
    else
    {
      utils._toast("CANNOT DELETE ADMIN", "error");
    }
  }
  return response;

};








export const setWareHouseAddress = (userId, body) => (dispatch) => {
  return apiCreator(
    { method: "POST", endPoint: `/vendor/update/${userId}`, body: body },
    actionTypes.SET_WAREHOUSE_ADDRESS,
    dispatch
  );
};

export const forgotPassword = (body) => (dispatch) => {
  return apiCreator(
    { method: "POST", endPoint: "/admin/sendCode", body: body },
    actionTypes.TOKEN,
    dispatch
  );
};

export const sendCode = (data) => (dispatch) => {
  return apiCreator(
    {
      method: "POST",
      endPoint: `/admin/sendCode`,
      body: { email: data.email },
    },
    null,
    dispatch
  );
};

export const verifyCode = (data) => (dispatch) => {
  return apiCreator(
    {
      method: "POST",
      endPoint: `/admin/verifyCode`,
      body: data.code,
    },
    null,
    dispatch
  );
};

export const resetPassword = (data) => (dispatch) => {
  return apiCreator(
    {
      method: "POST",
      endPoint: `/admin/passwordReset`,
      body: data.body,
    },
    null,
    dispatch
  );
};
export const getAllAdmins = (data) => (dispatch) => {
  console.log("GET ALL ADMIN DATA",data)
  return apiCreator(
    {
      method: "GET",
      endPoint: `/superadmin`,
      // body: body,
    },
    null,
    dispatch
    );
};

export const logout = () => (dispatch) => {
  dispatch(actionCreator(actionTypes.LOGOUT, dispatch));
};
