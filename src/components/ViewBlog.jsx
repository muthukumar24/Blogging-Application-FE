import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ViewBlog = () => {
  const { loading, viewBlogData } = useContext(AppContext);

  const navigate = useNavigate()

  return (
    <>
      {loading === true ? (
        <div className="text-center mt-5">Loading...</div>
      ) : viewBlogData ? (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-2xl mt-5 mb-10">
          <h2 className="text-2xl font-bold mb-2">{viewBlogData.title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Category:</span>{" "}
            {viewBlogData.category}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-semibold">Author:</span> {viewBlogData.author}
          </p>
          <img
            src={viewBlogData.image}
            alt={viewBlogData.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <p>{viewBlogData.content}</p>

          <div className="flex justify-end items-center py-4">
            <button  className="bg-cyan-800 text-white px-5 py-2 mt-2 rounded hover:bg-cyan-900 cursor-pointer"
            onClick={() => navigate('/blogs')}
            >Back
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 mt-5">Blog Not Found</div>
      )}
    </>
  );
};

export default ViewBlog;
