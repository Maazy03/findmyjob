import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import axios from "axios";
import {
  cloudinaryUrl,
  uploadPreset,
} from "../../../../store/common/apiCreator";
import { useHistory } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
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
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { AddProductShimmer } from "../../../../assets/components/shimmerComponents";
import { productActions } from "../../../../store/actions";
import { createNewAdd } from "../../../../firebaseConfig";

const FormsDefault = (props) => {
  let getState = props.location.state;
  const history = useHistory();
  const [stateSweetAlert, setStateSweetAlert] = useState({
    showProdectAddSuccessAlert: false,
    showImageLengthIssueAlert: false,
    showProductEditSuccessAlert: false,
  });
  const [stateImagesArray, setStateImagesArray] = useState({
    id: "upload-photo",
    imageArray: [],
    imgFiles: [],
  });
  const [spacing, setSpacing] = React.useState(2);
  const [stateField, setStateIsFieldsRequired] = useState(false);
  const [productEdit, setProductEdit] = useState(false);
  const [index, setStateIndex] = useState(false);
  const [detailField, setStateDetailFields] = useState(false);
  const [detailsObject, setStateDetails] = useState([
    {
      name: "",
      value: "",
    },
  ]);
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: "",
    img: [],
    price: "",
    category: "General",
    region: "African Art",
    description: "",
  });

  useEffect(() => {
    if (props.location.state != undefined) {
      let { art } = getState;
      editState(art);
    }
  }, [props.location.state]);

  function editState(art) {
    const { title, img, price, category, detail, description, region } = art;
    state.title = title;
    state.img = img;
    state.price = price;
    state.category = category;
    state.description = description;
    state.region = region;
  }

  const handleChange = (e) => {
    readURI(e);
  };

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

  async function uploadImagesToCloudnary() {
    return new Promise(async (resolve, reject) => {
      try {
        const { imgFiles } = stateImagesArray;
        console.log("view now img file", imgFiles[0]);
        var formData = new FormData();
        formData.append("file", imgFiles[0]);
        const send = createNewAdd(imgFiles[0]);
        send.then(
          function(result) {
            console.log("Initialized user details", result);
          },
          function(err) {
            console.log(err);
          }
        );
        // const check = await axios.post(
        //   "http://localhost:8003/upload",
        //   formData
        // );
        // for (let i = 0; i < imgFiles.length; i++) {
        //   var formData = new FormData();
        //   formData.append("file", imgFiles[i]);
        //   formData.append("folder", "AfricanArt.International");
        //   formData.append("upload_preset", uploadPreset);
        //   // const uploadImage = await axios.post(cloudinaryUrl, formData);
        //   // const { secure_url } = uploadImage.data;
        //   // setState((prevState) => ({
        //   //   ...prevState,
        //   //   img: state.img.push(secure_url),
        //   // }));
        //   resolve(true);
        // }
      } catch (error) {
        console.log("check new error now", error);
        reject(error);
      }
    });
  }

  function buildImgTag() {
    if (productEdit == true) {
      getState = {
        art: {
          img: [],
        },
      };
    }
    return getState &&
      getState != undefined &&
      stateImagesArray.imageArray.length === 0
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
              key={index}
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
  function onChangeHandler(e) {
    setStateIsFieldsRequired(false);
    const { name, value } = e.target;
    if (e.target.value < 0) return;
    setState((prevState) => ({ ...prevState, [name]: value }));
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
      category: "General Art",
      region: "African Art",
      detailsObject: [
        {
          name: "",
          value: "",
        },
      ],
    }));
    setStateImagesArray({
      id: "upload-photo",
      imageArray: [],
      imgFiles: [],
    });
    getState = "";
  }

  console.log("check category now", state);

  async function onSubmitFormHandler() {
    try {
      await uploadImagesToCloudnary();
      //   const { title, category, description, price, img, region } = state;
      //   const { imgFiles } = stateImagesArray;
      //   if (title == "" || category == "" || description == "" || price == "") {
      //     setStateIsFieldsRequired(true);
      //     return;
      //   }
      //   let check = false;
      //   detailsObject.forEach((item) => {
      //     if (item.name == "" || item.value == "") {
      //       check = true;
      //       setStateIsFieldsRequired(true);
      //       setStateIsLoading(false);
      //     }
      //   });
      //   if (check == true) return;
      //   if (imgFiles.length == 0 && getState == undefined) {
      //     setStateIsFieldsRequired(true);
      //     return;
      //   }
      //   setStateIsLoading(true);
      //   if (getState == undefined || imgFiles.length != 0) {
      //     await uploadImagesToCloudnary();
      //   }
      //   if (img.length == 0) {
      //     setStateIsFieldsRequired(true);
      //     setStateIsLoading(false);
      //     return;
      //   }
      //   setStateIsFieldsRequired(false);
      //   let payload = {
      //     title,
      //     description,
      //     price,
      //     img,
      //   };
      //   if (region == "African Art" || region == "af") {
      //     payload.region = "af";
      //   } else {
      //     payload.region = "int";
      //   }
      //   payload.category = category.toLowerCase();
      //   let detail = detailsObject.reduce((prev, current) => {
      //     prev[current.name] = current.value;
      //     return prev;
      //   }, {});
      //   payload.detail = detail;
      //   console.log("check category npw", payload);
      //   if (getState != undefined && !productEdit) {
      //     let id = props.location.state.art._id;
      //     let add = await dispatch(productActions.updatedArt(id, payload));
      //     setStateSweetAlert((prevState) => ({
      //       ...prevState,
      //       showProductEditSuccessAlert: true,
      //     }));
      //     history.push(`/arts/category/${getState.category}`);
      //   } else {
      //     if (payload.category == "general art") {
      //       payload.category = "general";
      //     }
      //     console.log("ppppppppppppayload now", payload);
      //     let add = await dispatch(productActions.addProduct(payload));
      //     setStateSweetAlert((prevState) => ({
      //       ...prevState,
      //       showProdectAddSuccessAlert: true,
      //     }));
      //   }
      //   setStateIsLoading(false);
      //   let index = {
      //     page: 0,
      //     region: "af",
      //   };
      //   setStateToEmpty();
      //   setProductEdit(true);
      //   let updateGeneralArts = await dispatch(
      //     productActions.getGeneralArts(index)
      //   );
      //   let updateMasterPieceArts = await dispatch(
      //     productActions.getMasterPieceArts(index)
      //   );
    } catch (error) {
      setStateIsLoading(false);
      utils._toast("Somthing went Wrong! All feilds are requires", "error");
      setStateToEmpty();
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
                      <Grid container spacing={spacing}>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Select Category</Label>
                            <Input
                              onChange={onChangeHandler}
                              required
                              defaultValue=""
                              type="select"
                              name="category"
                              id="exampleSelect"
                            >
                              <option>General</option>
                              <option>MasterPiece</option>
                            </Input>
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
                              <option>African</option>
                              <option>International</option>
                            </Input>
                          </FormGroup>
                        </Grid>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleTitle">Price</Label>
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
                      <Label for="exampleTitle">Add Detail</Label>
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
                                    placeholder="size..."
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
