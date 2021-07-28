import React, { useState, Fragment, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col } from "reactstrap";
import Modal from "../Modal";
import { getAllAdmins } from "../../../store/actions/authActions";
import { useSelector, useDispatch, connect } from "react-redux";
import { Loader as Load } from "react-loaders";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const columns = [
  {
    dataField: "id",
    text: "S.No",
    // sort: true,
  },
  {
    dataField: "name",
    text: "Name",
    // sort: true,
  },
  {
    dataField: "email",
    text: "Email Address",
    // sort: true,
    // align: "center",
  },
  {
    dataField: "actions",
    isDummyField: true,
    align: "center",
    text: "Actions",
    formatter: (cellContent, row) => {
      console.log("RPW",row)
      return (
        <div>
          <div style={{marginTop:"6px",marginBottom:"-4px"}}>
            <Modal
              buttonVal={"Remove"}
              text={"Are you sure you want to remove it from admin?"}
              id={row.id}
              // history={props.history}
            />
          </div>
        </div>
      );
    },
  },
];

const defaultSorted = [
  {
    dataField: "name",
    order: "desc",
  },
];

const Table = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sakool = async () => {
      // console.log("AWAIT ",props)
      const res = await props.getAllAdminAction();
      // console.log(res);
      //   console.log(props.admin);
      var count = 0

      var array = [];
      var response=res.filter((ans,index) => !ans.deleted);
      console.log("RESaaaaaaaaaaPONSR REV:", response);
      response.map((ans,index) =>
      { 
  
         array.push({
           id:ans._id,
           email: ans.email,
           name: ans.name,
         });
        
        
        })
      setData(array);
      console.log("RESPONSR REV:", res);
    };

    sakool();
  }, [props]);

  return (
    <Fragment>
      {/* <PageTitle
                heading="Grid Tables"
                subheading="Basic example of a React table with sort, search and filter functionality."
                icon="pe-7s-notebook icon-gradient bg-mixed-hopes"
            /> */}
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
            {/* <Card className="main-card mb-3">
                            <CardBody> */}
            <div className="table-responsive">
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={data}
                columns={columns}
                filter={filterFactory()}
                defaultSorted={defaultSorted}
              />
            </div>
            {/* </CardBody>
                        </Card> */}
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  // console.log("ALL Admin :", state);
  return {
    admin: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAdminAction: () => dispatch(getAllAdmins()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
