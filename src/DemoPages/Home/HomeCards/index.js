import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Container, Button } from "reactstrap";

import avatar2 from "../../../../src/assets/utils/images/avatars/2.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch, connect } from "react-redux";
import { getAllSchools } from "../../../store/actions/schoolActions";
import AddSchoolModal from "./AddSchoolModal";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  mainCardLayout: {
    backgroundColor: "white",
    height: 100,
    marginBottom: 10,
    marginTop: 10,
    textDecoration: "none",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    cursor: "pointer",
    transition: "all 0.3s cubic- bezier(.25, .8, .25, 1)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    borderRadius: 12,
    "&:hover": {
      // background: "#2057a8",
      // transition: "1.5s",
      // cursor: "pointer",
      textDecoration: "none",
      color: "white !important",
      // transform: "rotate(60deg)",
      // boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    },
  },

  schoolPaymentStatus: {
    height: 22,
    width: 155,
    backgroundColor: "#2057a8",
  },
  schoolPaymentStatus2: {
    height: 80,
    width: 305,
    backgroundColor: "#2A8FFF",
    borderRadius: 8,
    marginRight: 10,
  },
  innerLayout: {
    flexDirection: "column",
    backgroundColor: "purple",
    width: 20,
  },
  innerRowsHeading: {
    marginTop: 30,
    color: "white",
    marginBottom: 30,
    textDecoration: "none",
    marginLeft: 10,
    width:"100%"
  },
  heading: {
    color: "black",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: 200,
  },

  innerRows: {
    // flexDirection:"column",
    display: "flex",
    // marginTop:10,
    // flexGrow:1,
    justifyContent: "flex-start",
    color: "white",
    marginLeft: 40,
    textDecoration: "none",
  },
  innerRowsName: {
    // flexDirection:"column",
    display: "flex",
    // marginTop:10,
    // flexGrow:1,
    justifyContent: "flex-start",
    color: "white",
    // width:150,
    marginLeft: 40,
    // textDecoration: "none",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },

  addSchool: {
    width: "50px",
    height: "50px",
    padding: "6px 0px",
    borderRadius: "25px",
    textAlign: "center",
    // fontSize: "25px",
    marginTop: "60vh",
    marginLeft: "87vw",
    position: "fixed",
    zIndex: "1",
    // lineHeight: "1.42857",
  },

  upperCard: {
    width: 200,
    height: 80,
    backgroundColor: "white",

    alignContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  upperCardInnerRowsHeading: {
    color: "white",
    marginBottom: 0,
    textDecoration: "none",
  },
  upperCardlowerButton: {
    height: 80,
    width: 150,
    backgroundColor: "#2A8FFF",
    borderRadius: 10,
    marginBottom: 10,
  },
}));

function HomeCards(props) {
  const [schoolCount, setSchoolCount] = useState("");
  const [searchSchool, setSearchSchool] = useState("");

  const classes = useStyles();

  return (
    <Fragment>
      <Container fluid style={{ backgroundColor: "purple" }}>
        <div
          style={{
            display: "flex",
            // justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Row className="m-2">
            <div style={{ position: "relative", top: 5 }}>
              <p>Finances</p>
            </div>
          </Row>
          <Row className="m-2" style={{justifyContent:"space-around"}}>
            <Col sm="12" md="2" lg="2" xl="2">
              <Card
                className="profile-responsive"
                className={classes.upperCard}
              >
                <div className={classes.upperCardInnerRowsHeading}>
                  <p
                    style={{ color: "black", fontSize: 10 }}
                    class="mb-0"
                    className={`text-center ${classes.heading}`}
                  >
                    {" "}
                    Todays profit from Job Seekers
                  </p>
                </div>
                <div className={classes.upperCardlowerButton}>
                  <div style={{position:"relative",top:10, alignContent: "center",textAlign:"center"}}>
                    <p style={{ textAlign: "center", color: "white" }}>EURO</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="12" md="2" lg="2" xl="2">
              <Card
                className="profile-responsive"
                className={classes.upperCard}
              >
                <div className={classes.upperCardInnerRowsHeading}>
                  <p
                    style={{ color: "black", fontSize: 10 }}
                    class="mb-0"
                    className={`text-center ${classes.heading}`}
                  >
                    {" "}
                    Todays profit from Job Seekers
                  </p>
                </div>
                <div className={classes.upperCardlowerButton}>
                  <div style={{ alignItems: "center", alignContent: "center" }}>
                    <p style={{ textAlign: "center", color: "white" }}>EURO</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="12" md="2" lg="2" xl="2">
              <Card
                className="profile-responsive"
                className={classes.upperCard}
              >
                <div className={classes.upperCardInnerRowsHeading}>
                  <p
                    style={{ color: "black", fontSize: 10 }}
                    class="mb-0"
                    className={`text-center ${classes.heading}`}
                  >
                    {" "}
                    Todays profit from Job Seekers
                  </p>
                </div>
                <div className={classes.upperCardlowerButton}>
                  <div style={{ alignItems: "center", alignContent: "center" }}>
                    <p style={{ textAlign: "center", color: "white" }}>EURO</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="12" md="2" lg="2" xl="2">
              <Card
                className="profile-responsive"
                className={classes.upperCard}
              >
                <div className={classes.upperCardInnerRowsHeading}>
                  <p
                    style={{ color: "black", fontSize: 10 }}
                    class="mb-0"
                    className={`text-center ${classes.heading}`}
                  >
                    {" "}
                    Todays profit from Job Seekers
                  </p>
                </div>
                <div className={classes.upperCardlowerButton}>
                  <div style={{ alignItems: "center", alignContent: "center" }}>
                    <p style={{ textAlign: "center", color: "white" }}>EURO</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="12" md="2" lg="2" xl="2">
              <Card
                className="profile-responsive"
                className={classes.upperCard}
              >
                <div className={classes.upperCardInnerRowsHeading}>
                  <p
                    style={{ color: "black", fontSize: 10 }}
                    class="mb-0"
                    className={`text-center ${classes.heading}`}
                  >
                    {" "}
                    Todays profit from Job Seekers
                  </p>
                </div>
                <div className={classes.upperCardlowerButton}>
                  <div style={{ alignItems: "center", alignContent: "center" }}>
                    <p style={{ textAlign: "center", color: "white" }}>EURO</p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      <Container fluid>
        <div style={{ position: "relative", top: 10, left: 30 }}>
          <p>Registers</p>
        </div>
        <Row className="m-3">
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <p
                  style={{ color: "black", fontSize: 12 }}
                  class="mb-0"
                  className={`text-left ${classes.heading}`}
                >
                  {" "}
                  Total Jobs
                </p>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
        </Row>
        <div style={{ position: "relative", top: 10, left: 30 }}>
          <p>Paying Customers</p>
        </div>
        <Row className="m-3">
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
        </Row>

        <div style={{ position: "relative", top: 10, left: 30 }}>
          <p>Account Types</p>
        </div>
        <Row className="m-3">
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
          <Col sm="12" md="3" lg="3" xl="3">
            <Card
              className="profile-responsive"
              className={classes.mainCardLayout}
            >
              <div className={classes.innerRowsHeading}>
                <div>
                  <p
                    style={{ color: "black", fontSize: 12 }}
                    className={`text-left ${classes.heading}`}
                  >
                    {" "}
                    Total Jobs
                  </p>
                </div>

                <h3
                  className={`text-left ${classes.heading}`}
                  style={{
                    fontWeight: 500,
                    color: "#2A8FFF",
                  }}
                >
                  220
                </h3>
              </div>
              <div className={classes.schoolPaymentStatus2}></div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default HomeCards;
