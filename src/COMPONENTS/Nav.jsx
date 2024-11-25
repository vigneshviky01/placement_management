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
    <nav className="flex sm:justify-center max-sm:justify-around sm:py-6 bg-primary text-white ">
      

      <ul className="flex  items-center list-none gap-14 max-md:py-6 max-sm:px-4 ">
        {navLinks.map((link) => {
          return (
            <li
              key={link.id}
              className="font-medium cursor-pointer text-[18px] sm:min-w-max max-sm:w-16 hover:text-btn-clr text-center "
            >
            
              <Link className="text-wrap" to={link.to}>{link.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
