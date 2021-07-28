import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { productActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  CardHeader,
  Button,
  Alert,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import SweetAlert from "sweetalert-react";
import TablePagination from "../../../assets/components/TablePagination";
import { AddProductShimmer } from "../../../assets/components/shimmerComponents";
import ModalExample from "../Modal";

const GridTables = (props) => {
  const reduxArtsState = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [arts, setStateForArts] = useState([]);
  const [art, setStateForModalArt] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [state, setState] = useState({
    region: "African Art",
  });

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

  const [loading, setStateLoading] = useState(false);

  useEffect(() => {
    console.log("yes i am called");
    setStateForArts(reduxArtsState.allArts);
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    if (value < 0) return;
    setState((prevState) => ({ ...prevState, [name]: value }));
    getData(value);
  }

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
    let get = await dispatch(productActions.getAllArts(index));
    setStateForArts(get.data);
    setStateLoading(false);
  }

  function onEditProduct(arts) {
    props.history.push({
      pathname: "/arts/add",
      state: {
        art: arts,
        category: "all",
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

  async function onConfirmDeleteProduct() {
    try {
      setStateSweetAlert((prevState) => ({
        ...prevState,
        message5: false,
      }));
      setStateLoading(true);
      let index = {
        page: 0,
        region: "African Art",
      };
      const requests = await dispatch(
        productActions.deleteArt(deleteProductId)
      );
      let get = await dispatch(productActions.getAllArts(index));
      setStateForArts(get.data);
      setStateLoading(false);
    } catch (erro) {
      setStateLoading(false);
    }
  }
  const { region } = state;

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
            src={arts.img[0]}
          ></img>
        </td>
        <td className="text-center">{arts.title}</td>
        <td className="text-center">{arts.price}</td>
        <td className="text-center">{arts.category}</td>
        {arts.seller != null ? (
          <td className="text-center">{arts.seller.email}</td>
        ) : (
          <td className="text-center">Admin</td>
        )}
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
              <Button color="danger" onClick={() => onDeleteProduct(arts)}>
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
                  <CardHeader
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item md={3} lg={3}>
                      All Arts
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
                            id="exampleSelect"
                            value={state.region}
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
                        <th className="text-center">Price</th>
                        <th className="text-center">Category</th>
                        <th className="text-center">Own</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arts.data != undefined &&
                        arts.data.map((arts, index) =>
                          renderProductsTableRow(arts, index)
                        )}
                    </tbody>
                  </Table>
                </Card>
                {arts.data == undefined && (
                  <Alert color="primary">There is no products!</Alert>
                )}
              </Col>
            </Row>
            <TablePagination tableName={"all"} area={region} />
          </Fragment>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default GridTables;
