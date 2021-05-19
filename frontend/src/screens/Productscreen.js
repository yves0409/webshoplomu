import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listProductsDetail,
  createReview,
} from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { PRODUCT_CREATE_RESET } from "../redux/types";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Spinners from "../components/Spinners";
import Notification from "../components/Notification";
import Alert from "@material-ui/lab/Alert";

const Productscreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReview = useSelector((state) => state.productReview);
  const { success: successReview, error: errorReview } = productReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successReview) {
      alert("Your review has been submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    dispatch(listProductsDetail(match.params.id));
  }, [dispatch, match, successReview]);

  ///ADD TO CART///
  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push("/cart");
  };

  ///SUBMIT RATING FORM///
  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(match.params.id, { rating, comment }));
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <KeyboardBackspaceIcon
        className="bg-dark text-white rounded mb-2"
        onClick={goBack}
      />
      {loading ? (
        <Spinners />
      ) : error ? (
        <Notification>{error}</Notification>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                height="60%"
                width="80%"
              />
              <hr />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />{" "}
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  <FormatQuoteIcon
                    fontSize="small"
                    style={{
                      marginBottom: "10px",
                    }}
                  />
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <p>{product.countInStock} in Stock</p>
                        ) : (
                          "Not in Stock"
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    {!userInfo ? (
                      <Link to="/login">
                        <Alert severity="info" variant="outlined">
                          Please Login before adding to cart
                        </Alert>
                      </Link>
                    ) : (
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>

              {product.reviews.length === 0 && (
                <Notification>No reviews yet</Notification>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />

                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Customer review</h4>
                  {errorReview && (
                    <Notification variant="danger">{errorReview}</Notification>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitFormHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rate</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select a number</option>
                          <option value="1">1 - low</option>
                          <option value="2">2 - average</option>
                          <option value="3">3 - good</option>
                          <option value="4">4 - very good</option>
                          <option value="5">5 - excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Leave a Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Notification>
                      Please <Link to="/login">sign in </Link>to review a
                      product
                    </Notification>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Productscreen;
