import React, { Fragment } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown
} from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import { authActions } from "../../../store/actions";
import { useHistory } from "react-router-dom";

function UserBox(props) {
  let history = useHistory();
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const loggedEmail="muhammadmaaz46@gmail.com"
  console.log("HISTORT PROPS",loggedEmail)
  
  function onLogout(props) {
    console.log("LOGOUT PROPS",props)
    dispatch(authActions.logout());
    history.push({
      pathname: "/pages/login-boxed"
    });
  }

  return (
    <Fragment>
      <div className="header-btn-lg pr-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <UncontrolledButtonDropdown>
                <DropdownToggle color="link" className="p-0">
                  <FontAwesomeIcon
                    className="ml-2 opacity-8"
                    icon={faAngleDown}
                  />
                </DropdownToggle>
                <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                  <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner bg-info">
                      <div
                        className="menu-header-image opacity-2"
                        style={{
                          backgroundImage: "url(" + city3 + ")"
                        }}
                      />
                      <div className="menu-header-content text-left">
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                              <div className="widget-heading">{user.name}</div>
                              <div className="widget-subheading opacity-8">
                                {loggedEmail}
                              </div>
                            </div>
                            <div className="widget-content-right mr-2">
                              <Button
                                className="btn-pill btn-shadow btn-shine"
                                color="focus"
                                onClick={onLogout}
                              >
                                Logout
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
            <div className="widget-content-left  ml-3 header-user-info">
              <div className="widget-heading">{user.name}</div>
              <div className="widget-subheading">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  console.log("UPDATE PASSWORD STATE LOGOUT", state);
  return {
    // loggedInEmail: state.auth.user.result.userExist.email,
    // open: state.layoutReducer.snackbarState,
    // message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    // // showAlert: (message) => dispatch(onSnackbar(message)),

    // updateName: (UPDATE_PASSWORD_DATA, navigate,stopLoader) =>
    // dispatch(updateName(UPDATE_PASSWORD_DATA,navigate, stopLoader)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBox);
