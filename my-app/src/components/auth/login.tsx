// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/authcontext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       navigate("/");
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

//New code
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/authcontext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = { email: "", password: "" };
//     if (!email) newErrors.email = "Email is required";
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format";
//     if (!password) newErrors.password = "Password is required";
    
//     setErrors(newErrors);
//     return !newErrors.email && !newErrors.password;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       await login(email, password);
//       navigate("/");
//     } catch (err) {
//       setErrors({ ...errors, password: "Invalid credentials" });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email field with error handling */}
//           {/* Password field with error handling */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

//New code2
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User } from "../../types/user";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<User, "email" | "password">>();

  const onSubmit = async (data: Pick<User, "email" | "password">) => {
    try {
      // const response = await axios.post("/api/login", data);
      // console.log("Login successful:", response.data);
      localStorage.setItem("token", "abcd")
      alert("Login successfull")
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <span>Email is required</span>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <span>Password is required</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

