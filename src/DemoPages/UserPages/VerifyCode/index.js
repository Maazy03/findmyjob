import React, { useState,useDispatch } from "react";
import {
  Spinner,
  FormFeedback,
  Col,
  Form,
  Row,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as utils from "../../../common/utils";
import { connect, useSelector } from "react-redux";
import Art_Img from "../../../assets/img/Reserves1.jpg";
import { signupOTP } from "../../../store/actions/authActions"
const axios = require("axios");

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        AfricanArt.International
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Art_Img})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(20, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    marginBottom: 40,
    flexGrow: 1,
    fontFamily: "Dancing Script",
    cursor: "pointer",
  },
}));
 
function VerifyCodeBoxed(props) {

  const user = useSelector((state) => state);
  const classes = useStyles();
  // const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({OTPpin: "" });
  // const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
  const [stateIsOTPpinValid, setStateIsOTPpinValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false)
  const loggedemail=props.signupEmail.email
  console.log("SIGN UP PASSWORD PROPS",loggedemail)


  function _onChange(event) {
    const { name, value } = event.target;
    console.log("CONSOLE",name,value)
    setState((prevState) => ({ ...prevState, [name]: value }));
  }
  function onBlurHandler(event) {
    const { name, value } = event.target;
    validateField(name, value);
  }
  function validateField(fieldName, value) {
    switch (fieldName) {
      // case "email":
      //   let emailValid = state.email === "" ? false : stateIsEmailValid;
      //   emailValid = utils.isEmailValid(value);
      //   setStateIsEmailValid(emailValid);
      //   validateForm();
      //   break;

      case "OTPpin":
        let passwordValid = utils.isOTPpinValid(value);
        setStateIsOTPpinValid(passwordValid);
        validateForm();
        break;

      default:
        break;
    }
  }
  function validateForm() {
    let emailValid = false,
      OTPpin = false;
    // emailValid = utils.isEmailValid(state.email);
    OTPpin = utils.isOTPpinValid(state.OTPpin);
    setStateIsFormValid(OTPpin);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const SIGNUPOTP_DATA = {
     email:loggedemail,
    OTPcode:state.OTPpin
    };
    
    console.log("RESET PASSWORD OTP INDEX",SIGNUPOTP_DATA)

    props.signupOTP(SIGNUPOTP_DATA, () => {
      props.history.push({
        pathname: "/pages/forget-new-password-boxed",
        // state: { email:loggedemail }
      });
    }, () => setLoading(false));
  };


  async function onVerifyCode() {
    // try {
    //   setStateLoader(true);
    //   const { code } = state;
    //   const config = {
    //     headers: { Authorization: `Bearer ${token}` },
    //   };
    //   const result = await axios.post(
    //     `${process.env.REACT_APP_API_URL}/admin/verifyCode`,
    //     { code: code },
    //     config
    //   );
    //   setStateLoader(false);
    //   setState({ code: "" });
    //   props.history.push({
    //     pathname: "/pages/reset-password-boxed",
    //   });
    // } catch (error) {
    //   console.log("check error", error);
    //   if (error.response) {
    //     utils._toast(error.response.data.responseMessage, "error");
    //   } else {
    //     utils._toast("Netwrok Error", "error");
    //   }
    //   setStateLoader(false);
    //   setState({ code: "" });
    // }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h5" className={`${classes.title}`}>
            <b>AfricanArt International</b>
          </Typography>
          <Typography component="h1" variant="h5">
            VERIFY OTP
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!stateIsOTPpinValid}
            label="Code"
            helperText={
              stateIsOTPpinValid ? "" : utils.Constants.OTPpinError
            }
            id="password"
            autoComplete="current-password"
            type="text"
            name="OTPpin"
            placeholder="Enter 6 digits OTP"
            onChange={_onChange}
            onBlur={onBlurHandler}
            invalid={!stateIsOTPpinValid}
            valid={state.OTPpin ? stateIsOTPpinValid : false}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!stateIsFormValid}
            className={classes.submit}
            onClick={handleSubmit}
          >
            {stateLoader ? (
              <div style={{ width: "130px" }}>
                <Spinner
                  style={{ width: "20px", height: "20px" }}
                  color="light"
                />
              </div>
            ) : (
              "Verify Code"
            )}
          </Button>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    signupEmail:state.auth.signupEmailData
    // open: state.layoutReducer.snackbarState,
    // message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    // showAlert: (message) => dispatch(onSnackbar(message)),
    signupOTP: (SIGNUPOTP_DATA,navigate,stopLoader) => dispatch(signupOTP(SIGNUPOTP_DATA,navigate,stopLoader))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCodeBoxed);