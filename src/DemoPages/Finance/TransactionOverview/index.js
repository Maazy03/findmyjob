import React, { Fragment, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { useDispatch, useSelector } from "react-redux";
import * as utils from "../../../common/utils";
import { financeActions } from "../../../store/actions";
// import PageTitle from '../../../Layout/AppMain/PageTitle';
import { ProductListShimmer } from "../../../assets/components/shimmerComponents";

const products = [
  {
    id: "453",
    name: "Dummy Product 1",
    price: "$ 19",
    orderid: "32556"
  },
  {
    id: "74",
    name: "Dummy Product 2",
    price: "$ 67",
    orderid: "32556"
  },
  {
    id: "123",
    name: "Dummy Product 3",
    price: "$ 329",
    orderid: "32556"
  },
  {
    id: "32",
    name: "Dummy Product 4",
    price: "$ 23",
    orderid: "32556"
  }
];

const columns = [
  {
    dataField: "id",
    text: "Product ID",
    sort: true
  },
  {
    dataField: "orderid",
    text: "Order ID",
    sort: true,
    align: "center"
  },
  {
    dataField: "name",
    text: "Product Name",
    sort: true,
    filter: textFilter()
  },
  {
    dataField: "orderid",
    text: "customer",
    sort: true,
    align: "center"
  },
  {
    dataField: "orderid",
    text: "address",
    sort: true,
    align: "center"
  },
  {
    dataField: "orderid",
    text: "state",
    sort: true,
    align: "center"
  },
  {
    dataField: "orderid",
    text: "region",
    sort: true,
    align: "center"
  },
  {
    dataField: "orderid",
    text: "country",
    sort: true,
    align: "center"
  },
  {
    dataField: "orderid",
    text: "delivery_notes",
    sort: true,
    align: "center"
  },
  {
    dataField: "status",
    isDummyField: false,
    align: "center",
    text: "Status",
    formatter: (cellContent, row) => {
      return (
        <div className="d-block w-100 text-center">
          <span className="badge badge-success"> Completed</span>
        </div>
      );
    }
  },
  {
    dataField: "actions",
    isDummyField: true,
    align: "center",
    text: "Actions",
    formatter: (cellContent, row) => {
      return (
        <div>
          <div className="d-block w-100 text-center">
            <UncontrolledButtonDropdown>
              <DropdownToggle
                caret
                className="btn-icon btn-icon-only btn btn-link"
                color="link"
              >
                <i className="lnr-menu-circle btn-icon-wrapper" />
              </DropdownToggle>
              <DropdownMenu
                right
                className="rm-pointers dropdown-menu-hover-link"
              >
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>
                  <i className="dropdown-icon lnr-inbox"> </i>
                  <span>Menus</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="dropdown-icon lnr-file-empty"> </i>
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="dropdown-icon lnr-book"> </i>
                  <span>Actions</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className="dropdown-icon lnr-picture"> </i>
                  <span>Dividers</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
      );
    }
  }
];

const defaultSorted = [
  {
    dataField: "name",
    order: "desc"
  }
];

const TransactionOverview = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  // state to show shimmer component
  const [stateIsLoading, setStateIsLoading] = useState(false);

  useEffect(() => {
    getTransactionsOverview();
  }, []);

  async function getTransactionsOverview() {
    try {
      setStateIsLoading(true);
      const transactions = await dispatch(
        financeActions.getTransactionsOverview(user._id)
      );
      setStateIsLoading(false);
    } catch (error) {
      utils._toast("Somthing went Wrong! in get transaction overview", "error");
      setStateIsLoading(false);
    }
  }

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
        {stateIsLoading ? (
          <ProductListShimmer />
        ) : (
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <div className="table-responsive">
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      data={products}
                      columns={columns}
                      filter={filterFactory()}
                      defaultSorted={defaultSorted}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default TransactionOverview;
