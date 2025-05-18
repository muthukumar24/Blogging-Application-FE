import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MdAccountCircle } from "react-icons/md";

const NavBar = () => {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex items-center justify-between py-4 border-b-2">
      <Link to={"/blogs"}>
        <h1 className="text-2xl font-semibold">BlogNest</h1>
      </Link>

      <div>
        <div className="flex items-center gap-2 sm:gap-3">
          <p
            className="cursor-pointer hover:text-gray-600"
            onClick={() => navigate("/blogs")}
          >
            All Blogs
          </p>
          <p
            className="cursor-pointer hover:text-gray-600"
            onClick={() => navigate("/add")}
          >
            Add Blog
          </p>
          <p
            className="cursor-pointer hover:text-gray-600"
            onClick={() => navigate("/myblogs")}
          >
            My Blogs
          </p>
          {/* <p className="max-sm:hidden">Hi, MK</p> */}
          <div className="relative group">
            <MdAccountCircle size={25} />
            <div
              className="cursor-pointer absolute hidden group-hover:block 
              top-0 right-0 z-10 text-black rounded pt-15"
            >
              <ul className="list-none m-0 p-2 bg-white rounded-medium border text-sm">
                <li
                  className="py-1 px-2 cursor-pointer hover:text-gray-600"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
