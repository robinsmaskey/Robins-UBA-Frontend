// import axios from "axios";
// import { User } from "../types/user";

// const API_URL = "http://localhost:3001";

// export const login = async (email: string, password: string) => {
//   // In a real app, this would call a real backend
//   const response = await axios.get(`${API_URL}/users?email=${email}`);
//   const user = response.data[0];

//   if (!user || user.password !== password) {
//     throw new Error("Invalid credentials");
//   }

//   // Mock JWT token generation
//   const token = "fake-jwt-token-" + Math.random().toString(36).substring(2);
//   await axios.post(`${API_URL}/auth`, { email, token });

//   return { token, user };
// };

// export const register = async (user: Omit<User, "id">) => {
//   const response = await axios.post(`${API_URL}/users`, user);
//   return response.data;
// };

//Updated:
// import axios from "axios";
// import { User } from "../types/user";

// const API_URL = "http://localhost:3001/"; // Adjust based on your backend URL

// export const login = async (email: string, password: string) => {
//   const response = await axios.post(`${API_URL}/auth/login`, { 
//     email, 
//     password 
//   });
//   return response.data;
// };

// export const register = async (user: Omit<User, "id">) => {
//   const response = await axios.post(`${API_URL}/auth/register`, user);
//   return response.data;
// };

//UPdated2:
// import api from "./api";
// import { User } from "../types/user";

// export const login = async (email: string, password: string) => {
//   const response = await api.post("/auth/login", { email, password });
//   return response.data; // { token, user }
// };

// export const register = async (user: Omit<User, "id">) => {
//   const response = await api.post("/auth/register", user);
//   return response.data;
// };

//Updated3:
// import axios from "axios";
// import { User } from "../types/user";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/";

// export const login = async (email: string, password: string) => {
//   const response = await axios.post(`${API_URL}/auth/login`, { 
//     email, 
//     password 
//   });
//   return response.data;
// };

// export const register = async (user: Omit<User, "id">) => {
//   const response = await axios.post(`${API_URL}/auth/register`, user);
//   return response.data;
// };

// export const logout = async () => {
//   // If your backend has a logout endpoint
//   // await axios.post(`${API_URL}/auth/logout`);
//   // For JWT, typically just remove token client-side
// };

//Updated4:
import axios from "axios";
import { User } from "../types/user";
import { LoginResponse } from "../types/auth";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

// Create separate axios instance for auth (no interceptors)
const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// export const register = async (user: Omit<User, "id">): Promise<User> => {
//   const response = await authApi.post("http://localhost:3000/auth/register", user);
//   return response.data;
// };

export const register = async (user: Omit<User, "id">): Promise<User> => {
  try {
    const response = await authApi.post("/register", user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific error cases
      if (error.response) {
        // Server responded with error status
        throw new Error(
          error.response.data.message || 
          error.response.data.error || 
          "Registration failed"
        );
      } else if (error.request) {
        // Request was made but no response
        throw new Error("No response from server - please try again");
      }
    }
    throw new Error("Registration failed - please try again");
  }
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await authApi.post("http://localhost:3000/auth/login", { 
    email, 
    password 
  });
  return response.data;
};


export const verifyToken = async (token: string): Promise<User> => {
  const response = await authApi.get("/verify", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
