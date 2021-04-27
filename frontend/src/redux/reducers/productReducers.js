import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  // PRODUCT_LIST_ADMIN_REQUEST,
  // PRODUCT_LIST_ADMIN_SUCCESS,
  // PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
  PRODUCT_BEST_RATED_REQUEST,
  PRODUCT_BEST_RATED_SUCCESS,
  PRODUCT_BEST_RATED_FAIL,
} from "../types";

//LIST ALL PRODUCTS
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//LIST ALL PRODUCTS FOR ADMIN
// export const productListAdminReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_LIST_ADMIN_REQUEST:
//       return {
//         loading: true,
//         products: [],
//       };
//     case PRODUCT_LIST_ADMIN_SUCCESS:
//       return {
//         loading: false,
//         products: action.payload,
//       };
//     case PRODUCT_LIST_ADMIN_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

//PRODUCTDETAILS
export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

//DELETE A PRODUCT
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//CREATE A PRODUCT
export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//UPDATE A PRODUCT
export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

//REVIEW A PRODUCT
export const productReviewReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

//REVIEW A PRODUCT
export const productBestRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_BEST_RATED_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_BEST_RATED_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_BEST_RATED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
