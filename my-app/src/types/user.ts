//New code
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

// Validation error type
export type ValidationErrors = {
  [key in keyof Omit<User, "id">]?: string;
};