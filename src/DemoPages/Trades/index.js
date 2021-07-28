import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Forms
import Trades from "./Trades";
// Layout
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions/";

const Forms = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${match.url}/all`} component={Trades} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Forms;