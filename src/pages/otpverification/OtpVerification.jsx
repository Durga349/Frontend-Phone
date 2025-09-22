import React, { useState, useEffect } from "react";
import { VerifyOtp } from "../../services/Login.js";
import { useNavigate } from "react-router-dom";
import ToasterAlert from "../../toaster/ToastAlert.jsx";
import { toast } from "sonner";
import Loader from "../../loader/Loader.jsx";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");

  const validateForm = () => {
    const digitOnly = /^\d{4}$/;
    if (!digitOnly.test(otp)) {
      setErrors("OTP must be exactly 4 digits");
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
    try {
      setLoading(true);
      const response = await VerifyOtp(phonenumber, otp);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        localStorage.setItem("authToken", response?.data?.token);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const storedPhone = localStorage.getItem("phonenumber") || "";
    setPhonenumber(storedPhone);
  }, []);
  return (
    <>
      {loading && <Loader />}
      <ToasterAlert />
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <p>
                  <b>Verify Otp</b>
                </p>
                <form action="" onSubmit={handleSubmit} method="post">
                  <div className="input-group mb-3">
                    <input
                      type="hidden"
                      className="form-control"
                      name="phonenumber"
                      id="phonenumber"
                      value={phonenumber}
                      readOnly
                    />
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      id="code"
                      name="code"
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                    {errors && <div className="invalid-feedback">{errors}</div>}
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <input
                        type="reset"
                        name=""
                        id=""
                        value="cancel"
                        className="btn btn-danger"
                        onClick={() => {
                          setOtp("");
                          setErrors("");
                        }}
                      />
                    </div>
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

export default OtpVerification;
