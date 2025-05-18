import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { token, setToken } = useContext(AppContext);

  const [currentState, setCurrentState] = useState("Login");
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${API_URL}/user/register`, userInput);
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${API_URL}/user/login`, userInput);
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/blogs");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-2xl shadow-2xl rounded-lg px-8 py-10 max-w-md">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-2">
            <p className="text-3xl font-semibold">{currentState}</p>
          </div>
          {currentState === "Login" ? (
            ""
          ) : (
            <input
              name="name"
              value={userInput.name}
              onChange={handleChange}
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Name"
              required
            />
          )}
          <input
            name="email"
            value={userInput.email}
            onChange={handleChange}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
          />
          <input
            name="password"
            value={userInput.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            required
          />
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="flex gap-1">
              Show Password{" "}
              <input
                type="checkbox"
                className="cursor-pointer w-3"
                value={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
            </p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer hover:underline"
              >
                Create Account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer"
              >
                Login
              </p>
            )}
          </div>
          <button
            className="bg-black text-white w-40 font-light px-8 py-2 mt-4 hover:bg-gray-800 cursor-pointer"
            disabled={loading}
          >
            {loading
              ? currentState === "Login"
                ? "Logging in..."
                : "Signing Up..."
              : currentState === "Login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
