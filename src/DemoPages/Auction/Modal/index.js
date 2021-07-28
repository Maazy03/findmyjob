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
import Table from "../Table";

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
  // if (art.shareHolders != undefined) {
  //   art.shareHolders.map((item, keys) => {
  //     return console.log("art", item.owner.name);
  //   });
  // }
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
                    {art.img.map((_img) => (
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
                    <Typography variant="h6">
                      <b>{`${"Title: " + art.title}`}</b>
                    </Typography>
                  </div>
                  <Typography variant="body1">
                    <b>Price </b>
                    <span>{art.price}</span>
                  </Typography>
                  <Typography variant="body1">
                    <b>Highest Bid: </b>
                    <span>
                      {art.highestBid
                        ? `${"$ " + art.highestBid}`
                        : "Not Placed"}
                    </span>
                  </Typography>
                  <br />
                  <Typography variant="body2">
                    <br />
                    <b>Product Details</b>
                    <br />
                    {Object.keys(art.detail).map((key) => (
                      <Fragment>
                        {`${key}: ${art.detail[key]}`}
                        <br />
                      </Fragment>
                    ))}
                    <br />
                  </Typography>
                  <Table bids={art.bids} />
                  <Typography variant="body2">
                    <br />
                    <b>Product Description</b>
                    <br />
                    <p>{art.description}</p>
                  </Typography>
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
