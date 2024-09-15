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
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showToaster, setShowToaster] = useState(false); // To show toaster

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass || !values.phoneNumber) {
      setErrorMsg("Fill all fields");
      return;
    }

    // function validateEmail(email) {
    //   // Define the regular expression for the email pattern
    //   const emailPattern = /^[a-zA-Z]+\.[0-9]+@gct\.ac\.in$/;
    
    //   // Test the email against the pattern
    //   if (emailPattern.test(email)) {
    //     console.log("Valid email address");
    //     return true;
    //   } else {
    //     console.log("Invalid email address");
    //     return;
    //   }
    // }

    // validateEmail(values.email);
    if(! /^[a-zA-Z]+\.[0-9]+@gct\.ac\.in$/.test(values.email)){
      setErrorMsg("Please enter a valid college email");
      return;
    }
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.pass)){
      setShowToaster({ 
        show: true, 
        message: "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.", 
        type: "error" 
      });
      return;
    }



    if (!/^\d{10}$/.test(values.phoneNumber)) {
      setErrorMsg("Please enter a valid 10-digit phone number");
      return;
    }

    setErrorMsg("");
  

    axios.post('http://localhost:3001/signup', {
      name: values.name,
      email: values.email,
      password: values.pass,
      phoneNo: values.phoneNumber
    })
    .then(res => {
      if (res.data === "User Already Exist") {
        setErrorMsg("User Already Exists");
      } else if (res.data === "SignUp error") {
        setShowToaster({ show: true, message: "SignUp error", type: "error" });
      } else {
        setShowToaster({ show: true, message: "Registration Successful!", type: "success" });

        setTimeout(() => {
          setShowToaster({ show: false, message: "", type: "" });
          navigate('/login'); // Redirect to login page
        }, 2000);

        setValues({
          name: "",
          email: "",
          pass: "",
          phoneNumber: "",
        });
      }
    })
    .catch(error => {
      setShowToaster({ show: true, message: "Something went wrong. Please try again later.", type: "error" });
      setSubmitButtonDisabled(false);
    });
  };

  return (
    <div className="h-full min-h-screen w-full bg-white flex justify-center items-center max-sm:items-start mt-20">
      <div className="sm:min-w-[480px] fit-content bg-coffee shadow-md p-10 rounded-lg flex flex-col gap-4">
        <h1 className="heading text-3xl font-bold">Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <InputControl
          label="Phone Number"
          placeholder="Enter phone number"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phoneNumber: event.target.value }))
          }
        />

        <div className="footer flex flex-col gap-4">
          <b className="error text-bold text-red-600">{errorMsg}</b>
          <button
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
            className="button bg-dark-coffee text-secondary rounded-md font-bold py-2 px-4 transition duration-100"
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
