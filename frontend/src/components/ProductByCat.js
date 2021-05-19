import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import HoverRating from "./HoverRating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded shadow-sm p-3 mb-5 bg-white rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          height="380px"
          width="100%"
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>{" "}
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <HoverRating value={product.rating} />
        </Card.Text>

        <Card.Text as="p">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
