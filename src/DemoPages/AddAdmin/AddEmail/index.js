import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { useSelector, useDispatch } from "react-redux";
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
import Modal from "../Modal";

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
    width: "50%"

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
const AddEmail = (props) => {
  const user = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({ email: "" });
  const [stateIsEmailValid, setStateIsEmailValid] = useState(true);

  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false)

  // console.log("ADD EMAIL ROPS", props)
  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  
  };

  function onBlurHandler(event) {
    const { name, value } = event.target;
    validateField(name, value);
  }


  function validateField(fieldName, value) {
    switch (fieldName) {
      case "email":
        let emailValid = state.email === "" ? false : stateIsEmailValid;
        emailValid = utils.isEmailValid(value);
        setStateIsEmailValid(emailValid);
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

    setStateIsFormValid(emailValid);
  }

  const handleSubmit = (e) => {
    // setStateLoader(true);

    // e.preventDefault();

    // const UPDATE_NAME_DATA = {
    //   name:state.newName
    //   // email: loggedinEmail,
    //   // password: state.oldPassword,
    //   // newPassword: state.newPassword,
    // };

    // console.log("UPDATE NAME INDEX", UPDATE_NAME_DATA);
    // props.updateName(
    //   UPDATE_NAME_DATA,
    //   () => {
    //     props.history.push({
    //       pathname: "/dashboards",
    //     });
    //   },
    //   () => setStateLoader(false)
    // );


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
          <Card className="main-card mb-3" style={{justifyContent:"center"}}>
          <CardBody >
            <CardTitle style={{ textAlign: "center" }}>ADD ADMIN</CardTitle>

            <div style={{display:"flex",justifyContent:"center"}}>

            <form className={classes.form} noValidate>

              <TextField
                variant="outlined"
                margin="normal"
                required
                error={!stateIsEmailValid}
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                id="exampleEmail"
                placeholder="Email here..."
                value={state.email}
                helperText={stateIsEmailValid ? "" : utils.Constants.emailError}
                onChange={onChange}
                onBlur={onBlurHandler}
                invalid={!stateIsEmailValid}
                valid={state.email ? stateIsEmailValid : false}
              />
              
             {/* <div style={{ textAlign: "center", justifyContent: "center", width: "102%" }}> */}
                  {/* <Button onClick={onAddAdmin} /> */}
                  {stateLoader ? (
                    <div style={{ width: "130px" }}>
                      <Spinner
                        style={{ width: "20px", height: "20px" }}
                        color="light"
                      />
                    </div>
                  ) : (
                      //   <Button type="button" disabled={!stateIsEmailValid} onClick={onAddAdmin}>

                      <Modal
                        disabled={!stateIsEmailValid || !state.email }
                        buttonVal={"CONFIRM NEW ADMIN"}
                        email={state.email}
                        history={props.history}
                      // style={{ textAlign: "center" }}
                      // clearState={onAddAdmin}
                      />
                      //   </Button>
                    )}
                  {/* </div> */}

              <Box mt={5}>
                {/* <Copyright /> */}
              </Box>
            </form>
          </div>
          </CardBody>
          </Card>

        </Container>

      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default AddEmail;
