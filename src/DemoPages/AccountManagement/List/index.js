import React, { Component, Fragment, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomizedTables from "../Table";
import ChangePassword from "../ChangePassword/index";
import ChangeName from "../ChangeName/index";
import Table from "../Table/index";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  CardHeader,
  CardFooter,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Container,
} from "reactstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  titleTab: {
    fontSize: 90,
    fontFamily: "Dancing Script",
    borderBottomColor: "blue",
  },
  // image: {
  //   backgroundImage: `url(${Art_Img})`,
  //   backgroundRepeat: "no-repeat",
  //   backgroundColor:
  //     theme.palette.type === "dark"
  //       ? theme.palette.grey[900]
  //       : theme.palette.grey[50],
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  // },
  // paper: {
  //   margin: theme.spacing(8, 4),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  // form: {
  //   width: "100%", // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
  // title: {
  //   flexGrow: 1,
  //   fontFamily: "Dancing Script",
  //   cursor: "pointer",
  // },
  // alreadyVerified:{
  //   justifyContent:'flex-end',
  //   // backgroundColor:'red',
  //   textAlign:'right'
  // }
}));
export default function List(props) {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    console.log("TAB VAL", tab);
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Card tabs="true" className="mb-3">
          <CardHeader>
            <Nav justified>
              <NavItem>
                <NavLink
                  //  className={classnames({active: activeTab === '1'})}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Admins
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  //  className={classnames({active:activeTab === '2'})}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Change Password
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  //  className={classnames({active:activeTab === '3'})}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Change Name
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>
          <CardBody>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1" onEnter={{color:"red"}}>
                <Table />
              </TabPane>
              <TabPane tabId="2">
                <ChangePassword history={props.history} />
              </TabPane>
              <TabPane tabId="3">
                <ChangeName history={props.history} />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
}
