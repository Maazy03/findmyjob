import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import * as utils from "../../../common/utils";
import { portraitActions } from "../../../store/actions";
import { serverURL } from "../../../store/common/apiCreator";
import {
  Row,
  Col,
  Nav,
  NavItem,
  Card,
  NavLink,
  Table,
  CardHeader,
  Popover,
  PopoverBody,
  Alert,
  Button,
} from "reactstrap";
import SweetAlert from "sweetalert-react";
import TablePagination from "../../../assets/components/TablePagination";
import ModalExample from "../Modal";
import { AddProductShimmer } from "../../../assets/components/shimmerComponents";

const GridTables = (props) => {
  const dispatch = useDispatch();
  const reduxOrderState = useSelector((state) => state.portrait);
  const [portraitOrders, setStateForPortraitOrders] = useState([]);
  const [portrait, setStateForPortraitModal] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setStateIsLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [stateSweetAlert, setStateSweetAlert] = useState({
    showProdectAddSuccessAlert: false,
    showImageLengthIssueAlert: false,
    showProductEditSuccessAlert: false,
  });

  const handleOpen = (portrait) => {
    setStateForPortraitModal(portrait);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setStateForPortraitOrders(reduxOrderState.requestOrders);
  });

  async function actionOrder(id, approved) {
    try {
      if (approved == "confirm") {
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
      let status = approved;
      if (approved == "null") {
        id = deleteProductId;
      }
      const result = await dispatch(portraitActions.onApproved(id, status));
      let portraitOrders = [...result];
      setStateIsLoading(false);
      if (approved != "null") {
        setStateSweetAlert((prevState) => ({
          ...prevState,
          showProdectAddSuccessAlert: true,
        }));
      }
    } catch (error) {
      console.log("check error now", error);
      if (error.responseMessage) {
        utils._toast(error.responseMessage, "error");
      }
      utils._toast("Network Error", "error");
      setStateIsLoading(false);
    }
  }

  async function onConfirmDeleteProduct() {
    try {
      setStateSweetAlert((prevState) => ({
        ...prevState,
        message5: false,
      }));
      setStateIsLoading(true);
      const requests = await dispatch(
        portraitActions.deletePortraitOrder(deleteProductId)
      );
      setStateIsLoading(false);
    } catch (error) {
      setStateIsLoading(false);
    }
  }

  function renderProductsTableRow(portrait, index) {
    return (
      <tr key={portrait._id} style={{ cursor: "pointer" }}>
        <SweetAlert
          title="Delete this order?"
          confirmButtonColor=""
          show={stateSweetAlert.message5}
          text="You will not be able to recover this order later!"
          showCancelButton
          onConfirm={(e) => actionOrder(portrait._id, "null")}
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
          onClick={() => handleOpen(portrait)}
        >
          {index + 1}
        </td>
        <td className="text-center" onClick={() => handleOpen(portrait)}>
          <img
            style={{ width: "55px", height: "75px" }}
            src={`${portrait.aboutArt.img}`}
          ></img>
        </td>
        {portrait.user && <td className="text-center">{portrait.user.name}</td>}
        <td className="text-center">{portrait.aboutArt.category}</td>
        <td className="text-center">
          <div className="widget-content p-0">
            <div className="widget-content-center">
              <Button color="success">Pending</Button>
            </div>
          </div>
        </td>
        <td className="text-center">
          <div className="widget-content p-0">
            <div className="widget-content-center">
              <Button
                color="success"
                className="mr-2"
                onClick={() => actionOrder(portrait._id, true)}
              >
                Approved
              </Button>
              <Button
                color="danger"
                onClick={() => actionOrder(portrait._id, "confirm")}
              >
                Declined
              </Button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <Fragment>
      <ModalExample toggle={open} close={handleClose} art={portrait} />
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <SweetAlert
          title="Congratulations"
          confirmButtonColor=""
          text="Order Accepted."
          show={stateSweetAlert.showProdectAddSuccessAlert}
          onConfirm={() =>
            setStateSweetAlert((prevState) => ({
              ...prevState,
              showProdectAddSuccessAlert: false,
            }))
          }
        />
        {loading ? (
          <AddProductShimmer />
        ) : (
          <Fragment>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardHeader>PORTRAIT ORDERS</CardHeader>
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
                        <th className="text-center">Name</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portraitOrders != undefined &&
                        portraitOrders.map((portrait, index) =>
                          renderProductsTableRow(portrait, index)
                        )}
                    </tbody>
                  </Table>
                </Card>
                {portraitOrders == undefined && (
                  <Alert color="primary">There is no products!</Alert>
                )}
              </Col>
            </Row>
            <TablePagination tableName="PortraitRequestOrders" />
          </Fragment>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default GridTables;
