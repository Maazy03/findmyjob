import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
  Button,
  Spinner
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import SweetAlert from "sweetalert-react";
import { productActions } from "../../../store/actions";
import * as utils from "../../../common/utils";

const CampaignForm = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [stateCampaign, setStateCampaign] = useState("");
  const [state, setState] = useState({ commission: "" });
  const [stateSweetAlert, setStateSweetAlert] = useState({
    showCommissionAddSuccessAlert: false
  });
  const [stateIsLoading, setStateIsLoading] = useState(false);

  useEffect(() => {
    getCampaignHandler();
  }, []);

  async function getCampaignHandler() {
    const result = await dispatch(productActions.getCampaign());
    setStateCampaign(result);
  }

  function onChangeHandler(e) {
    const { value } = e.target;
    setState({ commission: value });
  }

  async function joinCampaignHandler() {
    try {
      setStateIsLoading(true);
      const result = await dispatch(
        productActions.joinCampaign({
          _id: user._id,
          body: {
            discount: state.commission,
            category: stateCampaign.category
          }
        })
      );
      setStateIsLoading(false);
      setStateSweetAlert({ showCommissionAddSuccessAlert: true });
      setState({ commission: "" });
    } catch (error) {
      utils._toast("Something went wrong in join campaign try again!", "error");
      setStateIsLoading(false);
      setState({ commission: "" });
    }
  }

  return (
    <Fragment>
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
          show={stateSweetAlert.showCommissionAddSuccessAlert}
          text="You have joined Campaign."
          type="success"
          onConfirm={() => {
            setStateSweetAlert({
              showCommissionAddSuccessAlert: false
            });
          }}
        />

        <Container fluid>
          {stateCampaign === "" && (
            <Alert color="warning">There is no campaign available...</Alert>
          )}
          <Card className="main-card mb-3">
            <CardBody>
              <CardTitle>Campaign</CardTitle>
              <br />
              <Form>
                <FormGroup row>
                  <Label for="exampleID" sm={2}>
                    Major Category
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="vendorId"
                      id="exampleVendorId"
                      value={
                        stateCampaign && stateCampaign.category.categoryName
                      }
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleName" sm={2}>
                    Sub Category
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="name"
                      id="exampleName"
                      value={
                        stateCampaign && stateCampaign.category.subCategoryName
                      }
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Category Field
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="email"
                      id="exampleEmail"
                      value={
                        stateCampaign &&
                        stateCampaign.category.categoryFieldName
                      }
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleContact" sm={2}>
                    Start Date
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="contactNumber"
                      id="exampleContact"
                      value={
                        stateCampaign &&
                        new Date(stateCampaign.startDate).toLocaleString()
                      }
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleContact" sm={2}>
                    End Date
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="contactNumber"
                      id="exampleContact"
                      value={
                        stateCampaign &&
                        new Date(stateCampaign.endDate).toLocaleString()
                      }
                      disabled
                    />
                  </Col>
                </FormGroup>
                {/* </Form>
            </CardBody>
          </Card> */}

                {/* <Card className="main-card mb-3">
            <CardBody>
              <CardTitle>Set Vendor Commission</CardTitle>
              <br /> */}
                {/* <Form> */}
                <FormGroup row>
                  <Label for="exampleCommission" sm={2}>
                    Discount
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="number"
                      name="commission"
                      value={state.commission}
                      onChange={onChangeHandler}
                      id="exampleCommission"
                      placeholder="Discount percentage here..."
                    />
                  </Col>
                  <Col sm={2}>
                    <Button
                      color="primary"
                      disabled={state.commission ? false : true}
                      onClick={joinCampaignHandler}
                    >
                      {stateIsLoading ? (
                        <div style={{ width: "100px" }}>
                          <Spinner
                            style={{ width: "20px", height: "20px" }}
                            color="light"
                          />
                        </div>
                      ) : (
                        "Join Campaign"
                      )}
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default CampaignForm;
