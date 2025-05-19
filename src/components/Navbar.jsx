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
        <h1 className="text-1xl md:text-2xl lg:text-2xl font-semibold">
          BlogNest
        </h1>
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

          <p
            className="flex justify-center items-center cursor-pointer hover:text-gray-600"
            onClick={logout}
          >
            <MdAccountCircle size={20} /> Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
