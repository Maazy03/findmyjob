import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  Spinner,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";
import * as utils from "../../../common/utils";
import { AddProductShimmer } from "../../../assets/components/shimmerComponents";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { authActions } from "../../../store/actions";
// import Art_Img from "../../../assets/img/Reserves1.jpeg";
import { updateNewPassword } from "../../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    // backgroundImage: `url(${Art_Img})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    // width: "fit-content", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    width:"50%"
  },
  submit: {
    color: "white",
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Dancing Script",
    cursor: "pointer",
  },
  alreadyVerified: {
    justifyContent: "flex-end",
    // backgroundColor:'red',
    textAlign: "right",
  },
}));
const ChangePassword = (props) => {
  const user = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
  const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const loggedinEmail = props.loggedInEmail;
  console.log("CHANGE PASSWORD PROPS", props);

  const _onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  function onBlurHandler(event) {
    const { name, value } = event.target;
    validateField(name, value);
  }

  function validateField(fieldName, value) {
    switch (fieldName) {
      case "password":
        let passwordValid = utils.isPasswordValid(value);
        setStateIsPasswordValid(passwordValid);
        validateForm();
        break;

      default:
        break;
    }
  }
  function validateForm() {
    let emailValid = false,
      passwordValid = false;

    passwordValid = utils.isPasswordValid(state.password);
    setStateIsFormValid(passwordValid);
  }

  const handleSubmit = (e) => {
    setStateLoader(true);
    if (state.newPassword === state.confirmNewPassword) {
      // setStateLoader(true);
      e.preventDefault();

      const UPDATE_PASSWORD_DATA = {
        email: loggedinEmail,
        password: state.oldPassword,
        newPassword: state.newPassword,
      };

      // console.log("SIGN UP PASSWORD INDEX", UPDATE_PASSWORD_DATA);
      props.updateNewPassword(
        UPDATE_PASSWORD_DATA,
        () => {
          props.history.push({
            pathname: "/"
          });
        },
        () => setStateLoader(false)
      );
    }
    else {
      setStateLoader(false)
      utils._toast("Passwords don't match", "error");
      // setState({ oldPassword: "",newPassword:"",confirmNewPassword:"" });
    }
  };

  const onUpdatePassword = async () => {
    // console.log("UPDATE_PASSWORD_DATA", state)
    // try {
    //   setStateLoader(true);
    //   const result = await dispatch(authActions.updatePassword(state));
    //   props.history.push({
    //     pathname: "/dashboards",
    //   });
    // } catch (error) {
    //   if (error.response) {
    //     utils._toast(error.response.data.responseMessage, "error");
    //   } else {
    //     utils._toast("Netwrok Error", "error");
    //   }
    //   setStateLoader(false);
    //   setState({ oldPassword: "",newPassword:"",confirmNewPassword:"" });
    // }
  };

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Container>
          {/* <Card className="main-card mb-3" style={{justifyContent:"center"}}> */}
          <CardBody>
            <CardTitle style={{ textAlign: "center" }}>
              CHANGE PASSWORD
            </CardTitle>
            <div style={{display:"flex",justifyContent:"center"}}>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={!stateIsPasswordValid}
                label="Old Password"
                type="password"
                helperText={
                  stateIsPasswordValid ? "" : utils.Constants.passwordError
                }
                id="password"
                autoComplete="current-password"
                type="password"
                name="oldPassword"
                placeholder="Old Password here..."
                value={state.password}
                onChange={_onChange}
                onBlur={onBlurHandler}
                invalid={!stateIsPasswordValid}
                valid={state.password ? stateIsPasswordValid : false}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={!stateIsPasswordValid}
                label="New Password"
                type="password"
                helperText={
                  stateIsPasswordValid ? "" : utils.Constants.passwordError
                }
                id="password"
                autoComplete="current-password"
                type="password"
                name="newPassword"
                placeholder="New Password here..."
                value={state.password}
                onChange={_onChange}
                onBlur={onBlurHandler}
                invalid={!stateIsPasswordValid}
                valid={state.password ? stateIsPasswordValid : false}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={!stateIsPasswordValid}
                label="Confirm New Password"
                type="password"
                helperText={
                  stateIsPasswordValid ? "" : utils.Constants.passwordError
                }
                id="password"
                autoComplete="current-password"
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password here..."
                value={state.password}
                onChange={_onChange}
                onBlur={onBlurHandler}
                invalid={!stateIsPasswordValid}
                valid={state.password ? stateIsPasswordValid : false}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                style={{ color: "white" }}
                disabled={state.oldPassword.length <= 7 || state.newPassword.length <= 7
                  || state.confirmNewPassword.length <= 7 || stateLoader}
              >
                {stateLoader ? (
                  <div style={{ width: "130px" }}>
                    <Spinner
                      style={{ width: "20px", height: "20px" }}
                      color=" white"
                    />
                  </div>
                ) : (
                    "Confirm Password"
                  )}
              </Button>

              <Box mt={5}>{/* <Copyright /> */}</Box>
            </form>
          </div>
          </CardBody>
          {/* </Card> */}
        </Container>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log("change PASSWORD STATE", state);
  return {
    loggedInEmail: state.auth.user.result.userExist.email,
    // open: state.layoutReducer.snackbarState,
    // message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    // showAlert: (message) => dispatch(onSnackbar(message)),

    updateNewPassword: (UPDATE_PASSWORD_DATA, navigate, stopLoader) =>
      dispatch(updateNewPassword(UPDATE_PASSWORD_DATA, navigate, stopLoader)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
