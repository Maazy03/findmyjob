import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Layout
import CampaignForm from "./Form";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions";

const Forms = ({ match }) => {
  const user = useSelector(state => state.auth.user);

  function renderRoutes() {
    return (
      <Route path={`${match.url}/view-campaign`} component={CampaignForm} />
    );
  }
  return (
    <Fragment>
      <ThemeOptions />
      <AppHeader />
      {user.verified ? (
        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">{renderRoutes()}</div>
          </div>
        </div>
      ) : (
        <div className="app-main">
          <div className="app-main__inner">{renderRoutes()}</div>
        </div>
      )}
    </Fragment>
  );
};

export default Forms;
