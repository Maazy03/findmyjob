import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import LoginBoxed from "./LoginBoxed/";

import RegisterBoxed from "./RegisterBoxed/";
import SignupOTPBoxed from './SignupOTPBoxed'
import ForgotPasswordEmailBoxed from "./ForgotPasswordEmailBoxed";
import SignupEmailBoxed from "./SignUpEmail/"
import VerifyCode from "./VerifyCode";
import ResetPassword from "./ResetPassword";
import SignupPasswordBoxed from "./SignupPassword";
import ForgetPasswordNewPassword from "./ForgetPasswordNewPassword";
import ForgetPasswordOTPBoxed from "./ForgetPasswordOTPBoxed";

const UserPages = ({ match }) => (
  < Fragment >
    <div className="app-container">
      <Route path={`${match.url}/login-boxed`} component={LoginBoxed} />
      <Route path={`${match.url}/register-boxed`} component={RegisterBoxed} />
      <Route path={`${match.url}/forgot-password-boxed`} component={ForgotPasswordEmailBoxed} />
      <Route path={`${match.url}/forget-password-OTP-boxed`} component={ForgetPasswordOTPBoxed} />
      <Route path={`${match.url}/reset-password-boxed`} component={ResetPassword} />
      <Route path={`${match.url}/signup-email-boxed`} component={SignupEmailBoxed} />
      <Route path={`${match.url}/signup-OTP-boxed`} component={SignupOTPBoxed} />
      <Route path={`${match.url}/signup-password-boxed`} component={SignupPasswordBoxed} />
      <Route path={`${match.url}/forget-new-password-boxed`} component={ForgetPasswordNewPassword} />

    </div>
  </Fragment >
);

export default UserPages;
