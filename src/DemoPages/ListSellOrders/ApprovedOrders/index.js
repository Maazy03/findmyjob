import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as utils from "../../../common/utils";
import { listSellActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AddProductShimmer } from "../../../assets/components/shimmerComponents";
import { makeStyles } from "@material-ui/styles";
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
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const [state, setState] = useState({ toggleId: "" });
  const [listSell, setStateListSell] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [portrait, setStateForPortraitModal] = useState([]);
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [stateSweetAlert, setStateSweetAlert] = useState({
    showProdectAddSuccessAlert: false,
    showImageLengthIssueAlert: false,
    showProductEditSuccessAlert: false,
  });

  const handleOpen = (art) => {
    setStateForPortraitModal(art);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setStateListSell(reduxOrderState.approvedOrders);
  });

  async function OnDeleteItem(id, approved) {
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
      id = deleteProductId;
      setStateIsLoading(true);
      await dispatch(listSellActions.approvedOrders(id, approved));
      let body = {
        page: 0,
        status: true,
      };
      await dispatch(listSellActions.getListingOrders(body));
      setStateIsLoading(false);
    } catch (error) {
      utils._toast("Error in enable/disable product!", "error");
      setStateIsLoading(false);
    }
  }

  function renderProductsTableRow(listSell, index) {
    return (
      <tr key={listSell._id} style={{ cursor: "pointer" }}>
        <SweetAlert
          title="Delete this order?"
          confirmButtonColor=""
          show={stateSweetAlert.message5}
          text="You will not be able to recover this order later!"
          showCancelButton
          onConfirm={(e) => OnDeleteItem(listSell._id, null)}
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
        <td className="text-center">
          <div className="widget-content p-0">
            <div className="widget-content-center">
              <Button color="success">Approved</Button>
            </div>
          </div>
        </td>
        <td className="text-center">
          <div className="widget-content p-0">
            <div className="widget-content-center">
              <Button
                color="danger"
                onClick={() => OnDeleteItem(listSell._id, "confirm")}
              >
                Delete
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
        {stateIsLoading ? (
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
                            <th className="text-center">Actions</th>
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
                    <Alert color="primary">There is no products!</Alert>
                  )}
                </Col>
              </Row>
            )}
            <TablePagination tableName="ApprovedListingOrders" />
          </Fragment>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default GridTables;
