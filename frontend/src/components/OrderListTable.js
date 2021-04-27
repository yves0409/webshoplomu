import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const OrderListTable = ({ adminOrder }) => {
  return (
    <tr>
      <td>{adminOrder._id}</td>

      <td>{adminOrder.user && adminOrder.user.name}</td>
      <td>{adminOrder.createdAt.substring(0, 10)}</td>
      <td>
        {adminOrder.isPaid ? (
          adminOrder.paidAt.substring(0, 10)
        ) : (
          <i className="fas fa-times" style={{ color: "red" }}></i>
        )}
      </td>
      <td>
        {" "}
        {adminOrder.isDelivered ? (
          adminOrder.deliveredAt.substring(0, 10)
        ) : (
          <i className="fas fa-times" style={{ color: "red" }}></i>
        )}
      </td>
      <td>
        <LinkContainer to={`/order/${adminOrder._id}`}>
          <Button variant="light" className="btn-sm">
            Detail
          </Button>
        </LinkContainer>
      </td>
    </tr>
  );
};

export default OrderListTable;
