import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import Spinners from "../components/Spinners";
import Notification from "../components/Notification";
import { listProducts } from "../redux/actions/productActions";
import { listOrdersAdmin } from "../redux/actions/orderActions";
import { listUsers } from "../redux/actions/userActions";
import { listBestRatedProducts } from "../redux/actions/productActions";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import moment from "moment";
import DasboardOverviewCard from "../components/DasboardOverviewCard";
import DashboardProgressCard from "../components/DashboardProgressCard";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";

const opacity = {
  backgroundColor: "rgba(245, 245, 245, 0.6)",
};

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderListAdmin = useSelector((state) => state.orderListAdmin);
  const { orders } = orderListAdmin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const productList = useSelector((state) => state.productList);
  // const { products } = productList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const productBestRated = useSelector((state) => state.productBestRated);
  const { loading, error, ratedproducts } = productBestRated;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("./login");
    } else {
      dispatch(listProducts());
      dispatch(listOrdersAdmin());
      dispatch(listUsers());
      dispatch(listBestRatedProducts());
    }
  }, [dispatch, history, userInfo]);

  ////GETTING CURRENT DATE AND MONTH
  let today = moment();
  const currentMonth = today.format("MMMM");

  ///GETTING THE ORDERS THAT WERE MADE LAST WEEK
  // const startLastWeek = moment()
  //   .subtract(1, "weeks")
  //   .startOf("week")
  //   .toISOString();
  const endLastWeek = moment().subtract(1, "weeks").endOf("week").toISOString();
  //const startThisWeek = moment()
  //  .subtract(0, "weeks")
  //  .startOf("week")
  //  .toISOString();
  //const endThisWeek = moment().subtract(0, "weeks").endOf("week").toISOString();
  const startCurrentMonth = moment()
    .subtract(0, "months")
    .startOf("month")
    .toISOString();
  const StartPreviousMonth = moment()
    .subtract(1, "months")
    .startOf("month")
    .toISOString();
  const endLastMonth = moment()
    .subtract(1, "months")
    .endOf("month")

    .toISOString();

  ////REVENUE OF ACTIVE MONTH
  const currentMonthOrders = orders.filter(function (item) {
    if (item.createdAt >= startCurrentMonth) {
      return true;
    } else {
      return false;
    }
  });
  const monthTotalOrders = currentMonthOrders
    .reduce(function (tot, arrayItem) {
      return tot + arrayItem.totalPrice;
    }, 0)
    .toFixed(2);

  ////REVENUE OF PREVIOUS MONTH
  const previousMonthOrders = orders.filter(function (item) {
    if (
      item.createdAt >= StartPreviousMonth &&
      item.createdAt <= endLastMonth
    ) {
      return true;
    } else {
      return false;
    }
  });
  const previousTotalOrders = previousMonthOrders
    .reduce(function (tot, arrayItem) {
      return tot + arrayItem.totalPrice;
    }, 0)
    .toFixed(2);

  ////ORDERS MADE THIS WEEK////////////
  const newOrderCount = orders.filter(function (item) {
    if (item.createdAt > endLastWeek) {
      return true;
    } else {
      return false;
    }
  }).length;

  ////NEW USERS THIS WEEK//////////
  const newUserCount = users.filter(function (item) {
    if (item.createdAt >= endLastWeek) {
      return true;
    } else {
      return false;
    }
  }).length;

  /////WEEK ORDER TOTAL
  const weekOrders = orders.filter(function (item) {
    if (item.createdAt >= endLastWeek) {
      return true;
    } else {
      return false;
    }
  });

  ///WEEK ORDERS TOTAL II
  const weekTotalOrders = weekOrders
    .reduce(function (tot, arrayItem) {
      return tot + arrayItem.totalPrice;
    }, 0)
    .toFixed(2);

  ////TOTAL $ ALL ORDERS
  const monthlyTotal = orders
    .reduce(function (tot, arrayItem) {
      return tot + arrayItem.totalPrice;
    }, 0)
    .toFixed(2);

  ///VARIABLES TO COMPARE THE PROGRESS
  const monthlyGoal = 5000; //GOAL
  const progress = (monthlyTotal * 100) / monthlyGoal; //CURRENT % OF GOAL REACHED
  const lastMonthRevenue = (previousTotalOrders * 100) / monthlyGoal; //CURRENT % OF GOAL REACHED
  const lastMonthRevenueTofixed = lastMonthRevenue.toFixed(0);
  const currentProgress = progress.toFixed(2); //TO FIXED
  const lastMonth = 30; //LAST MONTH IN %
  const increase = (progress - lastMonth).toFixed(0) / lastMonth; //NO NEED
  const decrease = (lastMonth - progress).toFixed(0) / lastMonth; //NO NEED
  const finalResult = (increase * 100).toFixed(0); //INCREASE
  const finaldecreaseResult = (decrease * 100).toFixed(0); //DECREASE

  //TOTAL ORDERS FOR CURRENT (ACTIVE) MONTH////
  const currentOrderTotal = (num) =>
    orders.filter((item) => {
      const date = new Date(item.createdAt);
      const orderCreatedDate = moment(date.toISOString());
      const startCurrMonth = moment()
        .subtract(num, "months")
        .startOf("month")
        .toISOString();
      const endCurrMonth = moment()
        .subtract(num, "months")
        .endOf("month")
        .toISOString();

      if (
        orderCreatedDate.isBetween(startCurrMonth, endCurrMonth, null, "[)")
      ) {
        return true;
      } else {
        return false;
      }
    }).length;

  ////NUMBER OF ORDERS MADE PER MONTH (NOT BY CATEGORY)/////
  const monthlyCategoryTotal = (num) =>
    orders.filter((item) => {
      const date = new Date(item.createdAt);
      const orderCreatedDate = moment(date.toISOString());
      const startCurrMonth = moment()
        .subtract(num, "months")
        .startOf("month")
        .toISOString();
      const endCurrMonth = moment()
        .subtract(num, "months")
        .endOf("month")
        .toISOString();

      if (
        orderCreatedDate.isBetween(startCurrMonth, endCurrMonth, null, "[)")
      ) {
        return true;
      } else {
        return false;
      }
    });

  /////NUMBER OF ORDERS PER MONTH/PER CATEGORY///////
  const CategoryTotalPerMonth = (numb, category) => {
    const categoryTotals = monthlyCategoryTotal(numb).reduce((acc, order) => {
      for (const { category } of order.orderItems) {
        if (category in acc) acc[category] += 1;
        else acc[category] = 1;
      }
      return acc;
    }, {});

    for (const [key, value] of Object.entries(categoryTotals)) {
      if (key === category) return value;
    }
  };

  const totalOrders = orders.length; //TOTAL ORDERS
  const currentMonthTotalOrders = currentOrderTotal(0);
  const monthlyOrderGoal = 60; //GOAL
  const orderProgress = (currentMonthTotalOrders * 100) / monthlyOrderGoal; //CURRENT % OF GOAL REACHED
  const currentOrderProgress = orderProgress.toFixed(2); //TO FIXED
  const lastMonthsOrders = currentOrderTotal(1); //LAST MONTH IN %
  const orderIncrease =
    (orderProgress - lastMonthsOrders).toFixed(0) / lastMonth; //NO NEED
  const orderDecrease =
    (lastMonthsOrders - orderProgress).toFixed(0) / lastMonth; //NO NEED
  const finalOrderResult = (orderIncrease * 100).toFixed(0); //INCREASE
  const finalOrderDecreaseResult = (orderDecrease * 100).toFixed(0); //DECREASE

  return (
    <>
      <h1 className="pb-4 mb-4">Dashboard</h1>
      <div className="py-3" style={opacity}>
        <h2>Summary</h2>
        <Row>
          <Col className="col-lg-4">
            <DasboardOverviewCard
              title={`Total : $`}
              subTitle={`Weekly Total USD:$`}
              total={monthlyTotal}
              week={weekTotalOrders}
              icon={<AccountBalanceOutlinedIcon style={{ fontSize: "60px" }} />}
              link={`productlist`}
            />
          </Col>
          <Col className="col-lg-4">
            <DasboardOverviewCard
              title={`Total Users :`}
              subTitle={` New users this week:`}
              total={users.length}
              week={newUserCount}
              icon={<PersonOutlineOutlinedIcon style={{ fontSize: "60px" }} />}
              link={`userlist`}
            />
          </Col>
          <Col className="col-lg-4">
            <DasboardOverviewCard
              title={`Order Total :`}
              subTitle={` New orders this week:`}
              total={totalOrders}
              week={newOrderCount}
              icon={<ShoppingCartOutlinedIcon style={{ fontSize: "60px" }} />}
              link={`orderlist`}
            />
          </Col>
        </Row>
        <h2>orders</h2>
        <Row>
          <Col className="col-lg-6">
            <DashboardProgressCard
              currentMonth={currentMonth}
              monthlyTotal={monthTotalOrders}
              currentProgress={currentProgress}
              lastMonth={lastMonthRevenueTofixed}
              finalResult={finalResult}
              finaldecreaseResult={finaldecreaseResult}
              title={`Revenue`}
              subTitle={`Revenue as of today is: $`}
            />
          </Col>
          <Col className="col-lg-6">
            <DashboardProgressCard
              currentMonth={currentMonth}
              monthlyTotal={currentMonthTotalOrders}
              currentProgress={currentOrderProgress}
              lastMonth={lastMonthsOrders}
              finalResult={finalOrderResult}
              finaldecreaseResult={finalOrderDecreaseResult}
              title={`Orders`}
              subTitle={`This months orders: `}
            />
          </Col>
        </Row>
        <h2>Progress per Month</h2>
        <Row>
          <Col className="col-lg-6">
            <LineChart CategoryTotalPerMonth={CategoryTotalPerMonth} />
          </Col>
          <Col className="col-lg-6">
            <BarChart currentOrderTotal={currentOrderTotal} />
          </Col>
        </Row>
        <h2>Best Rated</h2>
        <Row style={{ margin: "20px auto" }}>
          <Col lg={12}>
            {loading ? (
              <Spinners />
            ) : error ? (
              <Notification variant="danger">{error}</Notification>
            ) : (
              <Table responsive="sm" striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                    <th>InStock</th>
                  </tr>
                </thead>
                <tbody>
                  {ratedproducts.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.rating}</td>
                      <td>{item.numReviews}</td>
                      <td>{item.countInStock}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardScreen;
