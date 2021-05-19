import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//PRODUCTREDUCERS
import {
  productListReducer,
  // productListAdminReducer,
  productDetailReducer,
  deleteProductReducer,
  createProductReducer,
  updateProductReducer,
  productReviewReducer,
  productBestRatedReducer,
} from "../redux/reducers/productReducers";
//CONTACTREDUCER
import { contactReducer } from "../redux/reducers/contactReducer";
//CARTREDUCERS
import { cartReducer } from "../redux/reducers/cartReducers";
//USERREDUCERS
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "../redux/reducers/userReducers";
//ORDERREDUCERS
import {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListReducer,
  orderListAdminReducer,
} from "../redux/reducers/orderReducers";

const reducer = combineReducers({
  listContact: contactReducer,
  productList: productListReducer,
  productDetails: productDetailReducer,
  productDelete: deleteProductReducer,
  productCreate: createProductReducer,
  productUpdate: updateProductReducer,
  productReview: productReviewReducer,
  productBestRated: productBestRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  orderListAdmin: orderListAdminReducer,
  userUpdate: userUpdateReducer,
});

//if cartItem is in localStorage , set it to the cartItemFromStorage variable
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

//if userInfo is in localStorage , set it to the userInfoFromStorage variable
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//if shippingAdress is in localStorage , set it to the shippingAdressFromStorage variable
const shippingAdressFromStorage = localStorage.getItem("shippingAdress")
  ? JSON.parse(localStorage.getItem("shippingAdress"))
  : {};

//if cartItem or userInfo is in the localStorage add it to the initialState
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAdress: shippingAdressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
