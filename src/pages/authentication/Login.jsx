import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SendOtp } from "../../services/Login.js";
import ToasterAlert from "../../toaster/ToastAlert.jsx";
import { toast } from "sonner";
import Loader from "../../loader/Loader.jsx";

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
];
const Login = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91");
  const [phonenumber, setPhonenumber] = useState("");
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    const digitOnly = /^\d{10}$/;
    if (!digitOnly.test(phonenumber)) {
      setErrors("Phone number must be exactly 10 digits");
      return false;
    }
    setErrors("");
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const FullPhoneNumber = countryCode + phonenumber;
    try {
      setLoading(true);
      const response = await SendOtp(FullPhoneNumber);
      if (response.data.success) {
        const number = response.data.data.phonenumber;
        localStorage.setItem("phonenumber", number);
        toast.success(response?.data?.message);
        navigate("/otp");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <ToasterAlert />
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div
              className="card"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginTop: "50px",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div className="card-body">
                <p>
                  <b>Sign In</b>
                </p>
                <form action="" onSubmit={handleSubmit} method="post">
                  <div className="input-group mb-3">
                    <select
                      className="form-select p-1"
                      value={countryCode}
                      style={{ width: "20%" }}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      {countryCodes.map(({ code, country }) => (
                        <option key={code} value={code}>
                          ({code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter 10-digit phone number"
                      value={phonenumber}
                      style={{ width: "80%" }}
                      onChange={(e) => {
                        setPhonenumber(e.target.value.replace(/\D/g, ""));
                        setErrors("");
                      }}
                    />
                    {errors && <div className="invalid-feedback">{errors}</div>}
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                      <input
                        type="submit"
                        name="submit"
                        className="btn btn-primary"
                        style={{ float: "right" }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
