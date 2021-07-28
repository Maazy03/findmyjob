import { actionTypes } from "../common/types";

const initialState = {
  user: {
    userIsLoggedIn: false,
  },
  loginData: "",
  token: "",
  signupEmail: "",
  loginEmailData:"",
  signupOTP: "",
  signupPassword: "",
  signupEmailData: "",
  forgetNewPassword: "",
  updateNewPassword: "",
  updateName:"",
  newAdmin: "",
  allAdmins: [],
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN:
      // console.log("LOGIN REDUCER", payload.result);
      return {
        ...state,
        user: {
          userIsLoggedIn: true,
          ...payload.result,
        },
        // loginData:[...state.loginData,payload.result],

        // loginData:...state.loginData,payload.result
      };

    case actionTypes.SIGNUP:
      return {
        ...state,
        user: {
          userIsLoggedIn: false,
          // ...payload.result,
        },
        signupEmail: [...state.signupEmail, payload.result],
      };
    case actionTypes.SIGNUP_OTP:
      // console.log("SIGN UP OTP REDUCER", state);
      return {
        ...state,
        user: {
          userIsLoggedIn: false,
          // ...payload.result,
        },
        signupOTP: [...state.signupOTP, payload.result],
      };
    case actionTypes.SIGNUP_PASSWORD:
      // console.log("SIGN UP PASSWORD REDUCER", state);
      return {
        ...state,
        user: {
          userIsLoggedIn: false,
          // ...payload.result,
        },
        signupPassword: [...state.signupPassword, payload.result],
      };
    case actionTypes.FORGET_NEW_PASSWORD:
      // console.log("FORGET_NEW_ PASSWORD REDUCER", state);
      return {
        ...state,
        user: {
          userIsLoggedIn: false,
          // ...payload.result,
        },
        forgetNewPassword: [...state.forgetNewPassword, payload.result],
      };
    case actionTypes.UPDATE_NEW_PASSWORD:
      // console.log("UPDATE_NEW_ PASSWORD REDUCER", state);
      return {
        ...state,
        //  user: {
        //    userIsLoggedIn: true,
        //   //  ...payload.result,
        //  },
        //  updateNewPassword:[...state.updateNewPassword,payload.result],
      };
      case actionTypes.UPDATE_NAME:
        // console.log("UPDATE NAME",payload)
        return {
          ...state,
          //     user: {
          //   //  userIsLoggedIn: true
          //  },
          // updateName: [...state.updateName, payload.result],
        };
      case actionTypes.CREATE_NEW_ADMIN:
      // console.log("CREATE NEW ADMIN REDUCER", state);
      return {
        ...state,
        //  user: {
        //    userIsLoggedIn: true,
        //   //  ...payload.result,
        //  },
        //  updateNewPassword:[...state.updateNewPassword,payload.result],
        // newAdmin: [...state.newAdmin, payload.result],
      };
      case actionTypes.PASSWORD_VERIFICATION:
        // console.log("CREATE NEW ADMIN REDUCER", state);
        return {
          ...state,
          //  user: {
          //    userIsLoggedIn: true,
          //   //  ...payload.result,
          //  },
          //  updateNewPassword:[...state.updateNewPassword,payload.result],
          // newAdmin: [...state.newAdmin, payload.result],
        };
      
      case actionTypes.DELETE_SUPER_ADMIN:
      // console.log("CREATE NEW ADMIN REDUCER", state);
      return {
        ...state,
        //  user: {
        //    userIsLoggedIn: true,
        //   //  ...payload.result,
        //  },
        //  updateNewPassword:[...state.updateNewPassword,payload.result],
        // newAdmin: [...state.newAdmin, payload.result],
      };
      case actionTypes.SIGNUPEMAILDATA:
      console.log("SIGN UUP EMAIL DATA REDUCER",state)
      return {
        ...state,
        // user: {
        //   ...state.user,
        // },
        signupEmailData: payload,
      };
    case actionTypes.LOGINEMAILDATA:
      console.log("LOGIN EMAIL DATA REDUCER")
      return {
        ...state,
        // user: {
        //   ...state.user,
        // },
        loginEmailData: payload,
      };
    case actionTypes.GET_ALL_ADMINS:
      // console.log("ALL ADMIN REDUCER", payload);
      return {
        ...state,
        // user: {
        //   ...state.user,
        // },
        // signupEmailData: payload,
      };

    case actionTypes.TOKEN:
      return {
        ...state,
        token: payload.result,
      };
    case actionTypes.LOGOUT:
      console.log("LOGOUT REDUCER 02",payload,state)
      return {
        ...state,
        user: {
        result:{
          userIsLoggedIn: false,
          userExist:{
            email:'',
            password:''
          }
        }
        },
    
      };
    default:
      return state;
  }
};
