import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import InputControl from "../Components/InputControl";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    phoneNumber: "",
    otp: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showToaster, setShowToaster] = useState(false); // To show toaster
  const [emailDisabled, setEmailDisabled] = useState(false); // To disable email after sending OTP
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification

  // Handle sending OTP request
 // Handle sending OTP request
const handleSendVerificationCode = async () => {
  if (!values.email) {
    setErrorMsg("Email is required to send verification code");
    return;
  }

  try {
    const response = await axios.post('http://localhost:3001/request-otp', {
      email: values.email,
    });

    // OTP sent successfully
    setEmailDisabled(true); // Disable email input after OTP sent
    setShowToaster({ show: true, message: response.data.message, type: "success" });
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // Show "User Already Exist" error
      setShowToaster({ show: true, message: error.response.data.message, type: "error" });
    } else {
      // Handle any other errors
      setShowToaster({ show: true, message: "Error sending OTP. Please try again.", type: "error" });
    }
  }
};


  // Handle OTP verification
  const handleVerifyOTP = async () => {
    if (!values.otp) {
      setErrorMsg("Please enter the OTP");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/verify-otp', {
        email: values.email,
        otp: values.otp,
      });
console.log(response)
      setShowToaster({ show: true, message: "OTP verified successfully!, Now signUp", type: "success" });
      setOtpVerified(true); // Mark OTP as verified
    } catch (error) {
      setShowToaster({ show: true, message: "Invalid OTP. Please try again.", type: "error" });
    }
  };

  // Handle final form submission after OTP verification
  const handleSubmission = async () => {
    if (!otpVerified) {
      setErrorMsg("Please verify the OTP before submitting");
      return;
    }

    if (!values.name || !values.pass || !values.phoneNumber) {
      setErrorMsg("Fill all fields");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/signup', {
        name: values.name,
        email: values.email,
        password: values.pass,
        phoneNumber: values.phoneNumber,
      });

      setShowToaster({ show: true, message: "Signup completed successfully!", type: "success" });
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
    } catch (error) {
      setShowToaster({ show: true, message: "Error completing signup. Please try again.", type: "error" });
    }
  };

  return (
    <div className="h-full min-h-screen w-full bg-gray_bg flex justify-center items-center">
      <div className="sm:min-w-[480px] bg-secondary shadow-md p-10 rounded-lg flex flex-col gap-4">
        <h1 className="heading text-3xl font-bold">Signup</h1>

        <InputControl
          label="Name"
          type="text"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="GCT Mail ID"
          type="text"
          placeholder="Enter email address"
          disabled={emailDisabled}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          type="password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <InputControl
          label="Phone Number"
          type="text"
          placeholder="Enter phone number"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phoneNumber: event.target.value }))
          }
        />
        <InputControl
          label="OTP"
          type="text"
          placeholder="Enter OTP"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, otp: event.target.value }))
          }
        />

        <div className="footer flex flex-col gap-4">
          <b className="error text-bold text-red-600">{errorMsg}</b>

          <button
            onClick={handleSendVerificationCode}
            className="button bg-sm-elements text-primary rounded-md font-bold py-2 px-4 transition duration-100"
            disabled={emailDisabled} // Disable button if email input is disabled
          >
            Send Verification Code
          </button>

          <button
            onClick={handleVerifyOTP}
            className="button bg-sm-elements text-primary rounded-md font-bold py-2 px-4 transition duration-100"
          >
            Verify OTP
          </button>

          <button
            onClick={handleSubmission}
            disabled={submitButtonDisabled || !otpVerified} // Only enable submission if OTP is verified
            className="button bg-sm-elements text-primary rounded-md font-bold py-2 px-4 transition duration-100"
          >
            Signup
          </button>

          <p className="text-700 text-black">
            Already have an account?{" "}
            <span>
              <Link to="/login" className="text-primary font-bold">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>

      {showToaster.show && (
        <div
          className={`fixed top-4 right-4 py-2 px-4 rounded-md shadow-lg ${
            showToaster.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {showToaster.message}
        </div>
      )}
    </div>
  );
}

export default Signup;