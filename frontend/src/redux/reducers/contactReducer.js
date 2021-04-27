import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAIL } from "../types";

export const contactReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case CONTACT_REQUEST:
      return {
        loading: true,
        contacts: [],
      };
    case CONTACT_SUCCESS:
      return {
        loading: false,
        contacts: action.payload,
      };
    case CONTACT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
