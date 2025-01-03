import React, { useState } from "react";
import axios from 'axios';
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
  const [showToaster, setShowToaster] = useState(false); // To show toaster



  const handleSubmission = async () => {
    if (
      !values.Companyname || !values.criteria || !values.ctc || !values.dept ||
      !values.skills || !values.date || !values.recruitmentProcess ||
      !values.location || !values.bond
    ) {
      setErrorMsg("Fill all fields");
      return;
    }



    setErrorMsg("");
    setSubmitButtonDisabled(true);



    try {
      const res = await axios.post('http://localhost:3001/CD', {
        Companyname: values.Companyname,
        criteria: values.criteria,
        ctc: values.ctc,
        dept: values.dept,
        skills: values.skills,
        date: values.date,
        recruitmentProcess: values.recruitmentProcess,
        location: values.location,
        bond: values.bond,

      });


      setShowToaster({ show: true, message: "Submission Successful!", type: "success" });

      setTimeout(() => {
        setShowToaster({ show: false, message: "", type: "" });
        navigate("/viewcompanydetails"); // Redirect to jobs page
      }, 2000);

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
          label="Companyname"
          type="text"
          placeholder="Enter the job Companyname"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, Companyname: event.target.value }))
          }
        />
        <InputControl
          label="Criteria"
          type="text"
          placeholder="Enter criteria"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, criteria: event.target.value }))
          }
        />
        <InputControl
          label="CTC"
          type="Number"
          placeholder="Enter CTC"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ctc: event.target.value }))
          }
        />
        {/* <label for="selection" className="font-bold text-primary">Department</label>
        <select id="selection" name="selection" className="border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-300 focus:border-gray_bg" onChange={(event) =>
          setValues((prev) => ({ ...prev, dept: event.target.value }))
        }>
          <option value="COMPUTER SCIENCE AND ENGINEERING">COMPUTER SCIENCE AND ENGINEERING</option>
          <option value="INFORMATION TECHNOLOGY">INFORMATION TECHNOLOGY</option>
          <option value="ELECTRICAL AND COMMUNICATION ENGINEERING">ELECTRICAL AND COMMUNICATION ENGINEERING</option>
          <option value="ELECTRICAL AND INSTRUMENTAION ENGINEERING">ELECTRICAL AND INSTRUMENTAION ENGINEERING</option>
          <option value="ELECTRICAL AND ELECTRONIC ENGINEERING">ELECTRICAL AND ELECTRONIC ENGINEERING</option>
          <option value="MECHANICAL ENGINEERING">MECHANICAL ENGINEERING</option>
          <option value="CIVIL ENGINEERING">CIVIL ENGINEERING</option>
          <option value="INDUSTRIAL BIO TECHNOLOGY">INDUSTRIAL BIO TECHNOLOGY</option>
          <option value="PRODUCTION ENGINEERING">PRODUCTION ENGINEERING</option>
        </select> */}
        
        <InputControl
          label="Department"
          type="text"
          placeholder="Enter department"
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
          placeholder="Enter the recruitment date"
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
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Description (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleJDFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div> */}

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
          className={`fixed top-4 right-4 py-2 px-4 rounded-md shadow-lg ${showToaster.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
        >
          {showToaster.message}
        </div>
      )}
    </div>
  );
}

export default PocDashboard;