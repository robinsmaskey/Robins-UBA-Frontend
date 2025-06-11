// import { User } from "../types/user";

// export interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (user: Omit<User, "id">) => Promise<void>;
//   logout: () => void;
// }

// export interface LoginResponse {
//   token: string;
//   user: User;
// }

//New
import { User } from "./user";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (user: Omit<User, "id">) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}