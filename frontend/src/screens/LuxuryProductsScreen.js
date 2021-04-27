import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import ProductByCat from "../components/ProductByCat";
import Spinners from "../components/Spinners";
import Notification from "../components/Notification";
import { Row, Col } from "react-bootstrap";

const LuxuryProductsScreen = ({ match }) => {
  //const keyword = match.params.keyword;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  console.log(products);
  return (
    <>
      <h1>Luxury</h1>
      {loading ? (
        <Spinners />
      ) : error ? (
        <Notification variant="danger">{error}</Notification>
      ) : (
        <Row>
          {products
            .filter((product) => product.category === "Luxury")
            .map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <ProductByCat product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default LuxuryProductsScreen;
