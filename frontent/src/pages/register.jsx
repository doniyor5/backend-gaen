import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Google from "../assets/img/Google - Original.png";
import { registerUser } from "../services/registerUser";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    confirmPassword: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [countryError, setCountryError] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateInputs = () => {
    let isValid = true;

    // Validate full name
    if (!formData.fullName.trim()) {
      setNameError("Name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate email
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validate country
    if (!formData.country) {
      setCountryError("Please select a country.");
      isValid = false;
    } else {
      setCountryError("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const response = await registerUser({
        first_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        password2: formData.confirmPassword,
      });
      console.log("Registration successful:", response);
      // navigate("/login");

      setOtp(true);
      setLoading(false);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    }
  };

  const checkOtp = async (e) => {
    e.preventDefault();

    const url =
      "https://2dbe-195-158-9-110.ngrok-free.app/api/v1/auth/verify-email/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          otp: otpValue,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData); 
        alert(errorData?.message)
      }
 
      alert("Success")
      navigate("/login")
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  };
  return (
    <div className="register_page_shadow md:flex items-center justify-between h-[100vh] z-40">
      <div
        data-aos="fade-up"
        className="register_page_shadow_left md:w-2/4 flex items-center h-[50vh] md:h-[100vh] justify-center"
      >
        <h1 className="register_text protest_riot">GAEN</h1>
      </div>
      <div className="register_page_shadow_right md:w-2/4 bg-white flex flex-col items-center h-[100vh] justify-center">
        <div data-aos="fade-down" className="w-[85%] md:w-[70%]">
          <h1 className="mb-8 text-3xl font-[600]">Create an account</h1>
          <form>
            <div className="flex flex-col">
              <label htmlFor="fullName" className="mb-2 text-[#344054]">
                Name
              </label>
              <input
                className="border border-[#98A2B3] py-2 px-2 text-[12px] md:py-3 poppins_ md:px-4 outline-none text-[#344054] rounded-md md:rounded-xl md:text-[16px]"
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="email" className="mb-2 text-[#344054]">
                Email
              </label>
              <input
                className="border border-[#98A2B3] py-2 px-2 text-[12px] md:py-3 poppins_ md:px-4 outline-none text-[#344054] rounded-md md:rounded-xl md:text-[16px]"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="password" className="mb-2 text-[#344054]">
                Password
              </label>
              <div className="flex items-center border-[#98A2B3] border w-full md:rounded-xl rounded-md justify-between">
                <input
                  className="py-2 px-2 text-[12px] md:py-3 poppins_ md:px-4 outline-none text-[#344054] rounded-md md:rounded-xl md:text-[16px]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="confirmPassword" className="mb-2 text-[#344054]">
                Confirm Password
              </label>
              <div className="flex items-center border-[#98A2B3] border w-full md:rounded-xl rounded-md justify-between">
                <input
                  className="py-2 px-2 text-[12px] md:py-3 poppins_ md:px-4 outline-none text-[#344054] rounded-md md:rounded-xl md:text-[16px]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="country" className="mb-2 text-[#344054]">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="border border-[#98A2B3] py-2 px-2 text-[12px] md:py-3 poppins_ md:px-4 outline-none text-[#344054] rounded-md md:rounded-xl md:text-[16px]"
              >
                <option value="">Select your country</option>
                <option value="uz">Uzbekistan</option>
                <option value="us">United States</option>
                <option value="ru">Russia</option>
                <option value="fr">France</option>
              </select>
              {countryError && (
                <p className="text-red-500 text-sm">{countryError}</p>
              )}
            </div>

            {otp && (
              <div className="flex flex-col mt-6">
                <label htmlFor="OTP" className="mb-2 text-[#344054]">
                  OTP
                </label>
                <div className="flex items-center border-[#98A2B3] border w-full md:rounded-xl rounded-md justify-between">
                  <input
                    className="py-2 px-2 text-[12px] md:py-3 poppins_ md:px-4 outline-none text-[#344054] rounded-md md:rounded-xl md:text-[16px]"
                    type={"text"}
                    placeholder="Enter OTP"
                    name="OTP"
                    value={otpValue}
                    onChange={(e) => {
                      setOtpValue(e.target.value);
                    }}
                  />
                </div>
              </div>
            )}

            <div className="w-full mt-8">
              {!otp ? (
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#0A1F44] w-full py-3 px-5 text-white font-[600] text-[16px] rounded-lg ${
                    loading && "register-btn"
                  }`}
                  onClick={(e) => handleSubmit(e)}
                >
                  {loading ? "Loading..." : "Create Account"}
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#0A1F44] w-full py-3 px-5 text-white font-[600] text-[16px] rounded-lg"
                  onClick={(e) => checkOtp(e)}
                >
                  Check
                </button>
              )}

              <button className="mt-6 bg-[#D1E9FF] flex items-center justify-center gap-2 text-[#1570EF] w-full py-3 px-4 rounded-lg text-[16px]">
                <img className="w-5 h-5" src={Google} alt="Google" />
                Continue with Google
              </button>
              <p className="text-center mt-6 font-[400] text-[#98A2B3]">
                Already have an account?{" "}
                <Link to="/login" className="text-[#1570EF] cursor-pointer">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
