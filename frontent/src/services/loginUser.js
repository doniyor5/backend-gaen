import axios from "axios";

const loginUser = async (email, password) => {
  const payload = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(
      "https://2dbe-195-158-9-110.ngrok-free.app/api/v1/auth/login/",
      payload
    );
    console.log("Response from server:", response.data);
    return response.data;
  } catch (error) { 
    throw error?.response?.data?.detail;
  }
};

export { loginUser };
