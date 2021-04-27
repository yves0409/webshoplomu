import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
//import Rating from "./Rating";

const Product = ({ product }) => {
  let history = useHistory();

  const clickedBtn = (event) => {
    //console.log(event.currentTarget.dataset.id);
    if (event.currentTarget.dataset.id === "1") {
      history.push("/fruity");
    } else if (event.currentTarget.dataset.id === "2") {
      history.push("/casual");
    } else {
      history.push("/luxury");
    }
  };

  const bg = { backgroundColor: "rgba(245, 245, 245, 0.3)" };

  return (
    <Card className="my-3 p-3 rounded shadow-sm p-3 mb-5  rounded" style={bg}>
      <Card.Img
        src={product.image}
        variant="top"
        data-id={product.cat}
        onClick={clickedBtn}
        height="auto"
        width="100%"
      />

      <Card.Body>
        <Link to={"/allproducts"}>
          <Card.Title as="div">
            <h2>{product.name}</h2>{" "}
          </Card.Title>
        </Link>
        <Card.Text as="h6" className="text-center text-secondary">
          Starts at ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
