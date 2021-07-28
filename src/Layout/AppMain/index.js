import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import ReactSpinners from "../../assets/components/react-spinners";
import Home from "../../DemoPages/Home";
import AccountManagement from "../../DemoPages/AccountManagement";
import AddAdmin from "../../DemoPages/AddAdmin";
const Campaign = lazy(() => import("../../DemoPages/Campaign"));
const Dashboards = lazy(() => import("../../DemoPages/Dashboards"));
const Orders = lazy(() => import("../../DemoPages/Orders"));
const Arts = lazy(() => import("../../DemoPages/Arts"));
const UserPages = lazy(() => import("../../DemoPages/UserPages"));
const PortraitOrders = lazy(() => import("../../DemoPages/PortraitOrders"));
const Reserves = lazy(() => import("../../DemoPages/Reserves"));
const ListSellOrders = lazy(() => import("../../DemoPages/ListSellOrders"));
const Auction = lazy(() => import("../../DemoPages/Auction"));
const Trades = lazy(() => import("../../DemoPages/Trades"));
const Settings = lazy(() => import("../../DemoPages/Settings"));

const AppMain = () => {
  const user = useSelector((state) => state.auth.user);
  const loggedIn=true;

  return loggedIn ? (
    <Fragment>
      <Suspense fallback={<ReactSpinners />}>
        <Route path="/campaign" component={Campaign} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/arts" component={Arts} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/reserve" component={Reserves} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/auction" component={Auction} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/list_sell" component={ListSellOrders} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/portrait_orders" component={PortraitOrders} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/settings" component={Settings} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/order" component={Orders} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/trades" component={Trades} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/dashboards" component={Dashboards} />
      </Suspense>

      <Route exact path="/" render={() => <Redirect to="/home/list" />} />
      <Suspense fallback={<ReactSpinners />}>
        <Route path="/home" component={Home} />
      </Suspense>

      {/* <Route exact path="/accountmanagement" render={() => <Redirect to="/home/list" />} /> */}
      <Suspense fallback={<ReactSpinners />}>
        <Route path="/accountmanagement" component={AccountManagement} />
      </Suspense>

      {/* <Route
        exact
        path="/"
        render={() => <Redirect to="/accountmanagement/list" />}
      /> */}
  <Suspense fallback={<ReactSpinners />}>
    <Route path="/addadmin" component={AddAdmin} />
  </Suspense>

  {/* <Route exact path="/" render={() => <Redirect to="/addadmin/list" />} /> */ }

  <ToastContainer />
    </Fragment >
  ) : (
  <Fragment>
    <Suspense fallback={<ReactSpinners />}>
      <Route path="/pages" component={UserPages} />
    </Suspense>

    <Route
      exact
      path="/"
      render={() => <Redirect to="/pages/login-boxed" />}
    />
  </Fragment>
);
};

export default AppMain;
