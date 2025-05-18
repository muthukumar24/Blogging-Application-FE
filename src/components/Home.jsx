import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    allBlogs,
    getAllBlogs,
    author = [],
    getAuthors,
    category = [],
    getCategory,
    viewBlog,
    filteredBlogs,
    filterBlog,
  } = useContext(AppContext);

  const [searCategory, setSearchCategory] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");

  useEffect(() => {
    getAllBlogs();
    getAuthors();
    getCategory();
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    filterBlog(searCategory, searchAuthor);
  };

  const blogsToRender = filteredBlogs.length > 0 ? filteredBlogs : allBlogs;

  return (
    <div>
      <div className="py-5">
        {/* Search By Category and Author */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-start items-center gap-4 mt-5 mb-5 sm:flex-col sm:gap-3"
        >
          <div>
            <input
              list="category-options"
              type="text"
              placeholder="Category"
              className="border rounded p-2 cursor-pointer"
              value={searCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            />
            <datalist id="category-options">
              {
                (category || []).map((categ, i) => (
                  <option key={i} value={categ}/>
                ))
              }
            </datalist>
          </div>
          <div>
            <input
            list="author-options"
              type="text"
              placeholder="Author"
              className="border rounded p-2 cursor-pointer"
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
            />
            <datalist id="author-options">
              {
                (author || []).map((authr, i) => (
                  <option key={i} value={authr}/>
                ))
              }
            </datalist>
          </div>
          <div>
            <button className="bg-cyan-800 text-white w-40 font-light rounded p-2 hover:bg-cyan-900 cursor-pointer">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Blogs Grid Card */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-3 pb-5">
        {blogsToRender.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Author: </span>
                  {item.author} <br />
                  <span className="font-medium">Category: </span>
                  {item.category}
                </p>
                <p className="text-gray-700 text-sm">
                  {item.content.slice(0, 100)}...
                </p>
              </div>
              <div className="flex justify-end items-center">
                <Link to={"/viewblog"}>
                  <button
                    className="bg-cyan-800 text-white px-6 py-2 mt-2 rounded hover:bg-cyan-900 transition cursor-pointer"
                    onClick={() => viewBlog(item._id)}
                  >
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
