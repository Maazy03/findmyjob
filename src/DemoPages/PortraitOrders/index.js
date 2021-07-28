import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Forms
import ApprovedOrders from "./ApporvedOrders";
import RequestOrders from "./RequestOrders";

// Layout
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions";

const Orders = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route
            path={`${match.url}/approved`}
            component={ApprovedOrders}
          />
             <Route
            path={`${match.url}/request`}
            component={RequestOrders}
          />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Orders;
