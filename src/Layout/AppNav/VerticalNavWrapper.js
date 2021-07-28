import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

// import Art_Img from "../../../assets/img/Reserves1.jpg";
import Art_Img from "../../assets/img/Reserves1.jpg";
import {
  MainNav,
  ComponentsNav,
  FormsNav,
  WidgetsNav,
  ChartsNav,
} from "./NavItems";

class Nav extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={Art_Img}
              style={{ width: 150, height: 150 }}
              class="rounded-circle"
              alt="Responsive image"
            />
          </div>
          <div>
            <p className="display-6" style={{ textAlign: "center" }}>
              JOHN MITCHELL
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div
                style={{
                  height: 5,
                  width: 5,
                  backgroundColor: "green",
                  borderRadius: 100,
                  marginTop: 10,
                  marginRight: 4,
                }}
              />
              <p className="display-6" style={{ textAlign: "center" }}>
                Online
              </p>
            </div>
          </div>
        </div>
        <MetisMenu
          content={MainNav}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);
