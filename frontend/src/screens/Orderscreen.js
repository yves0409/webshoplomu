import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Row, Col, Image, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//COMPONENTS
import Notification from "../components/Notification";
import Spinners from "../components/Spinners";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetail,
  payOrder,
  deliverOrder,
} from "../redux/actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../redux/types";

const Orderscreen = ({ match, history }) => {
  //Grab the id from the params
  const orderId = match.params.id;

  //paypal
  const [sdkready, setSdkReady] = useState(false);

  //redux..
  const dispatch = useDispatch();

  //Grabbing the orderCreate from the state and destructure order,success and error
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  //Grabbing the orderPay from the state and destructure AND rename order,success and loading
  const orderPay = useSelector((state) => state.orderPay);
  const { succes: successPay, loading: loadingPay } = orderPay;

  //Grabbing the orderPay from the state and destructure AND rename order,success and loading
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { succes: successDeliver, loading: loadingDeliver } = orderDeliver;

  //Grabbing the orderPay from the state and destructure AND rename order,success and loading
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    //Calculate \Total Price Item before tax/shipping
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
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
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

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
                <Notification variant="success">
                  Delivered On {order.deliveredAt}
                </Notification>
              ) : (
                <Notification variant="danger">Not Delivered Yet</Notification>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Notification variant="success">
                  Paid On {order.paidAt}
                </Notification>
              ) : (
                <Notification variant="danger">Not Paid Yet</Notification>
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
