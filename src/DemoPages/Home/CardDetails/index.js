import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Container } from "reactstrap";
import Modal from "../Modal";
import avatar2 from "../../../../src/assets/utils/images/avatars/2.jpg";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch, connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import DataTable from "../Table";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  mainCardLayout: {
    backgroundColor: "white",
    height: "fit-content",
    marginBottom: 10,
    marginTop: 10,
    // '&:hover': {
    //     background: "#2057a8",
    //     transition: "1.5s",
    //     cursor: "pointer",
    //     // transform: scale(1.5)
    // },
  },

  schoolImage: {
    width: 90,
    height: 90,
    backgroundColor: "#2057a8",
    borderRadius: 100,
    // marginLeft: 40
  },
  schoolPaymentStatus: {
    height: "fit-content",
    width: "fit-content",
    padding: "10px 30px",
    backgroundColor: "#afc8f0",
  },
  innerLayout: {
    flexDirection: "column",
  },
  column: {
    // paddingLeft: 20,
    // marginLeft: 20
  },
  innerRowsHeading: {
    // flexDirection:"column",
    marginTop: 20,
    display: "flex",
    // flexGrow:1,
    justifyContent: "flex-start",
    color: "white",
    // alignItems: "center",
    marginBottom: 30,
    // marginLeft: 25
  },
  innerRows: {
    // flexDirection:"column",
    display: "flex",
    // marginTop:10,
    // flexGrow:1,
    justifyContent: "flex-start",
    color: "white",
    // marginLeft: 20
  },
  details1: {
    marginLeft: -30
  },
  details2: {
    marginLeft: -40

  },
  alreadyVerified: {
    justifyContent: "flex-end",
    textAlign: "right",
  },
  whiteArea: {
    backgroundColor: "white",
    padding: 10,
    margin: "0px 10px 10px 10px",
    textAlign: "center",
  },
  submit: {
    justifyContent: "center",
  },
}));

