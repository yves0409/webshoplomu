import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Row, Col, Image, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";
import Spinners from "../components/Spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetail,
  payOrder,
  deliverOrder,
} from "../redux/actions/orderActions";
import moment from "moment";
import Alert from "@material-ui/lab/Alert";

import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../redux/types";

const Orderscreen = ({ match, history }) => {
  const orderId = match.params.id;
  const [sdkready, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { succes: successPay, loading: loadingPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { succes: successDeliver, loading: loadingDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    //CALCULATE TOTAL PRICE ORDER///
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    ///PAYPAL///
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetail(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, orderId, successPay, successDeliver, order]);

  ///SUCCESS PAYMENT///
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  ///MARK AS DELIVERED///
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Spinners />
  ) : error ? (
    <Notification variant="danger">{error}</Notification>
  ) : (
    <>
      <h2>Order: {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Adress:</strong> {order.shippingAdress.adress},
                {order.shippingAdress.city},{order.shippingAdress.postalCode},
                {order.shippingAdress.country}
              </p>
              {order.isDelivered ? (
                <Alert severity="success">
                  Delivered On {moment(order.deliveredAt).format("LLLL")}
                </Alert>
              ) : (
                <Alert severity="error">Not Delivered Yet</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert severity="success">
                  Paid on {moment(order.paidAt).format("LLLL")}
                </Alert>
              ) : (
                <Alert severity="error">Not Paid Yet</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Notification>You Currently have no orders</Notification>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {order._id && !order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Spinners />}
                  {!sdkready ? (
                    <Spinners />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Spinners />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered &&
                (console.log(userInfo, order),
                (
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Orderscreen;
