// import { TextField } from '@material-ui/core';
import React, { Fragment, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Button,
  Modal,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import * as utils from "../../../common/utils";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// import Art_Img from "../../../assets/img/Reserves1.jpeg";
import { addAdmin } from "../../../store/actions/authActions";
import Button1 from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
    justifyContent: "flex-end",
    // backgroundColor:'red',
    textAlign: "right",
  },
}));
function ModalExample(props) {
  const user = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({ newPassword: "" });
  const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  // console.log("MODAL PROPS:", props);
  const onChange = (event) => {
    const { name, value } = event.target;
    setState({ newPassword: value });
    // console.log(state.newPassword);
    // validateField(name, value);
    // setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const NewEmail = props.email;
  const LoggedEmail = props.loggedInEmail;
  // console.log("new and logged in email", NewEmail, LoggedEmail);

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
    e.preventDefault();
    setStateLoader(true);

    const CREATE_ADMIN = {
      email: NewEmail,
      password: state.newPassword,
      logEmail: LoggedEmail,
    };
    // console.log("ADMIN BHAI", CREATE_ADMIN);
    // console.log("SIGN UP PASSWORD INDEX", CREATE_ADMIN);

    props.addAdmin(
      CREATE_ADMIN,
         () => {
        history.push({
          pathname: "/",
        });
      },
      () => setStateLoader(false)
    );

    // props.clearState();

    // setModal(!modal);
  };

  const onConfirmPassword = async () => {
    // console.log("CONFIRM_ADD_ADMIN_PASSWORD", state);
    // try {
    //   setStateLoader(true);
    //   const result = await dispatch(authActions.updatePassword(state));
    //   props.history.pusg h({
    //     pathname: "/dashboards",
    //   });
    // } catch (error) {
    //   if (error.response) {
    //     utils._toast(error.response.data.responseMessage, "error");
    //   } else {
    //     utils._toast("Netwrok Error", "error");
    //   }
    // }
    setStateLoader(false);
    setState({ newPassword: "" });
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <span>
        <Button disabled={props.disabled} style={{width:"100%",marginTop:"12px"}} color="primary" onClick={toggle}>
          {props.buttonVal}
        </Button>
    
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Fragment>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <Container style={{ width: "fit-content" }}>
                {/* <Card
                  className="main-card mb-3"
                  style={{ justifyContent: "center" }}
                > */}
                <CardBody>
                  <CardTitle style={{ textAlign: "center" }}>
                    CONFIRM YOUR PASSWORD
                    </CardTitle>
                  <form className={classes.form} noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      error={!stateIsPasswordValid}
                      label="New Password"
                      type="password"
                      helperText={
                        stateIsPasswordValid
                          ? ""
                          : utils.Constants.passwordError
                      }
                      id="password"
                      // autoComplete="current-password"
                      // type="password"
                      name="newPassword"
                      placeholder="enter your password "
                      value={state.newPassword}
                      onChange={onChange}
                      // onChange={() => console.log("hello")}
                      onBlur={onBlurHandler}
                      invalid={!stateIsPasswordValid}
                      valid={state.password ? stateIsPasswordValid : false}
                    />

                    <Button1
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleSubmit}
                      disabled={state.newPassword.length <= 7 || stateLoader}

                    >
                      {stateLoader ? (
                        <div style={{ width: "130px" }}>
                          <Spinner
                            style={{ width: "20px", height: "20px" }}
                            color="light"
                          />
                        </div>
                      ) : (
                          "CONFIRM PASSWORD"
                        )}
                    </Button1>
                  </form>
                </CardBody>
                {/* </Card> */}
              </Container>
            </ReactCSSTransitionGroup>
          </Fragment>
        </ModalBody>
        {/* <ModalFooter>
                    <Button color="link" onClick={toggle}>No I want to go back</Button>
                    <Button color="primary" onClick={toggle}>Confirm</Button>{' '}
                </ModalFooter> */}
      </Modal>
    </span>
  );
}

// console.log("MODAL BOOOL",this.props.modalbool)

const mapStateToProps = (state) => {
  // console.log("confirm PASSWORD STATE", state);
  return {
    loggedInEmail: state.auth.user.result.userExist.email,
    // open: state.layoutReducer.snackbarState,
    // message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      addAdmin: (CREATE_ADMIN, navigate, stopLoader) =>
      dispatch(addAdmin(CREATE_ADMIN, navigate, stopLoader)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalExample);
