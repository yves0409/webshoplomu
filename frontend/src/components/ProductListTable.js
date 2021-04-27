import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductListTable = ({ adminProduct, deleteProduct }) => {
  return (
    <tr>
      <td>{adminProduct._id}</td>
      <td>
        <img
          src={adminProduct.image}
          height="75px"
          width="55px"
          alt="product"
        />
      </td>
      <td>{adminProduct.name}</td>
      <td>${adminProduct.price}</td>
      <td>{adminProduct.category}</td>
      <td>{adminProduct.brand}</td>
      <td>
        <LinkContainer to={`/admin/product/${adminProduct._id}/edit`}>
          <Button variant="light" className="btn-sm">
            <i className="fas fa-edit"></i>
          </Button>
        </LinkContainer>
        <Button
          variant="danger"
          className="btn-sm"
          onClick={() => {
            deleteProduct(adminProduct._id);
          }}
        >
          <i className="fas fa-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ProductListTable;
