import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";

const OrderListTable = ({ adminOrder }) => {
  return (
    <tr>
      <td>{adminOrder._id}</td>

      <td>{adminOrder.user && adminOrder.user.name}</td>

      <td>{moment(adminOrder.createdAt).format("YYYY/MM/DD")}</td>
      <td>
        {adminOrder.isPaid ? (
          moment(adminOrder.paidAt).format("YYYY/MM/DD")
        ) : (
          <i className="fas fa-times" style={{ color: "red" }}></i>
        )}
      </td>
      <td>
        {" "}
        {adminOrder.isDelivered ? (
          moment(adminOrder.deliveredAt).format("YYYY/MM/DD")
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
