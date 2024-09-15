import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center gap-6 py-14">
      <h1 className="text-[72px]">404</h1>
      <h2 className="text-[36px]">Page Not Found</h2>
      <p className="text-[18px] px-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={{ fontSize: "18px", color: "blue" }}>
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
