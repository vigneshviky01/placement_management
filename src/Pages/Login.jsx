import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import InputControl from "../Components/InputControl";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    
    
    // Example usage:
    if(! /^[a-zA-Z]+\.[0-9]+@gct\.ac\.in$/.test(values.email)){
      setErrorMsg("Please enter a valid college email");
      return;
    }
    
    setErrorMsg("");

    try {
      const res = await axios.post('http://localhost:3001/login', {
        email: values.email,
        password: values.pass,
      });

      if (res.data === "Found and verified") {
        alert("Login successful");
     
        navigate('/student');
      } else if (res.data === "password not match") {
        setErrorMsg("Incorrect password");
        
      } else {
        setErrorMsg("Data not found");
      }
    } catch (err) {
      setErrorMsg("An error occurred. Please try again.");
       
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray_bg max-sm:items-start max-sm:pt-20">
      <div className="min-w-80 max-w-md bg-secondary  shadow-md rounded p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className="flex flex-col gap-4">
          <b className="text-red-500 font-bold">{errorMsg}</b>
          <button
            disabled={submitButtonDisabled}
            onClick={handleSubmission}
            className="button bg-dark-coffee text-secondary rounded-md font-bold py-2 px-4 transition duration-100"
          >
            Login
          </button>
          <p className="font-bold text-black">
            Don't have an account?{" "}
            <span>
              <Link to="/signup" className="text-primary">
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
