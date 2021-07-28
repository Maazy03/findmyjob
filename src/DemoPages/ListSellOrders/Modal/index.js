import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { serverURL } from "../../../store/common/apiCreator";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    maxHeight: "80vh",
    width: "80vw",
    padding: theme.spacing(3),
    borderRadius: "0",
    "&:focus": {
      outline: "none",
    },
    overflow: "overlay",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

function ModalExample(props) {
  const classes = useStyles();
  const { art, toggle, close } = props;
  console.log("art now", art);
  return (
    <div>
      <Modal
        className={classes.modal}
        open={toggle}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={toggle}>
          <Paper className={classes.paper}>
            {art.length != 0 && (
              <Grid container spacing={3}>
                <Grid item md={5} xs={12}>
                  <AliceCarousel
                    mouseTrackingEnabled
                    autoPlay
                    autoPlayInterval={3000}
                    buttonsDisabled={true}
                  >
                    {art.aboutArt.img.map((_img) => (
                      <div
                        style={{
                          height: "350px",
                          width: "100%",
                          backgroundImage: `url(${_img})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundColor: "#f8f8f8",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    ))}
                  </AliceCarousel>
                </Grid>
                <Grid item md={7} xs={12}>
                  <div className={classes.flex}>
                    <Typography variant="h5">
                      <b>{art.title}</b>
                    </Typography>
                  </div>
                  <Typography variant="body1">
                    <b>Price: </b>
                    <span style={{ fontSize: "1.5rem" }}>
                      ${art.aboutArt.price}
                    </span>
                  </Typography>
                  <br />
                  <b>Product Category</b>
                  <br />
                  {art.aboutArt.category}
                  <br />
                  <b>Product region</b>
                  <br />
                  {art.aboutArt.region == "af" ? "africa" : "international"}
                  <br />
                  <b>Product Description</b>
                  <br />
                  {art.aboutArt.description}
                  <br />
                  <br />
                  <b>Product Details</b>
                  <br />
                  {Object.keys(art.aboutArt.detail).map((key) => (
                    <Fragment>
                      {`${key}: ${art.aboutArt.detail[key]}`}
                      <br />
                    </Fragment>
                  ))}
                  <br />
                  <b>User Details</b>
                  <br />
                  {Object.keys(art.personalInformation).map((key) => (
                    <Fragment>
                      {`${key}: ${art.personalInformation[key]}`}
                      <br />
                    </Fragment>
                  ))}
                </Grid>
              </Grid>
            )}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalExample;
