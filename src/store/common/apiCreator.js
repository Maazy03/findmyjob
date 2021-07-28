import { actionTypes, actionCreator } from "../common";
import axios from "axios";
import * as utils from "../../common/utils";
// export const serverURL = process.env.REACT_APP_API_URL;
export const serverURL = "https://lynx-xehen.herokuapp.com";
// export const serverURL = "http://localhost:4000";

export const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL;
export const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

const optionsCretor = (props) => {
  return {
    method: props.method,
    url: `${serverURL}${props.endPoint}`,
    data: props.body || {},
  };
};

export const apiCreator = async (props, type, dispatch, state) => {
  return new Promise(async (resolve, reject) => {
    // axios(optionsCretor(props))
    // .then((response) => {
    //   const { result } = response.data;
    //   if (type) {
    //     dispatch(actionCreator(type, { result: result, state: state }));
    //   }
    //   resolve(result);
    // })
    // .catch((error) => reject(error));
    try {
      const response = await axios(optionsCretor(props));
      let { result } = response.data;
      // console.log("response --> ", response);
      // console.log("response.data --> ", response.data);
      // if (result) {
      //   console.log("api response -->", result)
      //   utils._toast("Login Success", "success");
      // }
      // console.log("response status ", response.status);
      // console.log("response status >= 300", response.data.status >= 300);
      if (response.data.status > 300) {
        // console.log("errrorrr");
        // utils._toast(response.data.message, "error");
        throw new Error(response);
        // reject(response.data.message.message)
      } 
      else {
        result = response.data;
        // console.log("api response -->", result);
        if (type === "LOGIN") {
          utils._toast("ACCOUNT SUCCESFULLY LOGGED IN", "success");
        }
        if (type === "SIGNUP") {
          utils._toast("EMAIL VERIFIED", "success");
        }
        if (type === "SIGNUP_OTP") {
          // console.log("SIGN UP OTP API CREATOR");
          utils._toast("OTP VERIFIED", "success");
        }
        if (type === "SIGNUP_PASSWORD") {
          utils._toast("ACCOUNT VERIFIED SUCCESFULLY", "success");
        }
        if (type === "FORGET_NEW_PASSWORD") {
          utils._toast("NEW PASSWORD SET SUCCESFULLY", "success");
        }
        if (type === "UPDATE_NEW_PASSWORD") {
          utils._toast("PASSWORD UPDATED SUCCESFULLY", "success");
        }
        if (type === "REMOVE_SCHOOL") {
          utils._toast("SCHOOL UN REVOKED SUCCESFULLY", "success");
        }
        if (type === "REVOKE_SCHOOL") {
          utils._toast("SCHOOL REVOKED SUCCESFULLY", "success");
        }
        if (type === "UN_REVOKE_SCHOOL") {
          utils._toast("School UnRevoked succesfully", "success");
        }
        if (type === "UPDATE_NAME") {
          utils._toast("NAME UPDATED SUCCESFULLY", "success");
        }
        if (type === "CREATE_NEW_ADMIN") {
          utils._toast("SUPER ADMIN CREATED SUCCESFULLY", "success");
        }
        if (type === "EDIT_BUS") {
          utils._toast("Bus Updated", "success");
        }
        if (type === "ADD_DRIVER") {
          utils._toast("Driver Added", "success");
        }
        if (type === "DELETE_DRIVER") {
          utils._toast("Driver Deleted", "success");
        }
        if (type === "EDIT_DRIVER") {
          utils._toast("Driver Updated", "success");
        }
        if (type === "ADD_PARENT") {
          utils._toast("Parent Added", "success");
        }
        if (type === "EDIT_PARENT") {
          utils._toast("Parent Updated", "success");
        }
        if (type === "DELETE_PARENT") {
          utils._toast("Parent Deleted", "success");
        }
        if (type === "REVOKE_REGISTERATION") {
          utils._toast("Parent's Registeration Revoked", "success");
        }
        if (type === "DELETE_SUPER_ADMIN") {
          utils._toast("Super Admin Removed", "success");
        }
        // if (type === "ADD_STUDENT") {
        //   utils._toast("Student Added", "success");
        // if (type === "EDIT_STUDENT") {
        //   utils._toast("Student Updated", "success");
        // }
        // if (type === "ADD_MULTIPLE_STUDENTS") {
        //   utils._toast("Multiple Students Added", "success");
        // }
        // if (type === "SET_STUDENT_IMAGE") {
        //   utils._toast("Student's Image Uploaded", "success");
        // }
        // if (type === "SET_MULTIPLE_STUDENT_IMAGE") {
        //   utils._toast("Multiple Students' Images Uploaded", "success");
        // }
        if (type) {
          // console.log("DUSPATC",result)
          dispatch(actionCreator(type, { result: result, state: state }));
        }
        // console.log("RESILT",result)
        resolve(result);
      }

      
    }
     catch (error) {
      console.log("========================",error)
      reject(error);
      throw error
    }
  });
};
