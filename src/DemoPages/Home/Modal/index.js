import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { revokeSchool } from "../../../store/actions/schoolActions";
import { withRouter } from "react-router-dom";

function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  // console.log("PROPS",props)

  // toggle = toggle.bind(;

  useEffect(() => {
    setId(props.id);
    // console.log("Props.id",props.id)
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
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
              No I want to go back
            </Button>
            <Button
              color="primary"
              onClick={() => {
                props.getRevokedSchoolAction({ schoolId: id });
                toggle();
                props.history.push("/home/list");
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
  // console.log("REVOKED SKOOL :", state);
  return {
    //   schoolId: ownProps.match.params.id,
    school: state.school.allSchools,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getRevokedSchoolAction: (id) => dispatch(revokeSchool(id)),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModalExample)
);
