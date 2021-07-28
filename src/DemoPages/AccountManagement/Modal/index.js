import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { removeSuperAdmin } from "../../../store/actions/authActions";
// import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  let history = useHistory();
  const [stateLoader, setStateLoader] = useState(false);


  console.log("PROPS",props)

  // toggle = toggle.bind(;

  useEffect(() => {
    setId(props.id);
    // console.log("Props DELE SUPER ADMIN id",props.id)
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  {
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Button color="primary" onClick={toggle}>
          Remove
        </Button>
        <Modal isOpen={modal} toggle={toggle} className={props.className}>
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>Do you want to remove this Admin permanently</ModalBody>
          <ModalFooter>
            <Button color="link" onClick={toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setStateLoader(true);

                props.removeSuperAdmin({ id: props.id },
                  () => {
                    history.push({
                      pathname: "/accountmanagement/list",
                    });
                  },
                  () => setStateLoader(false)
                  );
                toggle();
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
// export default ModalExample;

const mapStateToProps = (state) => {
  // console.log("UN REVOKED SKOOL :", state);
  return {
      // schoolId: ownProps.match.params.id,
    school: state.school.allSchools,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    removeSuperAdmin: (id,navigate,stopLoader) => dispatch(removeSuperAdmin(id,navigate,stopLoader)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalExample)

