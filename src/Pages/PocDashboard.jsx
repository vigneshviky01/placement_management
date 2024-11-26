import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputControl from "../Components/InputControl";

function PocDashboard() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    Companyname: "",
    criteria: "",
    ctc: "",
    dept: "",
    skills: "",
    date: "",
    recruitmentProcess: "",
    location: "",
    bond: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showToaster, setShowToaster] = useState({ show: false, message: "", type: "" });

  const handleSubmission = async () => {
    // Input validation
    if (
      !values.Companyname ||
      !values.criteria ||
      !values.ctc ||
      !values.dept ||
      !values.skills ||
      !values.date ||
      !values.recruitmentProcess ||
      !values.location ||
      !values.bond
    ) {
      setErrorMsg("All fields are required.");
      return;
    }

    // Field-specific validations
    if (!/^\d+(\.\d+)?$/.test(values.ctc) || Number(values.ctc) <= 0) {
      setErrorMsg("CTC must be a positive number.");
      return;
    }

    const selectedDate = new Date(values.date);
    const currentDate = new Date();
    if (isNaN(selectedDate.getTime()) || selectedDate <= currentDate) {
      setErrorMsg("Date must be a valid future date.");
      return;
    }

    if (!/^[a-zA-Z\s,]+$/.test(values.dept)) {
      setErrorMsg("Department should only contain letters and commas.");
      return;
    }

    if (!/^[a-zA-Z\s,]+$/.test(values.skills)) {
      setErrorMsg("Skills should only contain letters and commas.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(values.location)) {
      setErrorMsg("Location should only contain letters.");
      return;
    }

    if (!values.recruitmentProcess.trim()) {
      setErrorMsg("Recruitment process cannot be empty.");
      return;
    }

    if (!values.bond.trim()) {
      setErrorMsg("Bond details cannot be empty.");
      return;
    }

    // Clear error message before submission
    setErrorMsg("");
    setSubmitButtonDisabled(true);

    try {
      const res = await axios.post("http://localhost:3001/CD", values);

      setShowToaster({ show: true, message: "Submission Successful!", type: "success" });

      setTimeout(() => {
        setShowToaster({ show: false, message: "", type: "" });
        navigate("/viewcompanydetails"); // Redirect to jobs page
      }, 2000);

      // Clear form fields after submission
      setValues({
        Companyname: "",
        criteria: "",
        ctc: "",
        dept: "",
        skills: "",
        date: "",
        recruitmentProcess: "",
        location: "",
        bond: "",
      });
    } catch (error) {
      setShowToaster({ show: true, message: "Something went wrong. Please try again later.", type: "error" });
      setSubmitButtonDisabled(false);
    }
  };

  return (
    <div className="h-full min-h-screen w-full bg-gray_bg flex justify-center items-center">
      <div className="sm:min-w-[480px] bg-secondary shadow-md p-10 rounded-lg flex flex-col gap-4">
        <h1 className="heading text-3xl font-bold">Company Details</h1>

        <InputControl
          label="Company Name"
          type="text"
          placeholder="Enter the company name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, Companyname: event.target.value }))
          }
        />
        <InputControl
          label="Criteria"
          type="text"
          placeholder="Enter criteria (e.g., Minimum 70%)"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, criteria: event.target.value }))
          }
        />
        <InputControl
          label="CTC"
          type="number"
          placeholder="Enter CTC"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ctc: event.target.value }))
          }
        />
        <InputControl
          label="Department"
          type="text"
          placeholder="Enter department(s)"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, dept: event.target.value }))
          }
        />
        <InputControl
          label="Skills"
          type="text"
          placeholder="Enter required skills"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, skills: event.target.value }))
          }
        />
        <InputControl
          label="Date"
          type="date"
          placeholder="Enter recruitment date"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, date: event.target.value }))
          }
        />
        <InputControl
          label="Recruitment Process"
          type="text"
          placeholder="Enter recruitment process"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, recruitmentProcess: event.target.value }))
          }
        />
        <InputControl
          label="Location"
          type="text"
          placeholder="Enter job location"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, location: event.target.value }))
          }
        />
        <InputControl
          label="Bond"
          type="text"
          placeholder="Enter bond details"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, bond: event.target.value }))
          }
        />

        <div className="footer flex flex-col gap-4">
          <b className="error text-bold text-red-600">{errorMsg}</b>
          <button
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
            className="button bg-sm-elements text-primary rounded-md font-bold py-2 px-4 transition duration-100"
          >
            Submit
          </button>
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

export default PocDashboard;
