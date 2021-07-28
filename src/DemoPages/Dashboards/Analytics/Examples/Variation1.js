import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Col,
  CardHeader,
  Container,
  Card,
  CardBody,
  Progress,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { dashboardAction } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import CountUp from "react-countup";

import Slider from "react-slick";

import { ResponsiveContainer, AreaChart, Area } from "recharts";

import { Sparklines, SparklinesCurve } from "react-sparklines";

import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const data55 = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const data552 = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
];

const data553 = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

function boxMullerRandom() {
  let phase = false,
    x1,
    x2,
    w;

  return (function() {
    if (phase === !phase) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}

function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(10);
const sampleData2 = randomData(15);
const sampleData3 = randomData(8);
const sampleData4 = randomData(12);

export default function AnalyticsDashboard1() {
  const reduxDashboardState = useSelector((state) => state.dashboard.data);

  const dispatch = useDispatch();
  const [state, setState] = useState({
    data: "",
    dropdownOpen: false,
    selectedOption: null,
    order: reduxDashboardState.order,
    product: reduxDashboardState.product,
    portrait_orders_approved: reduxDashboardState.portrait_orders_approved,
    portrait_orders_request: reduxDashboardState.portrait_orders_request,
    list_sell_approved: reduxDashboardState.list_sell_approved,
    list_sell_request: reduxDashboardState.list_sell_request,
    requestArtist: reduxDashboardState.requestArtist,
    artist: reduxDashboardState.artist,
    sellerProducts: reduxDashboardState.sellerProducts,
    adminProducts: reduxDashboardState.adminProducts,
    trade: reduxDashboardState.trade,
  });

  const settings = {
    className: "",
    centerMode: false,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  async function getData() {
    const data = await dispatch(dashboardAction.getDashboardOrders());
    setState({
      data: "",
      dropdownOpen: false,
      selectedOption: null,
      order: data.order,
      product: data.product,
      portrait_orders_approved: data.portrait_orders_approved,
      portrait_orders_request: data.portrait_orders_request,
      list_sell_approved: data.list_sell_approved,
      list_sell_request: data.list_sell_request,
      requestArtist: data.requestArtist,
      artist: data.artist,
      sellerProducts: data.sellerProducts,
      adminProducts: data.adminProducts,
      trade: data.trade,
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const {
    order,
    product,
    portrait_orders_approved,
    portrait_orders_request,
    sellerProducts,
    adminProducts,
    artist,
    requestArtist,
    list_sell_approved,
    list_sell_request,
    trade,
  } = state;

  return (
    <Fragment>
      <Container fluid>
        <Card className="mb-3">
          <CardHeader className="card-header-tab z-index-6">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i className="header-icon lnr-charts icon-gradient bg-happy-green">
                {" "}
              </i>
              Plateform Arts
            </div>
          </CardHeader>
          <Row className="no-gutters">
            <Col sm="6" md="4" xl="4">
              <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                <div className="icon-wrapper rounded-circle">
                  <div className="icon-wrapper-bg opacity-10 bg-warning" />
                  <i className="lnr-picture text-dark opacity-8" />
                </div>
                <div className="widget-chart-content">
                  <div className="widget-subheading">General Arts</div>
                  {order && Object.keys(order).length != 0 && (
                    <div className="widget-numbers">{product.art}</div>
                  )}
                </div>
              </div>
              <div className="divider m-0 d-md-none d-sm-block" />
            </Col>
            <Col sm="6" md="4" xl="4">
              <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                <div className="icon-wrapper rounded-circle">
                  <div className="icon-wrapper-bg opacity-9 bg-danger" />
                  <i className="lnr-picture text-white" />
                </div>
                <div className="widget-chart-content">
                  <div className="widget-subheading">Auction Arts</div>
                  {product && (
                    <div className="widget-numbers">
                      <CountUp
                        start={0}
                        end={product.auction}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        useEasing={false}
                        duration="5"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="divider m-0 d-md-none d-sm-block" />
            </Col>
            <Col sm="12" md="4" xl="4">
              <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                <div className="icon-wrapper rounded-circle">
                  <div className="icon-wrapper-bg opacity-9 bg-success" />
                  <i className="lnr-apartment text-white" />
                </div>
                <div className="widget-chart-content">
                  <div className="widget-subheading">Reserve Arts</div>
                  {product && (
                    <div className="widget-numbers text-success">
                      <CountUp
                        start={0}
                        end={product.reserve}
                        separator=""
                        decimals={0}
                        decimal="."
                        useEasing={false}
                        duration="7"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Card>
        <Row>
          <Col sm="12" lg="12">
            <Card className="mb-3">
              <CardHeader className="card-header-tab">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <i className="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo">
                    {" "}
                  </i>
                  Orders Report
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <div className="p-1 slick-slider-sm mx-auto">
                  <Slider {...settings}>
                    <div>
                      <div className="widget-chart widget-chart2 text-left p-0">
                        <div className="widget-chat-wrapper-outer">
                          <div className="widget-chart-content widget-chart-content-lg">
                            <div className="widget-chart-flex">
                              <div className="widget-title opacity-5 text-muted text-uppercase">
                                Accepted
                              </div>
                            </div>
                            <div className="widget-numbers">
                              <div className="widget-chart-flex">
                                <div>
                                  <span className="opacity-10 text-success pr-2">
                                    <FontAwesomeIcon icon={faAngleUp} />
                                  </span>
                                  {order && Object.keys(order).length != 0 && (
                                    <CountUp
                                      start={0}
                                      end={order.acceptedOrder}
                                      separator=""
                                      decimals={0}
                                      decimal=""
                                      prefix=""
                                      duration="15"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="widget-chart-wrapper he-auto opacity-10 m-0">
                            <ResponsiveContainer height={140} width="100%">
                              <AreaChart
                                data={data55}
                                margin={{
                                  top: -15,
                                  right: 0,
                                  left: 0,
                                  bottom: 0,
                                }}
                              >
                                <Area
                                  type="monotoneX"
                                  dataKey="uv"
                                  stroke="var(--success)"
                                  strokeWidth="4"
                                  fill="var(--success)"
                                  fillOpacity=".2"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="widget-chart widget-chart2 text-left p-0">
                        <div className="widget-chat-wrapper-outer">
                          <div className="widget-chart-content widget-chart-content-lg">
                            <div className="widget-chart-flex">
                              <div className="widget-title opacity-5 text-muted text-uppercase">
                                Pending
                              </div>
                            </div>
                            <div className="widget-numbers">
                              <div className="widget-chart-flex">
                                <div>
                                  {order && Object.keys(order).length != 0 && (
                                    <span className="text-warning">
                                      {order.pendingOrder}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="widget-chart-wrapper he-auto opacity-10 m-0">
                            <ResponsiveContainer height={140} width="100%">
                              <AreaChart
                                data={data552}
                                margin={{
                                  top: -15,
                                  right: 0,
                                  left: 0,
                                  bottom: 0,
                                }}
                              >
                                <Area
                                  type="monotoneX"
                                  dataKey="uv"
                                  stroke="var(--warning)"
                                  strokeWidth="4"
                                  fill="var(--warning)"
                                  fillOpacity=".2"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="widget-chart widget-chart2 text-left p-0">
                        <div className="widget-chat-wrapper-outer">
                          <div className="widget-chart-content widget-chart-content-lg">
                            <div className="widget-chart-flex">
                              <div className="widget-title opacity-5 text-muted text-uppercase">
                                Total
                              </div>
                            </div>
                            <div className="widget-numbers">
                              <div className="widget-chart-flex">
                                {order && Object.keys(order).length != 0 && (
                                  <div>
                                    <span>{order.count}</span>
                                    <span className="text-primary pl-3">
                                      <FontAwesomeIcon icon={faAngleDown} />
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="widget-chart-wrapper he-auto opacity-10 m-0">
                            <ResponsiveContainer height={140} width="100%">
                              <AreaChart
                                data={data553}
                                margin={{
                                  top: -15,
                                  right: 0,
                                  left: 0,
                                  bottom: 0,
                                }}
                              >
                                <Area
                                  type="monotoneX"
                                  dataKey="uv"
                                  stroke="var(--primary)"
                                  strokeWidth="4"
                                  fill="var(--primary)"
                                  fillOpacity=".2"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
                <h6 className="text-muted text-uppercase font-size-md opacity-5 pl-3 pr-3 pb-1 font-weight-normal">
                  Sales Progress
                </h6>
                <ListGroup flush>
                  <ListGroupItem className="p-3 bg-transparent">
                    <div className="widget-content p-0">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <div className="widget-heading">Total Orders</div>
                            <div className="widget-subheading">Amount</div>
                          </div>
                          <div className="widget-content-right">
                            {order && Object.keys(order).length != 0 && (
                              <div className="widget-numbers text-success">
                                <small>$</small>
                                {order.totalAmount}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="widget-progress-wrapper">
                          {order && Object.keys(order).length != 0 && (
                            <Progress
                              className="progress-bar-sm progress-bar-animated-alt"
                              color="primary"
                              value={
                                order.acceptedOrder == 0
                                  ? 0
                                  : order.acceptedOrder / order.count
                              }
                            />
                          )}
                          <div className="progress-sub-label">
                            <div className="sub-label-left">Accepted ratio</div>
                            <div className="sub-label-right">100%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6" xl="3">
            <div className="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-success border-success">
              <div className="widget-chat-wrapper-outer">
                <div className="widget-chart-content pt-3 pl-3 pb-1">
                  <div className="widget-chart-flex">
                    <div className="widget-numbers">
                      <div className="widget-chart-flex">
                        {order && Object.keys(order).length != 0 && (
                          <div className="fsize-4">
                            <CountUp
                              start={0}
                              end={portrait_orders_approved}
                              separator=""
                              decimals={0}
                              decimal=""
                              prefix=""
                              duration="10"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <h6 className="widget-subheading mb-0 opacity-5">
                    Portrait Orders Approved
                  </h6>
                </div>
                <Row className="no-gutters widget-chart-wrapper mt-3 mb-3 pl-2 he-auto">
                  <Col md="9">
                    <Sparklines data={sampleData}>
                      <SparklinesCurve
                        style={{
                          strokeWidth: 3,
                          stroke: "var(--success)",
                          fill: "none",
                        }}
                      />
                    </Sparklines>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col md="6" xl="3">
            <div className="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-primary border-primary">
              <div className="widget-chat-wrapper-outer">
                <div className="widget-chart-content pt-3 pl-3 pb-1">
                  <div className="widget-chart-flex">
                    <div className="widget-numbers">
                      <div className="widget-chart-flex">
                        {order && Object.keys(order).length != 0 && (
                          <div className="fsize-4">
                            <CountUp
                              start={0}
                              end={portrait_orders_request}
                              separator=""
                              decimals={0}
                              decimal=""
                              prefix=""
                              duration="10"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <h6 className="widget-subheading mb-0 opacity-5">
                    Portrait Orders Pending
                  </h6>
                </div>
                <Row className="no-gutters widget-chart-wrapper mt-3 mb-3 pl-2 he-auto">
                  <Col md="9">
                    <Sparklines data={sampleData2}>
                      <SparklinesCurve
                        style={{
                          strokeWidth: 3,
                          stroke: "var(--primary)",
                          fill: "none",
                        }}
                      />
                    </Sparklines>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col md="6" xl="3">
            <div className="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-warning border-warning">
              <div className="widget-chat-wrapper-outer">
                <div className="widget-chart-content pt-3 pl-3 pb-1">
                  <div className="widget-chart-flex">
                    <div className="widget-numbers">
                      <div className="widget-chart-flex">
                        {order && Object.keys(order).length != 0 && (
                          <div className="fsize-4">
                            <CountUp
                              start={0}
                              end={list_sell_approved}
                              separator=""
                              decimals={0}
                              decimal=""
                              prefix=""
                              duration="10"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <h6 className="widget-subheading mb-0 opacity-5">
                    List Sell Approved Orders
                  </h6>
                </div>
                <Row className="no-gutters widget-chart-wrapper mt-3 mb-3 pl-2 he-auto">
                  <Col md="9">
                    <Sparklines data={sampleData3}>
                      <SparklinesCurve
                        style={{
                          strokeWidth: 3,
                          stroke: "var(--warning)",
                          fill: "none",
                        }}
                      />
                    </Sparklines>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col md="6" xl="3">
            <div className="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-danger border-danger">
              <div className="widget-chat-wrapper-outer">
                <div className="widget-chart-content pt-3 pl-3 pb-1">
                  <div className="widget-chart-flex">
                    <div className="widget-numbers">
                      <div className="widget-chart-flex">
                        <div className="fsize-4">
                          {order && Object.keys(order).length != 0 && (
                            <CountUp
                              start={0}
                              end={list_sell_request}
                              separator=""
                              decimals={0}
                              decimal=""
                              prefix=""
                              duration="10"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <h6 className="widget-subheading mb-0 opacity-5">
                    List Sell Request Orders
                  </h6>
                </div>
                <Row className="no-gutters widget-chart-wrapper mt-3 mb-3 pl-2 he-auto">
                  <Col md="9">
                    <Sparklines data={sampleData4}>
                      <SparklinesCurve
                        style={{
                          strokeWidth: 3,
                          stroke: "var(--danger)",
                          fill: "none",
                        }}
                      />
                    </Sparklines>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <div className="card no-shadow bg-transparent no-border rm-borders mb-3">
          <Card>
            <Row className="no-gutters">
              <Col md="12" lg="4">
                <ListGroup flush>
                  <ListGroupItem className="bg-transparent">
                    <div className="widget-content p-0">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <div className="widget-heading">Total Orders</div>
                            <div className="widget-subheading">
                              Total Orders
                            </div>
                          </div>
                          <div className="widget-content-right">
                            <div className="widget-numbers text-success">
                              {order &&
                                Object.keys(order).length != 0 &&
                                order.count}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md="12" lg="4">
                <ListGroup flush>
                  <ListGroupItem className="bg-transparent">
                    <div className="widget-content p-0">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <div className="widget-heading">Seller</div>
                            <div className="widget-subheading">
                              Seller Products
                            </div>
                          </div>
                          <div className="widget-content-right">
                            {order && Object.keys(order).length != 0 && (
                              <div className="widget-numbers text-danger">
                                {sellerProducts}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md="12" lg="4">
                <ListGroupItem className="bg-transparent">
                  <div className="widget-content p-0">
                    <div className="widget-content-outer">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                          <div className="widget-heading">Admin Product</div>
                          <div className="widget-subheading">
                            Products of Admin
                          </div>
                        </div>
                        <div className="widget-content-right">
                          {order && Object.keys(order).length != 0 && (
                            <div className="widget-numbers text-warning">
                              {adminProducts}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              </Col>
            </Row>
          </Card>
        </div>
      </Container>
    </Fragment>
  );
}
