import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { productActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card, Table, CardHeader, Alert } from "reactstrap";
import SweetAlert from "sweetalert-react";
import TablePagination from "../../../assets/components/TablePagination";
import ModalExample from "./Modal";
import { AddProductShimmer } from "../../../assets/components/shimmerComponents";

const GridTables = (props) => {
  const { category } = props.match.params;
  const reduxArtsState = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [arts, setStateForArts] = useState([]);
  const [art, setStateForModalArt] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [loading, setStateLoading] = useState(false);

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

  useEffect(() => {
    setStateForArts(reduxArtsState.reserveArts);
  });

  async function onDeleteProduct(id) {
    setStateSweetAlert((prevState) => ({
      ...prevState,
      message5: true,
    }));
    setDeleteProductId(id);
  }

  function onEditProduct(arts) {
    props.history.push({
      pathname: "/reserve/add",
      state: {
        art: arts,
      },
    });
  }

  async function onConfirmDeleteProduct() {
    try {
      console.log("check product id now", deleteProductId);
      setStateSweetAlert((prevState) => ({
        ...prevState,
        message5: false,
      }));
      setStateLoading(true);
      let get = await dispatch(
        productActions.deleteReserveArt(deleteProductId)
      );
      setStateForArts(get.data);
      setStateLoading(false);
    } catch (error) {
      console.log("check error now", error);
      setStateLoading(false);
    }
  }

  function renderProductsTableRow(arts, index) {
    return (
      <tr key={arts._id} style={{ cursor: "pointer" }}>
        <SweetAlert
          title="Are you sure?"
          confirmButtonColor=""
          show={stateSweetAlert.message5}
          text="You will not be able to recover this product later!"
          showCancelButton
          onConfirm={(e) => onConfirmDeleteProduct(arts._id)}
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
        <td className="text-center">{arts.perUnitValue.toFixed(2)}$</td>
        <td className="text-center">
          <div className="widget-content p-0">
            <div className="widget-content-center">
              <Button
                color="success"
                className="mr-2"
                onClick={() => onEditProduct(arts)}
              >
                Edit
              </Button>
              <Button color="danger" onClick={() => onDeleteProduct(arts._id)}>
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
      <ModalExample toggle={open} close={handleClose} art={art} />
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
                  <CardHeader>{category}Reserve</CardHeader>
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
                        <th className="text-center">Action</th>
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
            <TablePagination tableName="reserve" />
          </Fragment>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default GridTables;
