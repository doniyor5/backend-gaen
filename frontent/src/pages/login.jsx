import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/loginUser";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await loginUser(email, password);

      if (response && response.access_token) {
        localStorage.setItem("token", response.access_token);
        localStorage.setItem("user_full_name", response.full_name); 
        localStorage.setItem("user_email", response.email);
        navigate("/main");
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) { 
      setErrorMessage(error); 
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className="px-4 md:px-0 z-40">
      <div>
        <h1 className="login_text protest_riot">GAEN</h1>
      </div>
      <div className="login_page_shadow_left"></div>
      <div className="login_page_shadow_right"></div>
      <div className="login_page_shadow_top"></div>
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-white py-4 md:py-12 px-5 md:px-16 max-w-xl w-full rounded-xl">
          <div>
            <h1 className=" text-[24px] md:text-[28px] font-[600] text-center poppins_">
              Login to your account
            </h1>
            <div className="flex flex-col">
              <label className="mb-2 text-[#344054] text-[12px] md:text-[16px] poppins_">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-[#98A2B3] py-2 px-2 text-[12px] md:py-3 md:px-4 outline-none poppins_ text-[#344054] rounded-md md:rounded-xl md:text-[16px]"
                type="email"
                placeholder="Enter your email"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailErrorMessage}</p>
              )}
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <div className="flex flex-col mt-3 md:mt-6">
              <div className="flex justify-between">
                <label className="mb-2 text-[#344054] text-[12px] md:text-[16px] poppins_">
                  Password
                </label>
                <label className="mb-2 text-[#1570EF] cursor-pointer text-[12px] md:text-[16px] poppins_">
                  Forgot?
                </label>
              </div>
              <div className="relative flex items-center border-[#98A2B3] border w-full md:rounded-xl rounded-md">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 px-2 text-[12px] md:py-3 poppins_ md:px-4 outline-none text-[#344054] rounded-md md:rounded-xl md:text-[16px]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  className="text-sm mr-1 md:mr-3 text-[#1570EF] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEyeOutline className="size-5 md:size-7 text-[#98A2B3]" />
                  ) : (
                    <IoEyeOffOutline className="size-5 md:size-7 text-[#98A2B3]" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordErrorMessage}</p>
              )}
            </div>
            <div className="w-full mt-8">
              <button className="bg-[#0A1F44] w-full py-3 px-5 text-white font-[600] text-[16px] rounded-lg poppins_">
                Login now
              </button>
              <p className="text-center mt-6 font-[400] text-[#98A2B3] poppins_">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-[#1570EF] cursor-pointer"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
