import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { productActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "sweetalert-react";
import { AddProductShimmer } from "../../../assets/components/shimmerComponents";
import {
  Row,
  Col,
  Button,
  Card,
  Table,
  CardHeader,
  Alert,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import TablePagination from "../../../assets/components/TablePagination";
import ModalExample from "../Modal";
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment-timezone";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const GridTables = (props) => {
  const { category } = props.match.params;
  const reduxArtsState = useSelector((state) => state.product);
  const [arts, setStateForArts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [art, setStateForModalArt] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [laoding, setStateLoading] = useState(false);
  const [state, setState] = useState({
    region: "African Art",
  });

  const handleOpen = (art) => {
    setStateForModalArt(art);
    setOpen(true);
  };

  async function getData(area) {
    let region = "";
    if (area == "African Art") {
      region = "af";
    } else {
      region = "int";
    }
    let index = {
      page: 0,
      region: region,
    };
    setStateLoading(true);
    const get = await dispatch(productActions.getAuctionArts(index));
    setStateLoading(false);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const [stateSweetAlert, setStateSweetAlert] = useState({
    message5: false,
    showDeleteSuccessAlert: false,
  });

  useEffect(() => {
    setStateForArts(reduxArtsState.auctionArts.data);
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    if (value < 0) return;
    setState((prevState) => ({ ...prevState, [name]: value }));
    getData(value);
  }

  async function onEditProduct(arts) {
    props.history.push({
      pathname: "/auction/add",
      state: {
        art: arts,
      },
    });
  }

  async function onDeleteProduct(arts) {
    setStateSweetAlert((prevState) => ({
      ...prevState,
      message5: true,
    }));
    setDeleteProductId(arts._id);
  }

  console.log("check id noe=====>", deleteProductId);

  async function onConfirmDeleteProduct(id) {
    try {
      setStateSweetAlert((prevState) => ({
        ...prevState,
        message5: false,
      }));
      setStateLoading(true);
      await dispatch(productActions.deleteAuction(deleteProductId));
      let index = {
        page: 0,
        region: "af",
      };
      await dispatch(productActions.getAuctionArts(index));
      setStateLoading(false);
    } catch (error) {
      setStateLoading(false);
    }
  }

  function renderProductsTableRow(arts, index) {
    let start = arts.startDate;
    let end = arts.endDate;
    var endDate = moment(end);
    var startDate = moment(start);
    let hours = endDate.diff(startDate, "hours");
    let days = endDate.diff(startDate, "days");
    let weeks = endDate.diff(startDate, "weeks");
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
            src={arts.img[0]}
          ></img>
        </td>
        <td className="text-center">{arts.title}</td>
        <td className="text-center">
          {arts.highestBid ? arts.highestBid : "Not Placed"}
        </td>
        <td className="text-center">
          <Moment>{arts.startDate}</Moment>
        </td>
        <td className="text-center">
          <Moment>{arts.endDate}</Moment>
        </td>
        <td className="text-center">
          <Moment durationFromNow>{arts.startDate}</Moment>
        </td>
        <td className="text-center">
          {arts.auctionComplete ? "Completed" : "Not Complete"}
        </td>
        <td
          className={`${arts.auctionComplete ? "text-center" : "text-nowrap"}`}
        >
          <div className="widget-content p-0">
            <div className="widget-content-center">
              {!arts.auctionComplete && (
                <Button
                  color="success"
                  className="mr-2"
                  onClick={() => onEditProduct(arts)}
                >
                  Edit
                </Button>
              )}
              <Button color="danger" onClick={() => onDeleteProduct(arts)}>
                Delete
              </Button>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  const { region } = state;
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
        {laoding ? (
          <AddProductShimmer />
        ) : (
          <Fragment>
            <Row>
              <Col md="12" lg="12">
                <Card className="main-card mb-3">
                  <CardHeader
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item md={3} lg={3}>
                      {category} Arts
                    </Grid>
                    <Grid
                      container
                      md={4}
                      lg={4}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Grid
                        item
                        md={6}
                        lg={6}
                        style={{
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Label
                          for="exampleSelect"
                          style={{
                            textAlign: "center",
                            marginTop: "7px",
                          }}
                        >
                          Select Region
                        </Label>
                      </Grid>
                      <Grid item md={6} lg={6} style={{ marginTop: "15px" }}>
                        <FormGroup>
                          <Input
                            onChange={onChangeHandler}
                            required
                            defaultValue=""
                            type="select"
                            name="region"
                            value={state.region}
                            id="exampleSelect"
                          >
                            <option>African Art</option>
                            <option>International Art</option>
                          </Input>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </CardHeader>
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
                        <th className="text-center">Highest Bid</th>
                        <th className="text-center">Start Date</th>
                        <th className="text-center">End Date</th>
                        <th className="text-center">Duration</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Actions</th>
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
            <TablePagination tableName="auction" area={region} />
          </Fragment>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default GridTables;
