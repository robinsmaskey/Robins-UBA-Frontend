import axios from "axios";
import { User } from "../types/user";
import { userData} from "../userdata/userdata"

const API_URL = "http://localhost:3000";

export const login = async (email: string, password: string) => {
  // In a real app, this would call a real backend
  // const response = await axios.get(`${API_URL}/users?email=${email}`);
  // const user = response.data[0];

  // if (!user || user.password !== password) {
  //   throw new Error("Invalid credentials");
  // }

  // Mock JWT token generation
  const token = "fake-jwt-token-" + Math.random().toString(36).substring(2);
  // await axios.post(`${API_URL}/auth`, { email, token });

  // return { token, user };
  return{token: "token", user: userData[0]}

};

export const register = async (user: Omit<User, "id">) => {
  return userData[0];
  // const response = await axios.post(`${API_URL}/users`, user);
  // return response.data;
};