import { React, useState } from "react";
import { navLinks } from "../constants/index";
import { useNavigate,Link } from "react-router-dom";

const Nav = () => {
  

  const [toggle, settoggle] = useState(false);

  const toggleBtn = () => {
    settoggle(!toggle);
  };

 

  const navigate = useNavigate();
  return (
    <nav className="flex justify-center py-6 bg-primary text-white ">
      

      <ul className="flex  items-center list-none gap-14 max-md:py-6 ">
        {navLinks.map((link) => {
          return (
            <li
              key={link.id}
              className="font-medium cursor-pointer text-[18px] min-w-max hover:text-btn-clr "
            >
            
              <Link to={link.to}>{link.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