function onCardDetails(props) {
  const [singleSchool, setSingleSchool] = useState([]);
  const [schoolId, setSchoolId] = useState('')

  useEffect(() => {

    var currentSchool = props.school.filter((skl) => {
      return skl._id === props.schoolId;
    });
    console.log("Current School", currentSchool[0]._id);
    setSchoolId(currentSchool[0]._id)
    setSingleSchool(currentSchool);
    // props.getSchoolPaymentHistory(currentSchool[0]._id)
  }, []);
  console.log("SAGI", schoolId)
  // startColor = '#6495ed'; // cornflowerblue
  // endColor = '#dc143c'; // crimson
  const onCardDetail = () => {
    props.history.push({
      pathname: "/pages/forgot-password-boxed",
    });
  };
  console.log("J47", singleSchool[0]);
  const classes = useStyles();
  return (
    <Fragment>
      {/* <Container> */}
      <Col>
        <Card className="profile-responsive" className={classes.mainCardLayout}>
          <div className={classes.innerLayout}>
            <Container style={{ padding: "40px 29px 0" }}>
              <Row>
                <Col>
                  <div>
                    <div
                      className={classes.innerRowsHeading}
                      style={{ justifyContent: "flex-start" }}
                    >
                      <div className={classes.schoolImage}>
                        <img
                          style={{ borderRadius: 100 }}
                          width={90}
                          height={90}
                          src={avatar2}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={classes.column}>
                  <div>
                    <div className={classes.innerRows}>
                      <p
                        className="text-left"
                        style={{
                          maxWidth: 300,
                          fontSize: 30,
                          color: "black",
                          fontWeight: 500,
                          color: "#404040"
                        }}
                      >
                        {singleSchool[0] && singleSchool[0].name}
                      </p>
                    </div>
                    <div className={classes.innerRows}>
                      <p
                        className="text-left"
                        style={{
                          fontWeight: "lighter",
                          color: "black",
                          maxWidth: 240,
                        }}
                      >
                        {singleSchool[0] && singleSchool[0].address + " " + singleSchool[0].street + "," + singleSchool[0].town}
                      </p>
                    </div>
                    <div className={classes.innerRows}>
                      <p
                        className="text-left"
                        style={{ maxWidth: 200, color: "black" }}
                      >
                        <span style={{ fontWeight: "bold", color: "#404040" }}>Reg No</span> :{" "}
                        {singleSchool[0] && singleSchool[0].regNo}
                      </p>
                    </div>

                    <div
                      className={classes.innerRows}
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "baseline",
                      }}
                    >
                      <p
                        className="text-left"
                        style={{ fontWeight: "lighter", color: "black" }}
                      >
                        {singleSchool[0] && singleSchool[0].email}
                      </p>
                    </div>
                    <div className={classes.innerRows}>
                      <p
                        className="text-left"
                        style={{ fontWeight: "lighter", color: "black" }}
                      >
                        {singleSchool[0] && singleSchool[0].ownerContact}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div className={classes.schoolPaymentStatus}>
                    {/* <p style={{ textAlign: "center", color: "white" }}>Cleared Payment</p> */}
                    <div className={classes.innerRows}>
                      <h3
                        style={{
                          maxWidth: 200,
                          color: "green",
                          marginLeft: 20,
                        }}
                      >
                        {singleSchool[0] && singleSchool[0].currentPackageName}
                      </h3>
                    </div>
                    <div className={classes.innerRows}>
                      <p
                        className="text-left"
                        style={{
                          fontWeight: "lighter",
                          color: "black",
                          marginLeft: 20,
                        }}
                      >
                        Member Since : {singleSchool[0] && moment(singleSchool[0].createdAt).format("Do  MMMM, YYYY")}
                      </p>
                    </div>
                    <div
                      className={classes.innerRows}
                      style={{
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        padding: "0px 22px",
                        color: "black",
                      }}
                    >
                      {/* <div style={{alignContent:"baseline",flexDirection:"row"}}> */}

                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "#4a4a4a" }}
                      />
                      <p className={`text-left ${classes.details1}`}>
                        : {singleSchool[0] && singleSchool[0].studentsCount ? singleSchool[0] && singleSchool[0].studentsCount : "000"}
                      </p>
                      <FontAwesomeIcon
                        icon={faBus}
                        style={{ marginLeft: "1px", color: "#4a4a4a" }}
                      />
                      <p className={`text-left ${classes.details2}`}>
                        : {singleSchool[0] && singleSchool[0].busCount ? singleSchool[0] && singleSchool[0].busCount : "000"}
                      </p>
                      {/* </div> */}
                    </div>
                    <div className={classes.innerRows}>
                      <p
                        className="text-center"
                        style={{
                          fontWeight: "lighter",
                          color: "black",
                          marginLeft: 20,
                        }}
                      >
                        <b>Auto Recursive</b>
                      </p>
                    </div>
                    <div className={classes.innerRows}>
                      <div className={classes.whiteArea}>
                        <p
                          className="text-left"
                          style={{
                            fontWeight: "light",
                            color: "red",
                            fontSize: 14,
                          }}
                        >
                          Revoke Subscription of School
                        </p>
                        <Modal
                          buttonVal={"Revoke"}
                          text={
                            " Are you sure you want to revoke their subscription?"
                          }
                          id={props.schoolId}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 26 }}>
                <Col>
                  <div className={classes.innerRows}>
                    <h2
                      style={{
                        color: "#383838",
                        fontSize: 30,
                        fontWeight: "bold",
                      }}
                    >
                      Payment History{" "}
                    </h2>
                  </div>
                </Col>
              </Row>
              <Row >
                <Col style={{ marginBottom: 80, width: "fit-content", marginTop: 10 }}>
                  {
                    singleSchool[0] && singleSchool[0].stripeCustomerId ?
                      <DataTable schoolid={schoolId} />
                      :
                      <div style={{ textAlign: "center", fontSize: 20 }}>
                        NO PAYMENT HISTORY
                  </div>
                  }

                </Col>
              </Row>
            </Container>
          </div>
        </Card>
      </Col>

      {/* </Container> */}
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log("ALL SKOOL :", ownProps);
  return {
    schoolId: ownProps.match.params.id,
    school: state.school.allSchools,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getSchoolPaymentHistory () => dispatch(getSchoolPaymentHistory()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(onCardDetails);
