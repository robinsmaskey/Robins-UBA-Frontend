// import React, { createContext, useContext, useState, useEffect } from "react";
// import { AuthContextType, LoginResponse } from "../types/auth";
// import { login, register } from "../api/auth";
// import { User } from "../types/user";

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   // Check localStorage on app load
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");
//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogin = async (email: string, password: string) => {
//     const { token, user } = await login(email, password);
//     setToken(token);
//     setUser(user);
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//   };

//   const handleRegister = async (userData: Omit<User, "id">) => {
//     const newUser = await register(userData);
//     await handleLogin(newUser.email, userData.password!);
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         login: handleLogin,
//         register: handleRegister,
//         logout: handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

//Updated:
// context/authcontext.tsx
// import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
// import { login as apiLogin, register as apiRegister } from "../api/auth";
// import { User } from "../types/user";
// import { handleApiError } from "../utils/errorhandler";

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (userData: Omit<User, "id">) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: () => Promise<boolean>;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Initialize auth state from localStorage
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const storedToken = localStorage.getItem("token");
//         const storedUser = localStorage.getItem("user");
        
//         if (storedToken && storedUser) {
//           setToken(storedToken);
//           setUser(JSON.parse(storedUser));
//         }
//       } catch (error) {
//         console.error("Failed to initialize auth:", error);
//         logout();
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   const login = useCallback(async (email: string, password: string): Promise<void> => {
//     try {
//       setIsLoading(true);
//       const { token, user } = await apiLogin(email, password);
      
//       setToken(token);
//       setUser(user);
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//     } catch (error) {
//       const apiError = handleApiError(error);
//       logout();
//       throw apiError;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const register = useCallback(async (userData: Omit<User, "id">): Promise<void> => {
//     console.log("Calling API with:", userData);
//     try {
//       setIsLoading(true);
//       await apiRegister(userData);
//       await login(userData.email, userData.password!);
//     } catch (error) {
//       const apiError = handleApiError(error);
//       throw apiError;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [login]);

//   const logout = useCallback(() => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }, []);

//   const verifyToken = useCallback(async (): Promise<boolean> => {
//     if (!token) return false;
    
//     // In a real app, you would verify the token here
//     // For now, we'll assume it's valid if it exists
//     return true;
//   }, [token]);

//   const isAuthenticated = useCallback(async (): Promise<boolean> => {
//     if (!token || !user) return false;
//     return await verifyToken();
//   }, [token, user, verifyToken]);

//   const value: AuthContextType = {
//     user,
//     token,
//     isLoading,
//     login,
//     register,
//     logout,
//     isAuthenticated
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!isLoading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

//Enhanced Authcontext:
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin, register as apiRegister, verifyToken } from "../api/auth";
import { User } from "../types/user";
import { AuthContextType } from "../types/auth";
import { handleApiError } from "../utils/errorhandler";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        
        if (storedToken) {
          // Verify token with backend
          try {
            const userData = await verifyToken(storedToken);
            setToken(storedToken);
            setUser(userData);
          } catch (error) {
            // Token is invalid, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = useCallback(async (user: Omit<User, "id">): Promise<void> => {
  try {
    setIsLoading(true);
    const registeredUser = await apiRegister(user);
    
    // Auto-login after successful registration
    try {
      const { token: newToken, user: userData } = await apiLogin(
        user.email, 
        user.password!
      );
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (loginError) {
      // Registration succeeded but login failed
      console.error("Auto-login failed after registration:", loginError);
      throw new Error("Account created but login failed. Please login manually.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error; // Re-throw to be caught in the component
  } finally {
    setIsLoading(false);
  }
}, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const { token: newToken, user: userData } = await apiLogin(email, password);
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      const apiError = handleApiError(error);
      logout();
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // const register = useCallback(async (user: Omit<User, "id">): Promise<void> => {
  //   try {
  //     setIsLoading(true);
  //     await apiRegister(user);
  //     // Auto-login after successful registration
  //     await login(user.email, user.password!);
  //   } catch (error) {
  //     const apiError = handleApiError(error);
  //     throw apiError;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [login]);


  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const isAuthenticated = useCallback((): boolean => {
    return !!(token && user);
  }, [token, user]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};