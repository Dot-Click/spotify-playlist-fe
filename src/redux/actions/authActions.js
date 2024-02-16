import { authConstants } from "../constants/authConstants";
import custAxios, { attachToken, formAxios } from "../../configs/axiosConfig";
import {
  successMessage,
  errorMessage,
  warningMessage,
} from "../../services/helpers";
import { baseURL } from "../../configs/axiosConfig";

export const signup = (values) => async (dispatch) => {
  dispatch({
    type: authConstants.SIGNUP_REQUEST,
  });
  try {
    const res = await custAxios.post(`${baseURL}/auth/register`, values);
    if (res?.data?.res === "success") {
      dispatch({
        type: authConstants.SIGNUP_SUCCESS,
      });
      successMessage(res?.data.message);
      return "success";
    }
  } catch (error) {
    dispatch({
      type: authConstants.SIGNUP_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error.response.data.message);
  }
};

export const registerWith = (values) => async (dispatch) => {
  dispatch({
    type: authConstants.REGISTER_WITH_REQUEST,
  });
  try {
    const res = await custAxios.post("auth/register-with", values);
    if (res?.data?.res === "success") {
      dispatch({
        type: authConstants.REGISTER_WITH_SUCCESS,
      });
      successMessage(res?.data.message);
      return "success";
    }
  } catch (error) {
    dispatch({
      type: authConstants.REGISTER_WITH_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error.response.data.message);
  }
};

export const loginWith = (values) => async (dispatch) => {
  dispatch({
    type: authConstants.LOGIN_WITH_REQUEST,
  });
  try {
    const res = await custAxios.post("/auth/login-with", values);
    console.log(res);
    if (res?.data?.res === "success") {
      localStorage.setItem("token", res?.data.token.access_token);
      localStorage.setItem("user", JSON.stringify(res?.data.user));

      await dispatch({
        type: authConstants.LOGIN_WITH_SUCCESS,
        payload: res?.data,
      });

      successMessage("Login Successful");
      return res?.data;
    }
  } catch (error) {
    dispatch({
      type: authConstants.LOGIN_WITH_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error.response.data.message);
  }
};

export const login = (values) => async (dispatch) => {
  dispatch({
    type: authConstants.LOGIN_REQUEST,
  });
  try {
    const res = await custAxios.post(`/auth/login`, values);
    console.log("❤❤❤❤❤❤", res);
    if (res?.data?.success) {
      console.log("❤❤❤❤❤❤");
      // if (values.remember_me === true) {
      //   localStorage.setItem("email", values.email);
      //   localStorage.setItem("password", window.btoa(values.password));
      // } else {
      //   localStorage.removeItem("email");
      //   localStorage.removeItem("password");
      // }
      localStorage.setItem("token", res.data.data?.jwtToken);
      localStorage.setItem("user", JSON.stringify(res.data.data?.user));

      await dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: res?.data?.data,
      });
      successMessage("Login Successful");
      return true;
    }
  } catch (error) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error.response.data.message);
  }
};

export const verifyEmail = (values) => async (dispatch) => {
  dispatch({
    type: authConstants.VERIFY_EMAIL_REQUEST,
  });
  try {
    const res = await custAxios.post("/auth/verify-email", values);
    if (res?.data?.res === "success") {
      localStorage.setItem("token", res?.data.token.access_token);
      localStorage.setItem("user", JSON.stringify(res?.data.user));

      localStorage.setItem("token", res?.data.token.access_token);
      localStorage.setItem("user", JSON.stringify(res?.data.user));

      dispatch({
        type: authConstants.VERIFY_EMAIL_SUCCESS,
        payload: res?.data,
      });
      successMessage("Email Verified Successful");
      return "success";
    } else if (res?.data?.res === "warning") {
      dispatch({
        type: authConstants.VERIFY_EMAIL_FAILURE,
        payload: res?.data.message || "Server Error",
      });
      warningMessage(res?.data.message);
    } else if (res?.data?.res === "error") {
      dispatch({
        type: authConstants.VERIFY_EMAIL_FAILURE,
        payload: res?.data.message || "Server Error",
      });
      warningMessage(res?.data.message);
    }
  } catch (error) {
    dispatch({
      type: authConstants.VERIFY_EMAIL_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error.response.data.message);
    if (error.response.data.message.includes("Please generate new token")) {
      return "resend token";
    }
  }
};

export const resendToken = () => async (dispatch) => {
  dispatch({
    type: authConstants.RESEND_TOKEN_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.post("/refresh-token");
    if (res) {
      localStorage.setItem("token", res?.data.token.access_token);
      dispatch({
        type: authConstants.RESEND_TOKEN_SUCCESS,
      });
      successMessage("Verification Token Resent");
      return true;
    }
  } catch (error) {
    dispatch({
      type: authConstants.RESEND_TOKEN_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error.response.data.message);
  }
};

export const forgotPassword = (values) => async (dispatch) => {
  dispatch({
    type: authConstants.REQUEST_VERIFICATION_TOKEN_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.post("/auth/reset-password", values);
    if (res?.data?.res === "success") {
      dispatch({
        type: authConstants.REQUEST_VERIFICATION_TOKEN_SUCCESS,
      });
      successMessage(res?.data.message);
      return "success";
    }
  } catch (error) {
    dispatch({
      type: authConstants.REQUEST_VERIFICATION_TOKEN_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error.response.data.message);
  }
};

export const requestVerificationToken = (email) => async (dispatch) => {
  dispatch({
    type: authConstants.REQUEST_VERIFICATION_TOKEN_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.post("/auth/resend-verify-email", {
      email: email,
    });
    if (res?.data?.res === "success") {
      dispatch({
        type: authConstants.REQUEST_VERIFICATION_TOKEN_SUCCESS,
      });
      successMessage(res?.data.message);
      return "token sent";
    } else {
      dispatch({
        type: authConstants.REQUEST_VERIFICATION_TOKEN_FAILURE,
        payload: res?.data.message || "Server Error",
      });
      errorMessage(res?.data.message);
      return "email verified";
    }
  } catch (error) {
    dispatch({
      type: authConstants.REQUEST_VERIFICATION_TOKEN_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error.response.data.message);
  }
};

export const resetPassword = (values) => async (dispatch) => {
  dispatch({
    type: authConstants.RESET_PASSWORD_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.post("/auth/forgot-password", values);
    if (res?.data?.res === "success") {
      successMessage(res?.data.message);
      await dispatch(login({ email: values.email, password: values.password }));
      return "success";
    }
  } catch (error) {
    dispatch({
      type: authConstants.RESET_PASSWORD_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error.response.data.message);
  }
};

export const getUserDetail = () => async (dispatch) => {
  dispatch({
    type: authConstants.GET_USER_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.get("/auth/profile");
    if (res?.data?.success) {
      await dispatch({
        type: authConstants.GET_USER_SUCCESS,
        payload: res?.data?.data?.data,
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: authConstants.GET_USER_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error?.response?.data?.message);
  }
};
export const updateUserDetail = (values) => async (dispatch) => {
  dispatch({
    type: authConstants.UPDATE_USER_REQUEST,
  });
  try {
    attachToken();
    const res = await formAxios.put("/auth/profile", values);
    if (res?.data?.success) {
      await dispatch({
        type: authConstants.UPDATE_USER_SUCCESS,
        payload: res?.data?.data?.data,
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: authConstants.UPDATE_USER_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    errorMessage(error?.response?.data?.message);
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: authConstants.CLEAR_ERRORS,
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: authConstants.LOGOUT_REQUEST,
  });
};
