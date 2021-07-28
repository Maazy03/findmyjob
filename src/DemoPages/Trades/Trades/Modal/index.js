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
import Table from '../../Table'

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    maxHeight: "80vh",
    width: "80vw",
    padding: theme.spacing(3),
    borderRadius: "0",
    "&:focus": {
      outline: "none"
    },
    overflow: "overlay"
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  }
}));

function ModalExample(props) {
  const classes = useStyles();
  const { art, toggle, close } = props
  if (art.shareHolders != undefined) {
    art.shareHolders.map((item, keys) => {
      return (
        console.log("art", item.owner.name)
      )
    })
  }
  return (
    <div>
      <Modal
        className={classes.modal}
        open={toggle}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
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
                    {art.img.map(_img => (
                      <div
                        style={{
                          height: "350px",
                          width: "100%",
                          backgroundImage: `url(${_img})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundColor: "#f8f8f8",
                          backgroundRepeat: "no-repeat"
                        }}
                      ></div>
                    ))}
                  </AliceCarousel>
                  <b>Artist Details</b>
                  <br />
                    Name: {art.artistName}
                  <br />
                  <br />
                  <b>About</b>
                  <br />
                  {art.aboutArtist}
                  <br />
                  <br />
                  <b>Biography</b>
                  <br />
                  {art.biography}
                </Grid>
                <Grid item md={7} xs={12}>
                  <div className={classes.flex}>
                    <Typography variant="h5">
                      <b>{art.title}</b>
                    </Typography>
                  </div>
                  <Typography variant="body1">
                    <b>Initial Offerings: </b>
                    <span style={{ fontSize: "1.5rem" }}>${art.initialOffering}</span>
                  </Typography>
                  <br />
                  <Table shares={art.tradingShares} />
                  <Typography variant="body2">
                    <b>Product Description</b>
                    <br />
                    {art.description}
                    <br />
                    <br />
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

export default ModalExample