// // utils/errorHandler.ts
// import { AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";

// export interface ApiError {
//   message: string;
//   status?: number;
//   errors?: Record<string, string>;
// }

// export const handleApiError = (error: unknown): ApiError => {
//   const axiosError = error as AxiosError<{
//     message?: string;
//     errors?: Record<string, string>;
//   }>;
  
//   if (axiosError.response) {
//     return {
//       message: axiosError.response.data?.message || "An error occurred",
//       status: axiosError.response.status,
//       errors: axiosError.response.data?.errors
//     };
//   }
  
//   if (axiosError.request) {
//     return {
//       message: "No response from server - please check your network connection",
//       status: undefined
//     };
//   }
  
//   return {
//     message: axiosError.message || "An unknown error occurred",
//     status: undefined
//   };
// };

// export const useAuthErrorHandler = () => {
//   const navigate = useNavigate();
  
//   return (error: unknown) => {
//     const { status } = handleApiError(error);
//     if (status === 401) {
//       navigate("/login");
//     }
//   };
// };

//UPdated:
import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;

    // Handle different error scenarios
    if (status === 401) {
      return {
        message: "Authentication failed. Please login again.",
        status: 401,
      };
    }

    if (status === 403) {
      return {
        message: "You don't have permission to perform this action.",
        status: 403,
      };
    }

    if (status === 404) {
      return {
        message: "Resource not found.",
        status: 404,
      };
    }

    if (status === 422 && data?.errors) {
      return {
        message: data.message || "Validation failed",
        status: 422,
        errors: data.errors,
      };
    }

    if (status === 500) {
      return {
        message: "Internal server error. Please try again later.",
        status: 500,
      };
    }

    // Network or timeout error
    if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
      return {
        message: "Network error. Please check your connection and try again.",
        status: 0,
      };
    }

    // Generic error with message from server
    return {
      message: data?.message || error.message || "An unexpected error occurred",
      status: status || 0,
    };
  }

  // Non-axios error
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 0,
    };
  }

  return {
    message: "An unexpected error occurred",
    status: 0,
  };
};