import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { addSchool } from "../../../store/actions/schoolActions";
import Button from "@material-ui/core/Button";
import * as utils from "../../../common/utils";
import { Spinner } from "reactstrap";

// import { unrevokeSchool } from "../../../store/actions/schoolActions";
// import { withRouter } from "react-router-dom";
import "./Modal.css";
function ModalExample(props) {
  const [modal, setModal] = useState(false);
  // const [email, setEmail] = useState();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({ email: ""});
  const [stateIsEmailValid, setStateIsEmailValid] = useState(false);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);

  useEffect(() => {
    // setId(props.id);
    // console.log("Props.id",props.id)
  }, []);

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
      case "email":
        let emailValid = state.email === "" ? false : stateIsEmailValid;
        emailValid = utils.isEmailValid(value);
        setStateIsEmailValid(emailValid);
        validateForm();
        break;

      // case "password":
      //   let passwordValid = utils.isPasswordValid(value);
      //   setStateIsPasswordValid(passwordValid);
      //   validateForm();
      //   break;

      // default:
      //   break;
    }
  }

  function validateForm() {
    let emailValid = false,
      passwordValid = false;
    emailValid = utils.isEmailValid(state.email);
    // passwordValid = utils.isPasswordValid(state.password);
    setStateIsFormValid(emailValid);
  }

  const toggle = () => {
    setModal(!modal);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    setStateLoader(true);

    const SCHOOL_DATA = {
      email:state.email
    }

    // console.log("SCHOOL_DATA", SCHOOL_DATA)

    props.addingSchool(SCHOOL_DATA, () => {
      props.history.push({
        pathname: "/",
        // state: { email:state.email }
      });
    }, () => setStateLoader(false),
           ()=>toggle() );
    setState({email:""})
  };
  {
    return (
      <span className="d-inline-block mb-2 mr-2">
        <div style={{ display: "flex", flexDirection: "column-reverse", textAlign: "center" }} className="img">
          <div>
            <p style={{ fontWeight: "bold" }}> Add School</p>
          </div>
          <div>

            <img src={require("./add.png")} height="45px" onClick={toggle} alt="Logo" />
          </div>
        </div>

        <Modal isOpen={modal} toggle={toggle} className={props.className}>
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody className="text-center">
            <h4>We will send the registration link to the School</h4>
            <TextField
               variant="outlined"
               margin="normal"
               required
              //  error={!stateIsEmailValid}
               fullWidth
               label="Email Address"
               name="email"
               autoComplete="email"
               autoFocus
               id="exampleEmail"
               placeholder="Email here..."
               value={state.email}
               helperText={stateIsEmailValid ? "" : utils.Constants.emailError}
               onChange={_onChange}
               onBlur={onBlurHandler}
               invalid={!stateIsEmailValid}
               valid={state.email ? stateIsEmailValid : false}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              fullWidth
              style={{width:"94%"}}
              variant="contained"
              color="primary"
              className="mx-auto"
              // size="lg"
              // color="info"
              onClick={handleSubmit}
              disabled={!state.email || stateLoader || !stateIsEmailValid }
            >
               {stateLoader ? (
                <div style={{ width: "130px" }}>
                  <Spinner
                    style={{ width: "20px", height: "20px" }}
                    color="light"
                  />
                </div>
              ) : (
                  "Confirm"
                )}
              
            </Button>
            {/* <Button
              color="primary"
              onClick={() => {
                props.getUnrevokedSchoolAction({ schoolId: props.id });
                toggle();
                // props.history.push("/home/list");
              }}
            >
              Confirm
            </Button>{" "} */}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("ADDING SCHOOL :", state);
  return {
    // school: state.school.allSchools,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addingSchool: (email, navigate, stopLoader,toggle) => dispatch(addSchool(email, navigate, stopLoader,toggle)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalExample);
