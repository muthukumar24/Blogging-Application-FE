import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const AddBlog = () => {
  const { addBlog } = useContext(AppContext);

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("category", blogData.category);
    formData.append("author", blogData.author);
    formData.append("content", blogData.content);
    formData.append("image", image);

    await addBlog(formData);
    setBlogData({
      title: "",
      category: "",
      author: "",
      content: "",
    });
    setImage(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
        <h2 className="text-2xl text-center font-semibold mb-6">Add Blog</h2>

      <form className="space-y-4" onSubmit={onSubmitHandler}>
        <div>
          <input
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="Title"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="Category"
            name="category"
            value={blogData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="Author"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            className="w-full border px-4 py-2 rounded overflow-y-scroll"
            placeholder="Content"
            name="content"
            value={blogData.content}
            onChange={handleChange}
            required
            maxLength={10000}
            rows={5}
          />
        </div>
        <div>
          <input
            className="w-full border px-4 py-2 rounded cursor-pointer file:bg-cyan-900 file:text-white file:px-2 file:py-2"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-cyan-800 text-white px-5 py-2 rounded hover:bg-cyan-900 transition cursor-pointer" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
