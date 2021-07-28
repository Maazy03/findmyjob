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
import { authActions } from "../../../store/actions"
// import Art_Img from "../../../assets/img/Reserves1.jpeg";
import { updateName } from "../../../store/actions/authActions";

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
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Dancing Script",
    cursor: "pointer",
  },
  alreadyVerified: {
    justifyContent: 'flex-end',
    // backgroundColor:'red',
    textAlign: 'right'
  }
}));
const ChangeName = (props) => {
  const user = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({ newName: "" });
  const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
  const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const loggedEmail=props.loggedInEmail
//   console.log("LOGGED IN EMAIL",loggedEmail)
// console.log("CHANEG NAME PROPS",props)
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

      case "name":
        let nameValid = utils.isPasswordValid(value);
        setStateIsPasswordValid(nameValid);
        validateForm();
        break;

      default:
        break;
    }
  }
  function validateForm() {
    let emailValid = false,
      passwordValid = false;
    emailValid = utils.isEmailValid(state.email);
    passwordValid = utils.isPasswordValid(state.password);
    setStateIsFormValid(emailValid && passwordValid);
  }

  const handleSubmit = (e) => {
    setStateLoader(true);

    e.preventDefault();

    const UPDATE_NAME_DATA = {
      email: loggedEmail,
      name:state.newName,
      // password: state.oldPassword,
      // newPassword: state.newPassword,
    };

    // console.log("UPDATE NAME INDEX", UPDATE_NAME_DATA);
    props.updateName(
      UPDATE_NAME_DATA,
      () => {
        props.history.push({
          pathname: "/",
        });
      },
      () => setStateLoader(false)
    );


  };
  const onUpdateName = async () => {

    // console.log("UPDATE_NAME_DATA", state)
    // try {
    //   setStateLoader(true);
    //   const result = await dispatch(authActions.updateName(state));
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
    //   setState({ newName: "" });
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
        transitionLeave={false} >

        <Container>
          {/* <Card className="main-card mb-3" style={{justifyContent:"center"}}> */}
          <CardBody >
            <CardTitle style={{ textAlign: "center" }}>CHANGE NAME</CardTitle>

            <div style={{display:"flex",justifyContent:"center"}}>

            <form className={classes.form} noValidate>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={!stateIsPasswordValid}
                label="New Name"
                type="text"
                // helperText={
                //   stateIsPasswordValid ? "" : utils.Constants.passwordError
                // }
                id="password"
                autoComplete="current-password"
                type="text"
                name="newName"
                placeholder="New Name here..."
                value={state.newName}
                onChange={_onChange}
                onBlur={onBlurHandler}
                // invalid={!stateIsPasswordValid}
                valid={state.newName ? stateIsPasswordValid : false}
              />
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                disabled={state.newName.length<=2  || stateLoader}
              >
                {stateLoader ? (
                  <div style={{ width: "50px" }}>
                    <Spinner
                      style={{ width: "20px", height: "20px" }}
                      color="light"
                    />
                  </div>
                ) : (
                    "Confirm Name"
                  )}
              </Button>

              <Box mt={5}>
                {/* <Copyright /> */}
              </Box>
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
  // console.log("UPDATE PASSWORD STATE", state);
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

    updateName: (UPDATE_PASSWORD_DATA, navigate,stopLoader) =>
    dispatch(updateName(UPDATE_PASSWORD_DATA,navigate, stopLoader)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeName);
