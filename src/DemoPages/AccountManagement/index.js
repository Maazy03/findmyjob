import React, { Fragment } from "react";
import { Route } from "react-router-dom";
// import { Table } from "reactstrap";
import Table from "./Table"

// DASHBOARDS

// import AnalyticsDashboard from "./List";

// Layout

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions";
import ChangeName from "./ChangeName";
import ChangePassword from "./ChangePassword";
import List from "./List";

const AccountManagement = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${match.url}`} component={List} />

          <Route exact path={`${match.url}/Table`} component={Table} />
          <Route exact path={`${match.url}/ChangePassword`} component={ChangePassword} />
          <Route exact path={`${match.url}/ChangeName`} component={ChangeName} />
          
          
        </div>
      </div>
    </div>
  </Fragment>
);

export default AccountManagement;
