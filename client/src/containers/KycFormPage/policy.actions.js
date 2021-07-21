import {
  POLICY_CREATE_REQUEST,
  POLICY_CREATE_SUCCESS,
  POLICY_CREATE_FAIL,
} from "./policy.constants";

import api from "../../api";

export const createPolicy = (policy) => async (dispatch, getState) => {
  try {
    dispatch({ type: POLICY_CREATE_REQUEST });

    const formData = new FormData();
    formData.append("first_name", policy.first_name);
    formData.append("last_name", policy.last_name);
    formData.append("phone", policy.mobile_number);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { data } = await api.post(`/policy`, formData, config);

    dispatch({ type: POLICY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POLICY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
