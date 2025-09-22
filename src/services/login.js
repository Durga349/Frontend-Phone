import BackendApi from "../utils/httpClient";

const SendOtp = async (FullPhoneNumber) => {
  try {
    const response = await BackendApi.post("/user/send-otp", {
      phonenumber: FullPhoneNumber,
    });
    if (!response?.data?.success) {
      throw response?.data;
    }
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const VerifyOtp = async (phonenumber, otp) => {
  try {
    const response = await BackendApi.post("/user/verify-otp", {
      phonenumber: phonenumber,
      code: otp,
    });
    if (!response?.data?.success) {
      throw response?.data;
    }
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export { SendOtp, VerifyOtp };
