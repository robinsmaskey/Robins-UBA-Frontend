// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/authcontext";
// import { User } from "../../types/user";

// export default function Register() {
//   const [user, setUser] = useState<Omit<User, "id">>({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await register(user);
//       navigate("/");
//     } catch (err) {
//       setError("Registration failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input
//         type="text"
//         value={user.firstname}
//         onChange={(e) => setUser({ ...user, firstname: e.target.value })}
//         placeholder="First Name"
//         required
//       />
//       <input
//         type="text"
//         value={user.lastname}
//         onChange={(e) => setUser({ ...user, lastname: e.target.value })}
//         placeholder="Last Name"
//         required
//       />
//       <input
//         type="email"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// }

//Enhanced:
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import { User } from "../../types/user";

export default function Register() {
  const [user, setUser] = useState<Omit<User, "id">>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!user.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    if (!user.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (user.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrors({});

  //   if (!validateForm()) return;

  //   setIsLoading(true);
  //   try {
  //     await register(user);
  //     navigate("/");
  //   } catch (err: any) {
  //     setErrors({ general: err.message || "Registration failed" });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({});

  if (!validateForm()) return;

  setIsLoading(true);
  try {
    await register(user);
    navigate("/");
  } catch (err: any) {
    console.error("Registration error:", err);
    
    // Handle different error cases
    let errorMessage = err.message || "Registration failed";
    
    // Handle common error cases
    if (err.message.includes("400")) {
      errorMessage = "Invalid registration data";
    } else if (err.message.includes("409")) {
      errorMessage = "Email already exists";
    } else if (err.message.includes("network")) {
      errorMessage = "Network error - please check your connection";
    }

    setErrors({ general: errorMessage });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{errors.general}</div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={user.firstname}
                onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                placeholder="First Name"
                className={`appearance-none relative block w-full px-3 py-2 border ${errors.firstname ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                required
              />
              {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
            </div>

            <div>
              <input
                type="text"
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                placeholder="Last Name"
                className={`appearance-none relative block w-full px-3 py-2 border ${errors.lastname ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                required
              />
              {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
            </div>

            <div>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
                className={`appearance-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                className={`appearance-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                required
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className={`appearance-none relative block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                required
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}