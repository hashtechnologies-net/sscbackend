import {
  POLICY_CREATE_REQUEST,
  POLICY_CREATE_RESET,
  POLICY_CREATE_FAIL,
  POLICY_CREATE_SUCCESS,
} from "../constants/policy.constants";

const initialState = {
  policyCreate: {},
  policyCreateLoading: false,
  policyCreateError: null,
  policyCreateSuccess: false,
};

export const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    case POLICY_CREATE_REQUEST:
      return {
        ...state,
        policyCreateLoading: true,
        policyCreate: {},
        policyCreateSuccess: false,
        policyCreateError: null,
      };
    case POLICY_CREATE_SUCCESS:
      return {
        ...state,
        policyCreateLoading: false,
        policyCreate: action.payload,
        policyCreateSuccess: true,
        policyCreateError: null,
      };
    case POLICY_CREATE_FAIL:
      return {
        ...state,
        policyCreateLoading: false,
        policyCreate: {},
        policyCreateSuccess: false,
      };
    default:
      return state;
  }
};

export default policyReducer;
