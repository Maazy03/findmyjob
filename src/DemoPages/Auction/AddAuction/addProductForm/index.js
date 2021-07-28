import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import axios from "axios";
import {
  serverURL,
  cloudinaryUrl,
  uploadPreset,
} from "../../../../store/common/apiCreator";
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
import { Image, Transformation } from "cloudinary-react";
import { useHistory } from "react-router-dom";
import * as utils from "../../../../common/utils";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import "moment-timezone";
import moment from "moment-timezone";
import { AddProductShimmer } from "../../../../assets/components/shimmerComponents";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import { productActions } from "../../../../store/actions";

const FormsDefault = (props) => {
  let getState = props.location.state;
  const [stateSweetAlert, setStateSweetAlert] = useState({
    showProdectAddSuccessAlert: false,
    showImageLengthIssueAlert: false,
    showProductEditSuccessAlert: false,
  });
  const dipatch = useDispatch();
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const [state, setState] = useState({
    title: "",
    img: [],
    price: "",
    description: "",
    region: "African Art",
  });

  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
  });

  const [stateImagesArray, setStateImagesArray] = useState({
    id: "upload-photo",
    imageArray: [],
    imgFiles: [],
  });
  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const [match, setStateMatch] = React.useState(false);
  const [productEdit, setProductEdit] = useState(false);
  const [stateField, setStateIsFieldsRequired] = useState(false);
  const [index, setStateIndex] = useState(false);
  const [detailField, setStateDetailFields] = useState(false);
  const [detailsObject, setStateDetails] = useState([
    {
      name: "",
      value: "",
    },
  ]);

  const handleChange = (e) => {
    readURI(e);
  };

  useEffect(() => {
    if (props.location.state != undefined) {
      let { art } = getState;
      editState(art);
    }
  }, [props.location.state]);

  function onChangeHandler(e) {
    setStateIsFieldsRequired(false);
    const { name, value } = e.target;
    if (name == "price" && value.length > 10) {
      return;
    }
    if (value < 0) return;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleDateChange = (date, label) => {
    setStateIsFieldsRequired(false);
    setSelectedDate((prevState) => ({ ...prevState, [label]: date }));
  };

  function editState(art) {
    const { title, img, price, description } = art;
    state.title = title;
    state.img = img;
    state.price = price;
    state.description = description;
    selectedDate.startDate = art.startDate;
    selectedDate.startTime = art.startTime;
    selectedDate.endTime = art.endTime;
    selectedDate.endDate = art.endDate;
  }

  function readURI(e) {
    let imgFiles = e.target.files;
    const { name } = e.target;
    if (imgFiles.length > 5) {
      setStateSweetAlert((prevState) => ({
        ...prevState,
        showImageLengthIssueAlert: true,
      }));
    } else {
      if (imgFiles) {
        setStateImagesArray((prevState) => ({ ...prevState, imgFiles }));
        let files = Array.from(imgFiles);
        if (files.length > 5) {
          files = files.splice(0, 5);
        }

        Promise.all(
          files.map((file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.addEventListener("load", (ev) => {
                resolve(ev.target.result);
              });
              reader.addEventListener("error", reject);
              reader.readAsDataURL(file);
            });
          })
        ).then(
          (images) => {
            setStateImagesArray((prevState) => ({
              ...prevState,
              imageArray: images,
            }));
            setState((prevState) => ({ ...prevState, img: [] }));
          },
          (error) => {}
        );
      }
    }
  }

  function buildImgTag() {
    if (productEdit == true) {
      getState = {
        art: {
          img: [],
        },
      };
    }
    return getState && stateImagesArray.imageArray.length === 0
      ? getState.art.img.map((_img, index) => {
          return (
            <Card
              style={{
                width: "25%",
                margin: 10,
              }}
              key={index}
            >
              <CardBody
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <div>
                  <button
                    style={{ display: "flex", margin: "0 auto" }}
                    className="mb-2 mr-2 btn-icon btn-icon-only btn btn-link btn-sm"
                    onClick={() => onDeleteBuildImgTag(index)}
                  >
                    {" "}
                    <i className="pe-7s-trash btn-icon-wrapper font-size-xlg">
                      {" "}
                    </i>
                  </button>
                  <Image
                    cloudName="sar-com"
                    publicId={_img}
                    style={{ width: "100%", height: "50%" }}
                    responsive
                  >
                    <Transformation
                      height="180"
                      width="200"
                      gravity="faces"
                      radius="5"
                    />
                  </Image>
                </div>
              </CardBody>
            </Card>
          );
        })
      : stateImagesArray.imageArray.map((imageURI, index) => (
          <Card style={{ width: "20%", margin: 10 }} key={imageURI}>
            <CardBody
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <button
                  style={{ display: "flex", margin: "0 auto" }}
                  className="mb-2 mr-2 btn-icon btn-icon-only btn btn-link btn-sm"
                  onClick={() => onDeleteBuildImgTag(index)}
                >
                  <i className="pe-7s-trash btn-icon-wrapper font-size-xlg">
                    {" "}
                  </i>
                </button>
                <img
                  className="photo-uploaded"
                  style={{ width: "100%", height: "50%" }}
                  src={imageURI}
                  alt="ph uploaded"
                />
              </div>
            </CardBody>
          </Card>
        ));
  }

  function onDeleteBuildImgTag(imgArrayIndex) {
    if (getState && stateImagesArray.imageArray.length === 0) {
      state.img.splice(imgArrayIndex, 1);
      let imgUpdate = [...state.img];
      imgUpdate.splice(imgArrayIndex, 1);
      setState((prevState) => ({ ...prevState, img: imgUpdate }));
    } else {
      const imageArray = [...stateImagesArray.imageArray];
      let _imgFiles = Array.from(stateImagesArray.imgFiles);
      _imgFiles.splice(imgArrayIndex, 1);
      delete _imgFiles[imgArrayIndex];

      imageArray.splice(imgArrayIndex, 1);

      setStateImagesArray((prevState) => ({
        ...prevState,
        imageArray,
        imgFiles: _imgFiles,
      }));
    }
  }

  function addDetailsValues(e, index) {
    setStateDetailFields(false);
    setStateIsFieldsRequired(false);
    const { name, value } = e.target;
    if (name == "name") detailsObject[index].name = value;
    if (name == "value") detailsObject[index].value = value;
    setStateDetails(detailsObject);
  }

  function addField() {
    let validate = false;
    detailsObject.forEach((item) => {
      if (item.name == "" || item.value == "") {
        setStateDetailFields(true);
        validate = true;
      }
    });
    if (validate == true) return;
    let body = {
      name: "",
      value: "",
    };
    detailsObject.push(body);
    setStateDetails(detailsObject);
    setStateIndex(!index);
  }

  function removeField() {
    detailsObject.pop();
    setStateDetails(detailsObject);
    setStateIndex(!index);
  }

  function setStateToEmpty() {
    setState((prevState) => ({
      ...prevState,
      title: "",
      img: [],
      price: "",
      description: "",
      price: "",
    }));
    setStateImagesArray({
      id: "upload-photo",
      imageArray: [],
      imgFiles: [],
    });
  }
  async function uploadImagesToCloudnary() {
    return new Promise(async (resolve, reject) => {
      try {
        const { imgFiles } = stateImagesArray;
        for (let i = 0; i < imgFiles.length; i++) {
          var formData = new FormData();
          formData.append("file", imgFiles[i]);
          formData.append("folder", "AfricanArt.International");
          formData.append("upload_preset", uploadPreset);
          const uploadImage = await axios.post(cloudinaryUrl, formData);
          const { secure_url } = uploadImage.data;
          setState((prevState) => ({
            ...prevState,
            img: state.img.push(secure_url),
          }));
          resolve(true);
        }
      } catch (error) {
        console.log("view error now", error);
        reject(error);
      }
    });
  }

  async function onSubmitFormHandler() {
    try {
      const { imgFiles } = stateImagesArray;
      var end = moment(selectedDate.startDate); //todays date
      var now = moment(selectedDate.endDate); // another date
      var duration = moment.duration(now.diff(end));
      var days = duration.asDays();
      if (days <= 6) {
        setStateMatch(true);
        return;
      }
      setStateMatch(false);
      const { title, description, price, img, region } = state;
      if (title == "" || description == "" || price == "") {
        setStateIsFieldsRequired(true);
        return;
      }
      let check = false;
      detailsObject.forEach((item) => {
        if (item.name == "" || item.value == "") {
          check = true;
          setStateIsFieldsRequired(true);
        }
      });
      console.log("check now", getState, imgFiles);
      if (check == true) return;
      if (imgFiles.length == 0 && getState == undefined) {
        setStateIsFieldsRequired(true);
        return;
      }
      setStateIsLoading(true);
      if (getState == undefined || imgFiles.length != 0) {
        await uploadImagesToCloudnary();
      }
      if (img.length == 0) {
        setStateIsFieldsRequired(true);
        setStateIsLoading(false);
        return;
      }
      setStateIsLoading(true);
      setStateIsFieldsRequired(false);
      let payload = {
        title,
        description,
        price,
        img,
      };
      if (region == "African Art") {
        payload.region = "af";
      } else {
        payload.region = "int";
      }
      let detail = detailsObject.reduce((prev, current) => {
        prev[current.name] = current.value;
        return prev;
      }, {});
      payload.date = selectedDate;
      payload.detail = detail;
      if (getState != undefined && !productEdit) {
        let id = props.location.state.art._id;
        let get = await dipatch(productActions.updateAuction(id, payload));
        setStateSweetAlert((prevState) => ({
          ...prevState,
          showProductEditSuccessAlert: true,
        }));
      } else {
        let get = await axios.post(`${serverURL}/auction/add`, payload);
        setStateSweetAlert((prevState) => ({
          ...prevState,
          showProdectAddSuccessAlert: true,
        }));
      }
      setStateIsLoading(false);
      setStateToEmpty();
      setProductEdit(true);
      if (getState != undefined) {
        history.push("/auction/all");
      }
    } catch (error) {
      utils._toast("Somthing went Wrong! All feilds are requires", "error");
      setStateToEmpty();
      setStateIsLoading(false);
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
        {stateIsLoading ? (
          <AddProductShimmer />
        ) : (
          <Container fluid>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Add Product</CardTitle>
                    <SweetAlert
                      title="Congratulations"
                      confirmButtonColor=""
                      show={stateSweetAlert.showProdectAddSuccessAlert}
                      text="Product successfully added."
                      type="success"
                      onConfirm={() =>
                        setStateSweetAlert((prevState) => ({
                          ...prevState,
                          showProdectAddSuccessAlert: false,
                        }))
                      }
                    />
                    <SweetAlert
                      title="Warning"
                      confirmButtonColor=""
                      show={stateSweetAlert.showImageLengthIssueAlert}
                      text="Image Length must be less then 6."
                      type="error"
                      onConfirm={() =>
                        setStateSweetAlert((prevState) => ({
                          ...prevState,
                          showImageLengthIssueAlert: false,
                        }))
                      }
                    />
                    <FormGroup>
                      <Label for="exampleImages">Art Images</Label>
                      <div>
                        <input
                          id={stateImagesArray.id}
                          type="file"
                          name="img"
                          accept="image/gif,image/jpeg,image/jpg,image/png,video/mp4,video/x-m4v"
                          title="Add photos or video"
                          onChange={handleChange}
                          multiple
                        />
                      </div>
                      <FormText color="muted">
                        Notice : The first selected product will be the cover
                        photo for display
                      </FormText>
                      <Row>{buildImgTag()}</Row>
                    </FormGroup>
                    <Form>
                      <Grid container spacing={spacing}>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleTitle">Title</Label>
                            <Input
                              type="text"
                              id="exampleTitle"
                              name="title"
                              value={state.title}
                              placeholder="Art title..."
                              onChange={onChangeHandler}
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Select Region</Label>
                            <Input
                              onChange={onChangeHandler}
                              required
                              defaultValue=""
                              type="select"
                              name="region"
                              id="exampleSelect"
                            >
                              <option>African Art</option>
                              <option>International Art</option>
                            </Input>
                          </FormGroup>
                        </Grid>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Price</Label>
                            <Input
                              type="number"
                              id="exampleTitle"
                              name="price"
                              placeholder="price"
                              value={state.price}
                              onChange={onChangeHandler}
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                      <FormGroup>
                        <Label for="exampleTitle">Auction Date and Time</Label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justify="space-around">
                            <Grid item md={2} lg={3}>
                              <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="startDate"
                                value={selectedDate.startDate}
                                onChange={(e) =>
                                  handleDateChange(e, "startDate")
                                }
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                              />
                            </Grid>
                            <Grid item md={2} lg={3}>
                              <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Start Time"
                                value={selectedDate.startTime}
                                onChange={(e) =>
                                  handleDateChange(e, "startTime")
                                }
                                KeyboardButtonProps={{
                                  "aria-label": "change time",
                                }}
                              />
                            </Grid>
                            <Grid item md={2} lg={3}>
                              <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="End Date"
                                value={selectedDate.endDate}
                                error={match}
                                helperText={
                                  match &&
                                  "End Date must be 1-2 week differece from start date"
                                }
                                onChange={(e) => handleDateChange(e, "endDate")}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                              />
                            </Grid>
                            <Grid item md={2} lg={3}>
                              <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="End Time"
                                value={selectedDate.endTime}
                                onChange={(e) => handleDateChange(e, "endTime")}
                                KeyboardButtonProps={{
                                  "aria-label": "change time",
                                }}
                              />
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </FormGroup>
                      <Label for="exampleText">Art Detail</Label>
                      <Grid container spacing={spacing}>
                        {detailsObject.map((item, key) => {
                          return (
                            <>
                              <Grid item md={4} lg={4}>
                                <FormGroup>
                                  <Input
                                    type="text"
                                    id="exampleTitle"
                                    name="name"
                                    placeholder="e.g size"
                                    onChange={(e) => addDetailsValues(e, key)}
                                  />
                                </FormGroup>
                                {key == detailsObject.length - 1 &&
                                  detailField && (
                                    <Label
                                      style={{ color: "red" }}
                                      for="exampleText"
                                    >
                                      All Fields Are Required
                                    </Label>
                                  )}
                              </Grid>
                              <Grid item md={6} lg={6}>
                                <FormGroup>
                                  <Input
                                    type="text"
                                    id="exampleTitle"
                                    name="value"
                                    placeholder="24 * 24"
                                    onChange={(e) => addDetailsValues(e, key)}
                                  />
                                </FormGroup>
                              </Grid>
                              {key == 0 && (
                                <Grid item md={2} lg={2}>
                                  <FormGroup>
                                    <Button color="primary" onClick={addField}>
                                      Add Field
                                    </Button>
                                  </FormGroup>
                                </Grid>
                              )}
                              {key == detailsObject.length - 1 && key != 0 && (
                                <Grid item md={2} lg={2}>
                                  <FormGroup>
                                    <Button onClick={removeField}>
                                      Remove
                                    </Button>
                                  </FormGroup>
                                </Grid>
                              )}
                            </>
                          );
                        })}
                      </Grid>
                      <FormGroup>
                        <Label for="exampleText">Art Description</Label>
                        <Input
                          value={state.description}
                          onChange={onChangeHandler}
                          type="textarea"
                          name="description"
                          rows="7"
                          id="exampleText"
                        />
                      </FormGroup>
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
                        {getState && !productEdit ? (
                          <text>Edit</text>
                        ) : (
                          <text>Add</text>
                        )}
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
