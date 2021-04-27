import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/admin/productlist/search/${keyword}`);
    } else {
      history.goBack();
    }
  };
  return (
    <>
      <Form className="customForm" onSubmit={submitSearchHandler}>
        <input
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="find a product"
        />

        <i
          className="fa fa-search"
          type="submit"
          onClick={submitSearchHandler}
        ></i>
      </Form>
    </>
  );
};

export default Search;
