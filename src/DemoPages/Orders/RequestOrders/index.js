import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as utils from "../../../common/utils";
import { orderActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { AddProductShimmer } from "../../../assets/components/shimmerComponents";
import { Row, Col, Card, Table, CardHeader, Alert, Button } from "reactstrap";
import SweetAlert from "sweetalert-react";
import TablePagination from "../../../assets/components/TablePagination";
import ModalExample from "../Modal";

const useStyles = makeStyles({
  description: {
    display: "block",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    lineHeight: "1.4em",
    maxLines: "1",
    lineClamp: "2",
  },
});

const GridTables = (props) => {
  const dispatch = useDispatch();
  const reduxOrderState = useSelector((state) => state.order);
  const [requestOrders, setStateForRequestOrders] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [loading, setStateIsLoading] = useState(false);
  const [orders, setStateForOrderModal] = useState([]);
  const [product, setStateForProductModal] = useState([]);
  const [open, setOpen] = useState(false);
  const [stateSweetAlert, setStateSweetAlert] = useState({
    message5: false,
    showDeleteSuccessAlert: false,
  });
  const layout = (n) => {
    switch (n) {
      case 1:
        return [1];
      case 2:
        return [2];
      case 3:
        return [3];
      case 4:
        return [2, 2];
      case 5:
        return [2, 3];
      default:
        return [2, 4];
    }
  };

  const handleOpen = (order, product) => {
    setStateForOrderModal(order);
    setStateForProductModal(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setStateForRequestOrders(reduxOrderState.requestOrders);
  });

  async function onAcceptOrder(id, action) {
    try {
      if (action == "confirm") {
        setDeleteProductId(id);
        setStateSweetAlert((prevState) => ({
          ...prevState,
          message5: true,
        }));
        return;
      }
      setStateSweetAlert((prevState) => ({
        ...prevState,
        message5: false,
      }));
      setStateIsLoading(true);
      if (action == "null") {
        id = deleteProductId;
      }
      await dispatch(orderActions.approvedOrder(id, action));
      await dispatch(orderActions.getPendingOrders({ page: 0, action: false }));
      setStateSweetAlert((prevState) => ({
        ...prevState,
        showProductEditSuccessAlert: true,
      }));
      setStateIsLoading(false);
    } catch (error) {
      utils._toast("Somthing went Wrong!", "error");
      setStateIsLoading(false);
    }
  }

  console.log("check now this", requestOrders);

  function renderProductsTableRow(order, index) {
    let product = order.product;
    let setting = {};
    setting = {
      width: "100%",
      height: ["0vh"],
      layout: layout(product.length),
      photos: product.map((item) => ({
        src: item.img[0],
      })),
      showNumOfRemainingPhotos: true,
    };
    return (
      <tr key={order._id} style={{ cursor: "pointer" }}>
        <SweetAlert
          title="Delete this order?"
          confirmButtonColor=""
          show={stateSweetAlert.message5}
          text="You will not be able to recover this order later!"
          showCancelButton
          onConfirm={(e) => onAcceptOrder(order._id, "null")}
          onCancel={() =>
            setStateSweetAlert((prevState) => ({
              ...prevState,
              message5: false,
            }))
          }
        />
        <td
          className="text-center text-muted"
          style={{ cursor: "pointer" }}
          onClick={() => handleOpen(order, product)}
        >
          {index + 1}
        </td>
        <td className="text-center" onClick={() => handleOpen(order, product)}>
          {product &&
            product.map((item) => {
              return (
                <img
                  style={{
                    width: "55px",
                    height: "75px",
                    padding: product.length > 1 && "5px",
                  }}
                  src={item.img[0]}
                ></img>
              );
            })}
        </td>
        <td className="text-center">{product.length}</td>
        <td className="text-center">{order.payer.email}</td>
        <td className="text-center">{order.transaction[0].amount.total}</td>
        <td className="text-center">
          {order.shippingAddress.city},{order.shippingAddress.state}
        </td>
        <td className="text-center">
          <div className="widget-content p-0">
            <div className="widget-content-center">
              <Button
                color="success"
                className="mr-2"
                onClick={() => onAcceptOrder(order._id, true)}
              >
                Accept
              </Button>
              <Button
                color="danger"
                onClick={() => onAcceptOrder(order._id, "confirm")}
              >
                Reject
              </Button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <Fragment>
      {open && (
        <ModalExample
          toggle={open}
          close={handleClose}
          order={orders}
          product={product}
        />
      )}
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        {loading ? (
          <AddProductShimmer />
        ) : (
          <Fragment>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardHeader>REQUEST ORDERS</CardHeader>
                  <Table
                    responsive
                    hover
                    striped
                    borderless
                    className="align-middle mb-0"
                  >
                    <thead>
                      <tr>
                        <th className="text-center">S.NO</th>
                        <th className="text-center">Order</th>
                        <th className="text-center">Item</th>
                        <th className="text-center">Buyer Email</th>
                        <th className="text-center">Amount</th>
                        <th className="text-center">Address</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestOrders != undefined &&
                        requestOrders.map((orders, index) =>
                          renderProductsTableRow(orders, index)
                        )}
                    </tbody>
                  </Table>
                </Card>
                {requestOrders == undefined && (
                  <Alert color="primary">There is no products!</Alert>
                )}
              </Col>
            </Row>
            <TablePagination tableName="pendingOrders" />
          </Fragment>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default GridTables;
