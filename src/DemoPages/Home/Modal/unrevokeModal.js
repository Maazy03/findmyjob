import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { unrevokeSchool } from "../../../store/actions/schoolActions";
import { withRouter } from "react-router-dom";
function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [count, setCount] = useState(0)
  // console.log("PROPS COUNT", props)

  // toggle = toggle.bind(;

  useEffect(() => {
    setId(props.id);
    // console.log("Props.id", props.id)
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (schId, id) => {

    //  setCount(count+1)
    //   props.onCountChange(count)
    props.getUnrevokedSchoolAction({ schoolId: schId },
      () => {
        props.history.push({
          pathname: "/"
        });
      }, async () => {
        // console.log("REMCS", id)
        props.removeSchool(id)
      }
    );
    // props.removeSchool({ schoolId: props.id });

    toggle();
    props.history.push("/home/RevokedSchools");
  }


  // props.onCountChange(count)

  {
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Button color="primary" onClick={toggle}>
          {props.buttonVal}
        </Button>
        <Modal isOpen={modal} toggle={toggle} className={props.className}>
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>{props.text}</ModalBody>
          <ModalFooter>
            <Button color="link" onClick={toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                handleSubmit(props.id, id)
              }}
            >
              Confirm
                          </Button>{" "}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("UN REVOKED SKOOL :", state);
  return {
    //   schoolId: ownProps.match.params.id,
    school: state.school.allSchools,
  };
};
function mapDispatchToProps(dispatch) {
  // console.log("REMOVE SCJPPOLL",id),
  return {
    getUnrevokedSchoolAction: (id, removeSchool, navigate) => dispatch(unrevokeSchool(id, removeSchool, navigate)),
    removeSchool: (id) => dispatch({ type: "REMOVE_SCHOOL", payload: id }),

  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModalExample)
);
