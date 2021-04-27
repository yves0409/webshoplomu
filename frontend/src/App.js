import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";
import Cartscreen from "./screens/Cartscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Profilescreen from "./screens/Profilescreen";
import Shippingscreen from "./screens/Shippingscreen";
import Paymentscreen from "./screens/Paymentscreen";
import PlaceOrderscreen from "./screens/PlaceOrderscreen";
import Orderscreen from "./screens/Orderscreen";
import UserListscreen from "./screens/UserListscreen";
import UserEditscreen from "./screens/UserEditscreen";
import Background from "./bgim/lomubg.jpg";
import FruityProductsScreen from "./screens/FruityProductsScreen";
import CasualProductsScreen from "./screens/CasualProductsScreen";
import LuxuryProductsScreen from "./screens/LuxuryProductsScreen";
import ContactScreen from "./screens/ContactScreen";
import ProductListScreen from "./screens/ProductListScreen";
import EditProductScreen from "./screens/EditProductScreen";
import OrderListScreen from "./screens/OrderListScreen";
//import Dashboard from "./screens/Dashboard";

const App = () => {
  return (
    <Router>
      <main
        className="py-3"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />

        <Container>
          <Route path="/shipping" component={Shippingscreen} />
          <Route path="/payment" component={Paymentscreen} />
          <Route path="/placeorder" component={PlaceOrderscreen} />
          <Route path="/order/:id" component={Orderscreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/login" component={Loginscreen} />
          <Route path="/register" component={Registerscreen} />
          <Route path="/profile" component={Profilescreen} />
          <Route path="/product/:id" component={Productscreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          {/* <Route path="/admin/dashboard" component={Dashboard} /> */}
          <Route path="/admin/product/:id/edit" component={EditProductScreen} />
          <Route path="/cart/:id?" component={Cartscreen} />
          <Route path="/contacts" component={ContactScreen} />
          <Route path="/admin/userlist" component={UserListscreen} />
          <Route path="/admin/user/:id/edit" component={UserEditscreen} />
          <Route path="/fruity" component={FruityProductsScreen} />
          <Route path="/casual" component={CasualProductsScreen} />
          <Route path="/luxury" component={LuxuryProductsScreen} />
          <Route
            path="/admin/productlist/search/:keyword"
            component={ProductListScreen}
          />
          <Route path="/" component={Homescreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
