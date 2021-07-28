import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as utils from "../../../common/utils";
import { portraitActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { AddProductShimmer } from "../../../assets/components/shimmerComponents";
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const reduxOrderState = useSelector((state) => state.portrait);
  const [state, setState] = useState({ toggleId: "" });
  const [portraitOrders, setStateForPortraitOrders] = useState([]);
  const [loading, setStateIsLoading] = useState(false);
  const [portrait, setStateForPortraitModal] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [stateSweetAlert, setStateSweetAlert] = useState({
    message5: false,
    showDeleteSuccessAlert: false,
  });

  const handleOpen = (portrait) => {
    setStateForPortraitModal(portrait);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setStateForPortraitOrders(reduxOrderState.approvedOrders);
  });

  async function onAcceptOrder(id, action) {
    try {
      let tracking = {
        shipped: false,
        delivered: false,
      };
      if (action == "shipped") {
        tracking.shipped = true;
        tracking.delivered = false;
      }
      if (action == "delivered") {
        tracking.shipped = false;
        tracking.delivered = true;
      }
      if (action == "confirm") {
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
      if (action == null) {
        await dispatch(portraitActions.approvedOrders(id, action));
      } else {
        await dispatch(portraitActions.tracking(id, tracking));
      }
      await dispatch(
        portraitActions.getPortraitOrders({ page: 0, status: true })
      );
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

  function renderProductsTableRow(portrait, index) {
    return (
      <tr key={portrait._id} style={{ cursor: "pointer" }}>
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
            src={portrait.aboutArt.img}
          ></img>
        </td>
        {portrait.user && <td className="text-center">{portrait.user.name}</td>}
        <td className="text-center">{portrait.aboutArt.category}</td>
        {portrait.tracking.shipped ? (
          <td className="text-center">
            <Button color="success">Shipped</Button>
          </td>
        ) : (
          <td className="text-center">
            <Button color="success">Pending</Button>
          </td>
        )}
        <td className="text-center">
          <div className="widget-content p-0">
            <div className="widget-content-center">
              {portrait.tracking.shipped ? (
                <Button
                  color="success"
                  className="mr-2"
                  onClick={() => onAcceptOrder(portrait._id, "delivered")}
                >
                  Delivered
                </Button>
              ) : (
                <Button
                  color="success"
                  className="mr-2"
                  onClick={() => onAcceptOrder(portrait._id, "shipped")}
                >
                  Shipped
                </Button>
              )}
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
                  <Alert color="primary">There is no order!</Alert>
                )}
              </Col>
            </Row>
            <TablePagination
              tableName="PortraitOrders"
              portraitOrderStatus={true}
            />
          </Fragment>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default GridTables;
