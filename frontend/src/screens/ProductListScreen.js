import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import Notification from "../components/Notification";
import Spinners from "../components/Spinners";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import {
  listProducts,
  deleteListProduct,
  createProduct,
} from "../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../redux/types";
import ReactPaginate from "react-paginate";
import ProductListTable from "../components/ProductListTable";

const opacity = {
  backgroundColor: "rgba(245, 245, 245, 0.6)",
};

const ProductListScreen = ({ history, match }) => {
  const keyword = match.params.keyword;
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(3);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDel,
    error: errorDel,
    success: successDel,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    console.log("useEffect fired");
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("./login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
      console.log("getData is fired");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDel,
    successCreate,
    createdProduct,
    keyword,
  ]);

  // const getData = async () => {
  //   dispatch(listProducts(keyword));
  // };

  //DELETE HANDLER
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you wanna delete this product?")) {
      dispatch(deleteListProduct(id));
    }
  };

  ////////PAGINATION///////////////////
  console.log(products);
  const offset = currentPage * perPage;
  const currentPageData = products
    .slice(offset, offset + perPage)
    .map((adminProduct) => (
      <ProductListTable
        key={adminProduct._id}
        adminProduct={adminProduct}
        deleteProduct={deleteHandler}
      />
    ));
  const pageCount = Math.ceil(products.length / perPage);

  //CREATE HANDLER
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  //PAGE HANDLER
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
          <Route render={({ history }) => <Search history={history} />} />
        </Col>
        <Col className="text-right">
          <Button
            className="my-3  rounded"
            variant="outline-dark"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Create new Product
          </Button>
        </Col>
      </Row>

      {loadingDel && <Spinners />}
      {errorDel && <Notification variant="danger">{errorDel}</Notification>}
      {loadingCreate && <Spinners />}
      {errorCreate && (
        <Notification variant="danger">{errorCreate}</Notification>
      )}
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
                <th>PREVIEW</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
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

export default ProductListScreen;
