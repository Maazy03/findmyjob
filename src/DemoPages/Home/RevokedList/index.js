import React, { useState, useEffect, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody } from "reactstrap";
import { getAllSchools } from "../../../store/actions/schoolActions";
import { useSelector, useDispatch, connect } from "react-redux";
import { Loader as Load } from "react-loaders";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import Modal from "../Modal/unrevokeModal";
import PageTitle from "../../../Layout/AppMain/PageTitle";


// const onCountChange

// console.log("ON CHANGE", onCountChange)
const Table = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState("")
const [counter, setCounter] = useState(0)

// const changeCounter=(count)=>{
//   console.log('onnnnn')
//   setCounter(count)
//   console.log("PARENT",count)
// }

  useEffect(() => {
    const sakool = async () => {
      const res = await props.getAllSchoolAction();
      // console.log("USE EFFECT REVOKED LIST GET ALL SCHOOLS ")
      setChange(res)
      setLoading(false)
      // console.log(props.school.allSchools);
      const array = [];
      res.map((ans) => {
        if (ans.revoked === true && ans.name) {
          array.push({
            id: ans._id,
            Reg: ans.regNo,
            name: ans.name,
            Email: ans.email,
          });
        }
      });
      // console.log("RESaaaaaaaaaaPONSR REV:", data);
      setData(array);
      // console.log("RESPONSR REV:", res);
    };

    sakool();
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 1000);
  // }, []);
  const columns = [
    {
      dataField: "Reg",
      text: "Reg.No",
      // sort: true,
    },
    {
      dataField: "name",
      text: "School Name",
      // sort: true,
    },
    {
      dataField: "Email",
      text: "Email Address",
      sort: true,
      // align: "center",
    },

    {
      dataField: "actions",
      isDummyField: true,
      align: "center",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <div>
            {/* {console.log(row)} */}
            <div className="d-block w-100 text-center">
              <div style={{ marginTop: "6px", marginBottom: "-4px" }}>

                <Modal
                  // count={data.length}
                  // onCountChange={changeCounter}
                  buttonVal={"Unrevoke"}
                  text={"Are you sure you want to remove it from revoke?"}
                  id={row.id}
                />
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  return (
    <Fragment>
      <PageTitle
        heading="Grid Tables"
        subheading="Basic example of a React table with sort, search and filter functionality."
        icon="pe-7s-notebook icon-gradient bg-mixed-hopes"
      />
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                <div className="table-responsive">
                  {
                    loading ?
                      // console.log("LAODNG",loading)
                      (
                        <div style={{ textAlign: "center" }}>
                          <Load type="ball-pulse" />
                        </div>
                      ) :
                      data.length !== 0 ? (
                        <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={data}
                          columns={columns}
                          filter={filterFactory()}
                          defaultSorted={defaultSorted}
                        />
                      ) : (
                          <div style={{ textAlign: "center" }}>
                            <p>NO SCHOOLS FOUND</p>
                          </div>
                        )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  // console.log("ALL SKOOL :", state);
  return {
    school: state.school,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSchoolAction: () => dispatch(getAllSchools()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
