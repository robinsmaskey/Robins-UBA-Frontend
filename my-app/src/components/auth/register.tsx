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

//New code
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
//   const [errors, setErrors] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     form: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const validateField = (name: string, value: string) => {
//     switch (name) {
//       case "firstname":
//         if (!value.trim()) return "First name is required";
//         if (value.length < 2) return "First name must be at least 2 characters";
//         return "";
//       case "lastname":
//         if (!value.trim()) return "Last name is required";
//         if (value.length < 2) return "Last name must be at least 2 characters";
//         return "";
//       case "email":
//         if (!value.trim()) return "Email is required";
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
//         return "";
//       case "password":
//         if (!value) return "Password is required";
//         if (value.length < 6) return "Password must be at least 6 characters";
//         return "";
//       default:
//         return "";
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUser(prev => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (errors[name as keyof typeof errors]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {
//       firstname: validateField("firstname", user.firstname),
//       lastname: validateField("lastname", user.lastname),
//       email: validateField("email", user.email),
//       password: validateField("password", user.password),
//       form: ""
//     };

//     if (newErrors.firstname || newErrors.lastname || newErrors.email || newErrors.password) {
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors(prev => ({ ...prev, form: "" }));

//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     try {
//       await register(user);
//       navigate("/");
//     } catch (err) {
//       setErrors(prev => ({
//         ...prev,
//         form: "Registration failed. Email may already be in use."
//       }));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create a new account
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {errors.form && (
//             <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{errors.form}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
//                 First name
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="firstname"
//                   name="firstname"
//                   type="text"
//                   autoComplete="given-name"
//                   value={user.firstname}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full px-3 py-2 border ${errors.firstname ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//                 {errors.firstname && <p className="mt-2 text-sm text-red-600">{errors.firstname}</p>}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
//                 Last name
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="lastname"
//                   name="lastname"
//                   type="text"
//                   autoComplete="family-name"
//                   value={user.lastname}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full px-3 py-2 border ${errors.lastname ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//                 {errors.lastname && <p className="mt-2 text-sm text-red-600">{errors.lastname}</p>}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   value={user.email}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//                 {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="new-password"
//                   value={user.password}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//                 {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : 'Register'}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Already have an account?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Link
//                 to="/login"
//                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Sign in
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//New code2
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User } from "../../types/user";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    try {
      // const response = await axios.post("/api/register", data);
      console.log("Registration successful:");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>First Name</label>
        <input {...register("firstname", { required: true })} />
        {errors.firstname && <span>First name is required</span>}
      </div>

      <div>
        <label>Last Name</label>
        <input {...register("lastname", { required: true })} />
        {errors.lastname && <span>Last name is required</span>}
      </div>

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

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
