import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../constants/api";

export const AppContext = createContext();

export const AppcontextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [viewBlogData, setViewBlogData] = useState(null);
  const [author, setAuthor] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  // Get All Blogs
  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/blog/all-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setAllBlogs(response.data.blogs);
        setFilteredBlogs([]); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get All Blogs Belongs to the Current User
  const getUserBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/blog/user-blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setUserBlogs(response.data.blogs);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // To View a Blog
  const viewBlog = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/blog/view-blog/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setViewBlogData(response.data.resultBlog);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get All Authors
  const getAuthors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/blog/authors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setAuthor(response.data.authors);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get All Category
  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/blog/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCategory(response.data.category);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get All Blogs by Category and Author and Both
  const filterBlog = async (category, author) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      if(category) {
        queryParams.append("category", category);
      }

      if(author) {
        queryParams.append("author", author);
      }

      const response = await axios.get(`${API_URL}/blog/filter-blogs?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if(response.data.success){
        setFilteredBlogs(response.data.blogs)
      } else {
        setFilteredBlogs([]);
        toast.info("No blogs found for the given filter.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add Blog
  const addBlog = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/blog/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Edit Blog
  const updateBlog = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${API_URL}/blog/update/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Delete Blog
  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/blog/delete/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    loading,
    loggedIn,
    setLoggedIn,
    token,
    setToken,
    allBlogs,
    setAllBlogs,
    getAllBlogs,
    author,
    getAuthors,
    category,
    getCategory,
    filteredBlogs,
    filterBlog,
    viewBlogData,
    viewBlog,
    userBlogs,
    setUserBlogs,
    getUserBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
