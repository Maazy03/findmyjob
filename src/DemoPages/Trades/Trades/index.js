import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as utils from "../../../common/utils";
import { productActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
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
} from "reactstrap";
import SweetAlert from "sweetalert-react";
import TablePagination from "../../../assets/components/TablePagination";
import ModalExample from "./Modal";

const GridTables = (props) => {
  const { category } = props.match.params;
  const reduxArtsState = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [state, setState] = useState({ toggleId: "" });
  const [arts, setStateForArts] = useState([]);
  const [art, setStateForModalArt] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = (art) => {
    setStateForModalArt(art);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [stateSweetAlert, setStateSweetAlert] = useState({
    message5: false,
    showDeleteSuccessAlert: false,
  });

  const [stateProductIdForDelete, setStateProductIdForDelete] = useState({
    productId: "",
    index: null,
  });

  useEffect(() => {
    setStateForArts(reduxArtsState.tradeArts);
  });

  function resetProductDropdownMenu() {
    setState({ toggleId: "" });
  }

  function togglePop(toggleId) {
    if (state.toggleId !== toggleId) {
      setState({ toggleId });
    } else {
      resetProductDropdownMenu();
    }
  }

  function renderProductsTableRow(arts, index) {
    return (
      <tr key={arts._id} style={{ cursor: "pointer" }}>
        <td
          className="text-center text-muted"
          style={{ cursor: "pointer" }}
          onClick={() => handleOpen(arts)}
        >
          {index + 1}
        </td>
        <td className="text-center" onClick={() => handleOpen(arts)}>
          <img
            style={{ width: "55px", height: "75px" }}
            src={`${arts.img[0]}`}
          ></img>
        </td>
        <td className="text-center">{arts.title}</td>
        <td className="text-center">{arts.initialOffering}</td>
        <td className="text-center">{arts.totalUnits}</td>
        <td className="text-center">{arts.unitsLeft}</td>
        <td className="text-center">{arts.perUnitValue}</td>
      </tr>
    );
  }
  return (
    <Fragment>
      <ModalExample toggle={open} close={handleClose} art={art} />
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Fragment>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>{category}Trade</CardHeader>
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
                      <th className="text-center">Art</th>
                      <th className="text-center">Title</th>
                      <th className="text-center">Initial Offerings</th>
                      <th className="text-center">Total Units</th>
                      <th className="text-center">Units Left</th>
                      <th className="text-center">Unit Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arts != undefined &&
                      arts.map((arts, index) =>
                        renderProductsTableRow(arts, index)
                      )}
                  </tbody>
                </Table>
              </Card>
              {arts == undefined && (
                <Alert color="primary">There is no products!</Alert>
              )}
            </Col>
          </Row>
          <TablePagination tableName="trade" />
        </Fragment>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default GridTables;
