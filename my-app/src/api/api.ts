// import axios from "axios";
// import { User } from "../types/user";

// const API_URL = "http://localhost:3001/users";

// export const getUsers = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

// export const getUser = async (id: number) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

// export const createUser = async (user: Omit<User, "id">) => {
//   const response = await axios.post(API_URL, user);
//   return response.data;
// };

// export const updateUser = async (id: number, user: Partial<User>) => {
//   const response = await axios.put(`${API_URL}/${id}`, user);
//   return response.data;
// };

// export const deleteUser = async (id: number) => {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data;
// };

//Updated:
// import axios from "axios";
// import { User } from "../types/user";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/";

// // Create axios instance with base config
// const api = axios.create({
//   baseURL: `${API_URL}/api`,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add request interceptor to include auth token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const getUsers = async () => {
//   const response = await api.get("/users");
//   return response.data;
// };

// export const getUser = async (id: number) => {
//   const response = await api.get(`/users/${id}`);
//   return response.data;
// };

// export const createUser = async (user: Omit<User, "id">) => {
//   const response = await api.post("/users", user);
//   return response.data;
// };

// export const updateUser = async (id: number, user: Partial<User>) => {
//   const response = await api.put(`/users/${id}`, user);
//   return response.data;
// };

// export const deleteUser = async (id: number) => {
//   const response = await api.delete(`/users/${id}`);
//   return response.data;
// };

// export default api;

//Updated2:
import axios, { AxiosError } from "axios";
import { User } from "../types/user";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

// Create axios instance with base config
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// User API functions
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("http://localhost:3000/api/users");
  return response.data;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await api.post("/users", user);
  return response.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await api.put(`http://localhost:3000/api/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export default api;