import axios from "axios";
import { User } from "../types/user";
import { userData } from "../userdata/userdata";

// const API_URL = "http://localhost:3000/users";

export const getUsers = async () => {
  // const response = await axios.get(API_URL);
  // return response.data;
  return userData;
};

export const getUser = async (id: number) => {
  // const response = await axios.get(`${API_URL}/${id}`);
  // return response.data;
  return userData[0];
};

export const createUser = async (user: Omit<User, "id">) => {
  // const response = await axios.post(API_URL, user);
  // return response.data;
  return userData;
};

export const updateUser = async (id: number, user: Partial<User>) => {
  // const response = await axios.put(`${API_URL}/${id}`, user);
  // return response.data;
  return userData;
};

export const deleteUser = async (id: number) => {
  // const response = await axios.delete(`${API_URL}/${id}`);
  // return response.data;
  return [userData];
};