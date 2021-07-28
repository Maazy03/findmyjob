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
  const { order, toggle, close, product } = props;
  let transactionDetails = order.transaction[0].amount.details;
  let transaction = order.transaction[0].amount;
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
            {order.length != 0 && (
              <Grid container spacing={3}>
                {product.map((item) => {
                  return (
                    <>
                      <Grid item md={5} xs={12}>
                        <AliceCarousel
                          mouseTrackingEnabled
                          autoPlay
                          autoPlayInterval={3000}
                          buttonsDisabled={true}
                        >
                          {item.img.map((_img) => (
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
                            <b>{item.title}</b>
                          </Typography>
                        </div>
                        <Typography variant="body1">
                          <b>Price: </b>
                          <span style={{ fontSize: "1.5rem" }}>
                            ${item.price}
                          </span>
                        </Typography>
                        <Typography variant="body1">
                          <b>category </b>
                          <br />
                          <span>{item.category}</span>
                        </Typography>
                        <br />
                        <Typography variant="body2">
                          <b>Description </b>
                          {item.description}
                          <br />
                          <br />
                          <b>Product Details</b>
                          <br />
                          {item.detail &&
                            Object.keys(item.detail).map((key) => (
                              <Fragment>
                                {`${key}: ${item.detail[key]}`}
                                <br />
                              </Fragment>
                            ))}
                          <br />
                        </Typography>
                      </Grid>
                    </>
                  );
                })}
                <Grid container md={12} lg={12}>
                  <Grid item md={5} lg={5}>
                    <b>Buyer Details</b>
                    <br />
                    {order &&
                      Object.keys(order.payer).map((key) => (
                        <Fragment>
                          {`${key}: ${order.payer[key]}`}
                          <br />
                        </Fragment>
                      ))}
                    <br />
                  </Grid>
                  <Grid item md={4} lg={4}>
                    <b>Shipping Address</b>
                    <br />
                    {order &&
                      Object.keys(order.shippingAddress).map((key) => (
                        <Fragment>
                          {`${key}: ${order.shippingAddress[key]}`}
                          <br />
                        </Fragment>
                      ))}
                    <br />
                  </Grid>
                  <Grid item md={3} lg={3}>
                    <b>Transaction Details</b>
                    <br />
                    {transaction &&
                      Object.keys(transaction).map((key) => {
                        if (key == "details") return;
                        return (
                          <Fragment>
                            {`${key}: ${transaction[key]}`}
                            <br />
                          </Fragment>
                        );
                      })}
                    {transactionDetails &&
                      Object.keys(transactionDetails).map((key) => {
                        if (key == "details") return;
                        return (
                          <Fragment>
                            {`${key}: ${transactionDetails[key]}`}
                            <br />
                          </Fragment>
                        );
                      })}
                  </Grid>
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
