import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import Notification from "./Notification";
import Spinners from "./Spinners";
import { listBestRatedProducts } from "../redux/actions/productActions";

const opacity = {
  //backgroundColor: "rgba(245, 245, 245, 0.2)",
  //backgroundColor: "rgba(128, 128, 128, 0.2)",
  //backgroundColor: "rgba(179, 255, 255, 0.2)",
  //backgroundColor: "rgba(204, 221, 255, 0.2)",
  backgroundColor: "rgba(0, 26, 51, 0.1)",
};

const HomePageCarrousel = () => {
  const dispatch = useDispatch();
  const productBestRated = useSelector((state) => state.productBestRated);
  const { loading, error, products } = productBestRated;

  useEffect(() => {
    dispatch(listBestRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Spinners />
  ) : error ? (
    <Notification variant="danger">{error}</Notification>
  ) : (
    <Carousel pause="hover" style={opacity}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carrousel-caption">
              <h4>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HomePageCarrousel;
