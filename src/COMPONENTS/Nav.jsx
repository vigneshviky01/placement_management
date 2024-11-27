import React, { useState, useEffect } from "react";
import { navLinksStudent, navLinksPoc } from "../constants/index";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Importing the profile icon

const Nav = ({ role }) => {
  const [toggle, settoggle] = useState(false);
  const [mapLink, setMapLink] = useState([]);

  const toggleBtn = () => {
    settoggle(!toggle);
  };

  useEffect(() => {
    if (role === "student") {
      setMapLink(navLinksStudent);
    } else {
      setMapLink(navLinksPoc);
    }
  }, [role]); // Runs only when the 'role' prop changes

  const navigate = useNavigate();

  const handleProfileClick = () => {
    // This can either navigate to a profile page or show a dropdown
    navigate("/profile"); // Change '/profile' to the correct route for the profile page
  };

  return (
    <nav className="flex  flex-row sm:justify-between max-sm:justify-around sm:py-6 bg-primary text-white px-8 ">
      <ul className="flex max-sm:flex-col items-center list-none max-sm:gap-4 gap-14 max-sm:py-2 max-md:py-6 max-sm:px-4 ">
        {mapLink.map((link) => (
          <li
            key={link.id}
            className="font-medium cursor-pointer text-[18px] sm:min-w-max  hover:text-btn-clr text-center "
          >
            <Link className="md:text-wrap" to={link.to}>
              {link.title}
            </Link>
          </li>
        ))}
        
        
       
      </ul>
      {/* Profile Icon with onClick function */}
      <div
          onClick={handleProfileClick}
          className="font-medium flex items-center justify-center cursor-pointer text-[24px] sm:min-w-max max-sm:w-16 hover:text-btn-clr text-center ml-8" // Added `ml-8` for margin to the left to separate it from other items
        >
          <FaUserCircle size={35} /> {/* Increased the icon size to 35 */}
        </div>
    </nav>
  );
};

export default Nav;
