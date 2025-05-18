import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { updateBlog, getUserBlogs } = useContext(AppContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { blog } = state || {};
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        category: blog.category,
        author: blog.author,
        content: blog.content,
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("category", formData.category);
    updatedData.append("author", formData.author);
    updatedData.append("content", formData.content);

    if (image) {
      updatedData.append("image", image);
    }

    await updateBlog(id, updatedData);
    await getUserBlogs();
    navigate("/myblogs");
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl text-center font-semibold mb-6">Edit Blog</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border px-4 py-2 rounded"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          type="text"
        />
        <input
          className="w-full border px-4 py-2 rounded"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          type="text"
        />
        <input
          className="w-full border px-4 py-2 rounded"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          type="text"
        />
        <textarea
          className="w-full border px-4 py-2 rounded overflow-y-scroll"
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          maxLength={10000}
          rows={5}
        />
        <input
          className="w-full border px-4 py-2 rounded cursor-pointer file:bg-cyan-900 file:text-white file:px-2 file:py-2"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="flex justify-center items-center">
          <button
            className="bg-cyan-800 text-white px-5 py-2 rounded hover:bg-cyan-900 transition cursor-pointer"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
