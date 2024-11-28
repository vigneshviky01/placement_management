import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import InputControl from "../Components/InputControl";

function StudentDetails() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    RollNumber: "",
    Department: "",
    PersonalEmail: "",
    TenthMark: "",
    TwelfthMark: "",
    CurrentSemester: "",
    CGPA: "",
    currentBacklogs:"",
    totalBacklogs:"",
    Gender: "",
    YearOfPassing: "",
    Resume: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showToaster, setShowToaster] = useState(false); // To show toaster

  const handleSubmission = async () => {
    if (!values.RollNumber || !values.Department || !values.PersonalEmail || 
        !values.TenthMark || !values.TwelfthMark || !values.CurrentSemester ||
        !values.CGPA||!values.currentBacklogs||!values.totalBacklogs || !values.Gender || !values.YearOfPassing || !values.Resume) {
      setErrorMsg("Please fill all fields");
      return;
    }
  
    setErrorMsg("");
    setSubmitButtonDisabled(true);

    // Create a payload with student data
    const email = localStorage.getItem('email');
    const studentData = {
      email: email,
      rollNumber: values.RollNumber,
      department: values.Department,
      personalEmail: values.PersonalEmail,
      tenthMark: values.TenthMark,
      twelfthMark: values.TwelfthMark,
      currentSemester: values.CurrentSemester,
      CGPA: values.CGPA,
      currentBacklogs:values.currentBacklogs,
      totalBacklogs:values.totalBacklogs,
      gender: values.Gender,
      yearOfPassing: values.YearOfPassing,
      resume: values.Resume,
    };

    try {
      const res = await axios.patch('http://localhost:3001/student/update', studentData);
  
      setShowToaster({ show: true, message: "Student details updated successfully!", type: "success" });
  
      setTimeout(() => {
        setShowToaster({ show: false, message: "", type: "" });
        navigate("/student"); // Redirect after successful update
      }, 2000);
  
      setValues({
        RollNumber: "",
        Department: "",
        PersonalEmail: "",
        TenthMark: "",
        TwelfthMark: "",
        CurrentSemester: "",
        CGPA: "",
        currentBacklogs:"",
        totalBacklogs:"",
        Gender: "",
        YearOfPassing: "",
        Resume: "",
      });
    } catch (error) {
      setShowToaster({ show: true, message: "Something went wrong. Please try again later.", type: "error" });
      setSubmitButtonDisabled(false);
    }
  };

  return (
    <div className="h-full min-h-screen w-full bg-gray_bg flex justify-center items-center">
      <div className="sm:min-w-[480px] bg-secondary shadow-md p-10 rounded-lg flex flex-col gap-4">
        <h1 className="heading text-3xl font-bold">Update Student Details</h1>

        <InputControl
          label="Roll Number"
          type="text"
          placeholder="Enter Roll Number"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, RollNumber: event.target.value }))
          }
        />
        <InputControl
          label="Department"
          type="text"
          placeholder="Enter Department"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, Department: event.target.value }))
          }
        />
        <InputControl
          label="Personal Email"
          type="email"
          placeholder="Enter Personal Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, PersonalEmail: event.target.value }))
          }
        />
        <InputControl
          label="Tenth Mark"
          type="number"
          placeholder="Enter Tenth Mark"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, TenthMark: event.target.value }))
          }
        />
        <InputControl
          label="Twelfth Mark"
          type="number"
          placeholder="Enter Twelfth Mark"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, TwelfthMark: event.target.value }))
          }
        />
        <InputControl
          label="Current Semester"
          type="number"
          placeholder="Enter Current Semester"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, CurrentSemester: event.target.value }))
          }
        />
        <InputControl
          label="CGPA"
          type="number"
          step="0.01"
          placeholder="Enter CGPA"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, CGPA: event.target.value }))
          }
        />
        <InputControl
          label="Current No of backlogs"
          type="number"
          step="0.01"
          placeholder="Enter current backlog"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, currentBacklogs: event.target.value }))
          }
        />
        <InputControl
          label="Total History of Arrears"
          type="number"
          step="0.01"
          placeholder="Enter total history of arrears"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, totalBacklogs: event.target.value }))
          }
        />
        <InputControl
          label="Gender"
          type="text"
          placeholder="Enter Gender"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, Gender: event.target.value }))
          }
        />
        <InputControl
          label="Year of Passing"
          type="number"
          placeholder="Enter Year of Passing"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, YearOfPassing: event.target.value }))
          }
        />
        <InputControl
          label="Resume"
          type="text"
          placeholder="Enter Resume URL"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, Resume: event.target.value }))
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
          className={`fixed top-4 right-4 py-2 px-4 rounded-md shadow-lg ${showToaster.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
        >
          {showToaster.message}
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
