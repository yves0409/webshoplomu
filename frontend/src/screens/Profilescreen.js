import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Notification from "../components/Notification";
import Spinners from "../components/Spinners";
import { useSelector, useDispatch } from "react-redux";
import { USER_UPDATE_PROFILE_RESET } from "../redux/types";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import { listMyOrders } from "../redux/actions/orderActions";

const opacity = {
  backgroundColor: "rgba(245, 245, 245, 0.6)",
};

const Profilescreen = ({ location, history }) => {
  console.log("profilescreen loads");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails); //store(reducer)
  const { loading, user, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin); //store(reducer)
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile); //store(reducer)
  const { success } = userUpdateProfile;

  const orderList = useSelector((state) => state.orderList); //store(reducer)
  const { loading: loadingOrders, orders, error: errorOrders } = orderList;

  useEffect(() => {
    if (!userInfo || !user) {
      history.push("/login");
    } else {
      if (!user.name || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("/profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Notification variant="danger">{message}</Notification>}
        {success && (
          <Notification variant="success">Updated succesfully</Notification>
        )}
        {error && <Notification variant="danger">{error}</Notification>}
        {loading && <Spinners />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Adress</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Spinners />
        ) : errorOrders ? (
          <Notification variant="danger">{errorOrders}</Notification>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive="md"
            size="sm"
            style={opacity}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "130px",
                        }}
                      >
                        <i
                          className="fas fa-check"
                          style={{ color: "green " }}
                        ></i>
                        on {order.paidAt.substring(0, 10)}
                      </div>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red " }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red " }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default Profilescreen;
