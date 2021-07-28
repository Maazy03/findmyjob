import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Forms
import ArtList from "./ArtList";
import GeneralArt from "./GeneralArt";
import MasterpieceArt from "./MasterpieceArt";
import AddArt from "./AddArt";

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
          <Route path={`${match.url}/category/all`} component={ArtList} />
          <Route path={`${match.url}/category/general`} component={GeneralArt} />
          <Route path={`${match.url}/category/masterpiece`} component={MasterpieceArt} />
          <Route path={`${match.url}/add`} component={AddArt} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Forms;