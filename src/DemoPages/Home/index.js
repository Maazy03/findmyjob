import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// DASHBOARDS

// import AnalyticsDashboard from "./List";

// Layout

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions";
// import onCardDetails from "./CardDetails";
import CardDetails from "./CardDetails"
import RevokedList from "./RevokedList"
import List from "./List";

const Home = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route exact path={`${match.url}/list`} component={List} />
          {/* <Route exact path={`${match.url}/details`} component={CardDetails} /> */}
          <Route exact path={`${match.url}/details/:id`} component={CardDetails} />
          <Route exact path={`${match.url}/RevokedSchools`} component={RevokedList} />
          
        </div>
      </div>
    </div>
  </Fragment>
);

export default Home;
