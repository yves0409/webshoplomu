import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { listOrdersAdmin } from "../redux/actions/orderActions";
import ReactPaginate from "react-paginate";
import Notification from "../components/Notification";
import Spinners from "../components/Spinners";
import OrderListTable from "../components/OrderListTable";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const opacity = {
  backgroundColor: "rgba(245, 245, 245, 0.6)",
};

const OrderListScreen = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(3);

  const dispatch = useDispatch();

  const orderListAdmin = useSelector((state) => state.orderListAdmin);
  const { loading, error, orders } = orderListAdmin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrdersAdmin());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  //PAGINATION
  const offset = currentPage * perPage;
  const currentPageData = orders
    .slice(offset, offset + perPage)
    .map((adminOrder) => (
      <OrderListTable key={adminOrder._id} adminOrder={adminOrder} />
    ));
  const pageCount = Math.ceil(orders.length / perPage);

  //PAGE HANDLER
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  };

  //GOBACKHANDLER//
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <h1>Orders</h1>
      <KeyboardBackspaceIcon
        className="bg-dark text-white rounded mb-2"
        onClick={goBack}
      />
      {loading ? (
        <Spinners />
      ) : error ? (
        <Notification variant="danger">{error}</Notification>
      ) : (
        <div>
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm"
            style={opacity}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>USERNAME</th>
                <th>ORDER DATE</th>
                <th>PAID ON</th>
                <th>DELIVERED ON</th>
              </tr>
            </thead>
            <tbody>{currentPageData}</tbody>
          </Table>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      )}
    </>
  );
};

export default OrderListScreen;
