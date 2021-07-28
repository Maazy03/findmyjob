import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as utils from "../../../common/utils";
import { listSellActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
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
import { AddProductShimmer } from "../../../assets/components/shimmerComponents";
import TablePagination from "../../../assets/components/TablePagination";
import ModalExample from "../Modal";
import axios from "axios";

const useStyles = makeStyles({
  description: {
    display: "block",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    // maxHeight: "4.6em",
    lineHeight: "1.4em",
    maxLines: "1",
    lineClamp: "2",
  },
});

const GridTables = (props) => {
  const classes = useStyles();
  const { category } = props.match.params;
  const reduxOrderState = useSelector((state) => state.listSell);
  const dispatch = useDispatch();
  const [loading, setStateIsLoading] = useState(false);
  const [state, setState] = useState({ toggleId: "" });
  const [listSell, setStateListSell] = useState([]);
  const [portrait, setStateForPortraitModal] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [stateSweetAlert, setStateSweetAlert] = useState({
    showProdectAddSuccessAlert: false,
  });

  const handleOpen = (art) => {
    setStateForPortraitModal(art);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setStateListSell(reduxOrderState.requestOrders);
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
      if (approved == null) {
        id = deleteProductId;
      }
      await dispatch(listSellActions.approvedOrders(id, approved));
      await dispatch(
        listSellActions.getListingRequestOrders({ page: 0, status: false })
      );
      setStateIsLoading(false);
      if (approved != null) {
        setStateSweetAlert((prevState) => ({
          ...prevState,
          showProdectAddSuccessAlert: true,
        }));
      }
    } catch (error) {
      utils._toast("Error in enable/disable product!", "error");
      setState({ email: "", password: "" });
    }
  }

  function renderProductsTableRow(listSell, index) {
    return (
      <tr key={listSell._id} style={{ cursor: "pointer" }}>
        <td
          className="text-center text-muted"
          style={{ cursor: "pointer" }}
          onClick={() => handleOpen(listSell)}
        >
          {index + 1}
        </td>
        <td
          onClick={() => handleOpen(listSell)}
          className="text-center"
          onClick={() => handleOpen(listSell)}
        >
          <img
            style={{ width: "55px", height: "75px" }}
            src={listSell.aboutArt.img[0]}
          ></img>
        </td>
        <td className="text-center">{listSell.personalInformation.name}</td>
        <td className="text-center">{listSell.aboutArt.title}</td>
        <td className="text-center">{listSell.aboutArt.category}</td>
        <td className="text-center">{listSell.personalInformation.email}</td>
        <SweetAlert
          title="Delete this order?"
          confirmButtonColor=""
          show={stateSweetAlert.message5}
          text="You will not be able to recover this order later!"
          showCancelButton
          onConfirm={(e) => actionOrder(listSell._id, null)}
          onCancel={() =>
            setStateSweetAlert((prevState) => ({
              ...prevState,
              message5: false,
            }))
          }
        />
        <td className="text-center">
          <div className="widget-content p-0">
            <div className="widget-content-center">
              <Button
                color="success"
                className="mr-2"
                onClick={() => actionOrder(listSell._id, true)}
              >
                Approved
              </Button>
              <Button
                color="danger"
                onClick={() => actionOrder(listSell._id, "confirm")}
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
          text="List & Sell Accepted."
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
            {listSell != undefined && (
              <Row>
                <Col md="12">
                  {listSell.length > 0 ? (
                    <Card className="main-card mb-3">
                      <CardHeader>LIST SELL ORDERS</CardHeader>
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
                            <th className="text-center">Title</th>
                            <th className="text-center">Type</th>
                            <th className="text-center">email</th>
                            <th className="text-center">status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listSell.map((portrait, index) =>
                            renderProductsTableRow(portrait, index)
                          )}
                        </tbody>
                      </Table>
                    </Card>
                  ) : (
                    <Alert color="primary">There is no request products!</Alert>
                  )}
                </Col>
              </Row>
            )}
            <TablePagination tableName="RequestListingOrders" />
          </Fragment>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default GridTables;
