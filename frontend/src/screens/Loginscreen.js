import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import Notification from "../components/Notification";
import Spinners from "../components/Spinners";
import FormContainer from "../components/FormContainer";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import Google from "../Google";
import Facebook from "../Facebook";
import { USER_LOGIN_SUCCESS } from "../redux/types";

const Loginscreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if ((userInfo, loading)) {
      const push = history.push;
      setTimeout(() => push(redirect), 2000);
    }
  }, [history, userInfo, redirect, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const googleLog = (response) => {
    console.log("googlelogin response =>", response.isAdmin);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response,
    });

    if (dispatch) {
      const push = history.push;
      setTimeout(() => push(redirect), 2000);
    }
  };

  const facebookLog = (response) => {
    console.log("googlelogin response =>", response);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response,
    });

    if (dispatch) {
      const push = history.push;
      setTimeout(() => push(redirect), 2000);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {userInfo && <Alert severity="success">LOGIN SUCCESSFUL !</Alert>}

      {error && <Notification variant="danger">{error}</Notification>}
      {loading && <Spinners />}
      <Google googleLog={googleLog} />
      <Facebook facebookLog={facebookLog} />

      <Form onSubmit={submitHandler}>
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
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>

      <Row className="py-3 bg-warning my-2 rounded">
        <Col>
          New to LoMu ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register now
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Loginscreen;
