import axios from "axios";
//IMPORT TYPE VARIABLES
import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAIL } from "../types";

export const contactList = () => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_REQUEST });
    //url it will make the request to
    const { data } = await axios.get("/api/contacts");
    //console.log(data[0].email);

    dispatch({ type: CONTACT_SUCCESS, payload: data[0] });
  } catch (error) {
    dispatch({
      type: CONTACT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
