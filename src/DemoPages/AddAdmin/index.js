import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// DASHBOARDS

// import AnalyticsDashboard from "./List";

// Layout

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions";
import AddEmail from "./AddEmail";
import List from "./List";
import Modal from "./Modal";

const AddAdmin = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${match.url}`} component={List} />
          <Route path={`${match.url}/AddEmail`} component={AddEmail} />
          <Route path={`${match.url}/Modal`} component={Modal} />
          
        </div>
      </div>
    </div>
  </Fragment>
);

export default AddAdmin;
