import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import Notification from "./Notification";

import { listBestRatedProducts } from "../redux/actions/productActions";

const opacity = {
  backgroundColor: "rgba(0, 26, 51, 0.1)",
};

const HomePageCarrousel = () => {
  const dispatch = useDispatch();
  const productBestRated = useSelector((state) => state.productBestRated);
  const { loading, error, ratedproducts } = productBestRated;

  useEffect(() => {
    dispatch(listBestRatedProducts());
  }, [dispatch]);

  return loading ? (
    <></>
  ) : error ? (
    <Notification variant="danger">{error}</Notification>
  ) : (
    <Carousel pause="hover" style={opacity}>
      {ratedproducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carrousel-caption">
              <h5>{product.name}</h5>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HomePageCarrousel;
