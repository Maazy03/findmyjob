import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
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
import {
  serverURL,
  cloudinaryUrl,
  uploadPreset,
} from "../../../../store/common/apiCreator";
import SweetAlert from "sweetalert-react";
import * as utils from "../../../../common/utils";
import { useHistory } from "react-router-dom";
import { productActions } from "../../../../store/actions";
import Grid from "@material-ui/core/Grid";
import { AddProductShimmer } from "../../../../assets/components/shimmerComponents";

const FormsDefault = (props) => {
  const history = useHistory();
  const [productEdit, setProductEdit] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const [stateSweetAlert, setStateSweetAlert] = useState({
    showProdectAddSuccessAlert: false,
    showImageLengthIssueAlert: false,
    showProductEditSuccessAlert: false,
  });
  const [spacing, setSpacing] = React.useState(2);
  const [stateField, setStateIsFieldsRequired] = useState(false);
  const [index, setStateIndex] = useState(false);
  const [detailField, setStateDetailFields] = useState(false);
  const [details, setStateDetails] = useState([
    {
      name: "",
      value: "",
    },
  ]);
  let getState = props.location.state;
  const [state, setState] = useState({
    title: "",
    img: [],
    initialOffering: "",
    totalUnits: "",
    description: "",
    aboutArtist: "",
    artistName: "",
    biography: "",
  });

  console.log("getState art", state.img);

  const [stateImagesArray, setStateImagesArray] = useState({
    id: "upload-photo",
    imageArray: [],
    imgFiles: [],
  });
  useEffect(() => {
    if (props.location.state != undefined) {
      let { art } = getState;
      editState(art);
    }
  }, [props.location.state]);

  function editState(art) {
    const {
      title,
      img,
      initialOffering,
      totalUnits,
      description,
      aboutArtist,
      artistName,
      biography,
    } = art;
    state.title = title;
    state.img = img;
    state.initialOffering = initialOffering;
    state.totalUnits = totalUnits;
    state.description = description;
    state.aboutArtist = aboutArtist;
    state.artistName = artistName;
    state.biography = biography;
    setState((prevState) => ({ ...prevState, art }));
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

  async function uploadImagesToCloudnary() {
    //  shimmer loading set to true
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
        reject(error);
      }
    });
  }

  function onDeleteBuildImgTag(imgArrayIndex) {
    if (
      getState &&
      getState.product &&
      stateImagesArray.imageArray.length === 0
    ) {
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
    const { initialOffering, totalUnits } = state;
    setStateIsFieldsRequired(false);
    const { name, value } = e.target;
    if (
      (name == "initialOffering" && value.length > 10) ||
      (name == "totalUnits" && value.length > 3)
    ) {
      return;
    }
    if (e.target.value < 0) return;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function setStateToEmpty() {
    setState((prevState) => ({
      ...prevState,
      title: "",
      img: [],
      description: "",
      biography: "",
      artistName: "",
      aboutArtist: "",
      totalUnits: "",
      initialOffering: "",
    }));
    setStateImagesArray({
      id: "upload-photo",
      imageArray: [],
      imgFiles: [],
    });
  }

  async function onSubmitFormHandler() {
    try {
      const { imgFiles } = stateImagesArray;
      const {
        title,
        description,
        initialOffering,
        totalUnits,
        biography,
        artistName,
        aboutArtist,
        img,
      } = state;
      if (
        (title == "" ||
          biography == "" ||
          description == "" ||
          initialOffering == "",
        artistName == "",
        aboutArtist == "",
        totalUnits == "")
      ) {
        setStateIsFieldsRequired(true);
        return;
      }
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
      setStateIsFieldsRequired(false);
      let payload = {
        title,
        description,
        initialOffering,
        biography,
        aboutArtist,
        artistName,
        totalUnits,
        img,
      };
      payload.perUnitValue = initialOffering / totalUnits;
      if (getState != undefined && !productEdit) {
        console.log("check vallinasdas");
        let id = props.location.state.art._id;
        await dispatch(productActions.updateReserveArt(id, payload));
        setStateSweetAlert((prevState) => ({
          ...prevState,
          showProductEditSuccessAlert: true,
        }));
        history.push("/reserve/all");
      } else {
        await dispatch(productActions.addReserveArt(payload));
        setStateSweetAlert((prevState) => ({
          ...prevState,
          showProdectAddSuccessAlert: true,
        }));
      }
      setStateIsLoading(false);
      setProductEdit(true);
      setStateToEmpty();
    } catch (error) {
      console.log("check now one", error);
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
                              maxLength="100"
                              value={state.title}
                              placeholder="Art title..."
                              onChange={onChangeHandler}
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleText">Artist Name</Label>
                            <Input
                              type="text"
                              id="exampleTitle"
                              name="artistName"
                              placeholder="name"
                              maxLength="30"
                              value={state.artistName}
                              onChange={onChangeHandler}
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                      <Grid container spacing={spacing}>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Initial Offering</Label>
                            <Input
                              type="number"
                              id="exampleTitle"
                              name="initialOffering"
                              placeholder="price"
                              value={state.initialOffering}
                              onChange={onChangeHandler}
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleTitle">Total Units</Label>
                            <Input
                              type="number"
                              id="exampleTitle"
                              name="totalUnits"
                              value={state.totalUnits}
                              placeholder="units"
                              onChange={onChangeHandler}
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item md={4} lg={4}>
                          <FormGroup>
                            <Label for="exampleTitle">Per Unit Value</Label>
                            <Input
                              type="number"
                              id="exampleTitle"
                              value={(
                                state.initialOffering / state.totalUnits
                              ).toFixed(2)}
                              name="perUnitValue"
                              disabled={true}
                              placeholder="unit value"
                            />
                          </FormGroup>
                        </Grid>
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
                      <FormGroup>
                        <Label for="exampleText">About Artist</Label>
                        <Input
                          value={state.aboutArtist}
                          onChange={onChangeHandler}
                          type="textarea"
                          name="aboutArtist"
                          rows="7"
                          id="exampleText"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleText">Artist Biography</Label>
                        <Input
                          value={state.biography}
                          onChange={onChangeHandler}
                          type="textarea"
                          name="biography"
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
