import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { orderActions } from "../../../../store/actions";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";
import SweetAlert from "sweetalert-react";
import * as utils from "../../../../common/utils";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { AddProductShimmer } from "../../../../assets/components/shimmerComponents";

const FormsDefault = (props) => {
  const [stateSweetAlert, setStateSweetAlert] = useState({
    showProductEditSuccessAlert: false,
  });
  const dispatch = useDispatch();
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const [state, setState] = useState({
    shipping: "",
    giftCharges: "",
  });
  
  useEffect(() => {
    getCharges();
  }, []);
  const [stateField, setStateIsFieldsRequired] = useState(false);

  async function getCharges() {
    const get = await dispatch(orderActions.getCharges());
    if (get != null) {
      setState({
        shipping: get.shipping,
        giftCharges: get.giftCharges,
      });
    }
  }

  async function onSubmitFormHandler() {
    try {
      const { giftCharges, shipping } = state;
      if (giftCharges == "" || shipping == "") {
        setStateIsFieldsRequired(true);
        return;
      }
      setStateIsLoading(true);
      setStateIsFieldsRequired(false);
      let payload = {
        giftCharges,
        shipping,
      };
      const get = await dispatch(orderActions.setCharges(payload));
      setStateSweetAlert((prevState) => ({
        ...prevState,
        showProductEditSuccessAlert: true,
      }));
      setStateIsLoading(false);
    } catch (error) {
      utils._toast("Somthing went Wrong! All feilds are requires", "error");
      setStateIsLoading(false);
    }
  }

  function onChangeHandler(e) {
    setStateIsFieldsRequired(false);
    const { name, value } = e.target;
    if (value < 0) return;
    setState((prevState) => ({ ...prevState, [name]: value }));
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
        {stateIsLoading ? (
          <AddProductShimmer />
        ) : (
          <Container fluid>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Set Charges</CardTitle>
                    <SweetAlert
                      title="Congratulations"
                      confirmButtonColor=""
                      show={stateSweetAlert.showProductEditSuccessAlert}
                      text="Set successfully added."
                      type="success"
                      onConfirm={() =>
                        setStateSweetAlert((prevState) => ({
                          ...prevState,
                          showProductEditSuccessAlert: false,
                        }))
                      }
                    />
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleTitle">Shipping Charges</Label>
                            <Input
                              type="number"
                              id="exampleTitle"
                              name="shipping"
                              value={state.shipping}
                              placeholder="Charges..."
                              onChange={onChangeHandler}
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleTitle">Gift Charges</Label>
                            <Input
                              type="number"
                              id="exampleTitle"
                              name="giftCharges"
                              value={state.giftCharges}
                              placeholder="Charges..."
                              onChange={onChangeHandler}
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                      {stateField && (
                        <FormGroup>
                          <Label style={{ color: "red" }} for="exampleText">
                            All Fields Are Required
                          </Label>
                        </FormGroup>
                      )}
                      <Button
                        color="primary"
                        className="mt-1"
                        onClick={onSubmitFormHandler}
                      >
                        Set
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default FormsDefault;
