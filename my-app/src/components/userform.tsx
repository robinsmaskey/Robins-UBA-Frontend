// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { userData } from "../userdata/userdata";
// import { User } from "../types/user";

// export default function UserForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [user, setUser] = useState<Omit<User, "id"> & { password: string }>({
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
//   });

//   useEffect(() => {
//     if (id) {
//       const existing = userData.find((u) => u.id === Number(id));
//       if (existing) {
//         setUser({ ...existing, password: "" });
//       }
//     }
//   }, [id]);

//   const validate = () => {
//     let valid = true;
//     const newErrors = {
//       firstname: "",
//       lastname: "",
//       email: "",
//       password: "",
//     };

//     if (!user.firstname.trim()) {
//       newErrors.firstname = "First name is required";
//       valid = false;
//     }

//     if (!user.lastname.trim()) {
//       newErrors.lastname = "Last name is required";
//       valid = false;
//     }

//     if (!user.email.trim()) {
//       newErrors.email = "Email is required";
//       valid = false;
//     } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
//       newErrors.email = "Invalid email format";
//       valid = false;
//     }

//     if (!id && !user.password) {
//       newErrors.password = "Password is required";
//       valid = false;
//     } else if (!id && user.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const trimmedUser = {
//       firstname: user.firstname.trim(),
//       lastname: user.lastname.trim(),
//       email: user.email.trim(),
//       password: user.password,
//     };

//     if (id) {
//       const index = userData.findIndex((u) => u.id === Number(id));
//       if (index !== -1) {
//         userData[index] = {
//           ...userData[index],
//           ...trimmedUser,
//         };
//       }
//     } else {
//       const newId = Math.max(...userData.map((u) => u.id), 0) + 1;
//       userData.push({ id: newId, ...trimmedUser });
//     }

//     navigate("/");
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">
//         {id ? "Edit User" : "Create New User"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             First Name
//           </label>
//           <input
//             type="text"
//             value={user.firstname}
//             onChange={(e) => setUser({ ...user, firstname: e.target.value })}
//             className={`mt-1 block w-full px-3 py-2 border ${
//               errors.firstname ? "border-red-500" : "border-gray-300"
//             } rounded-md shadow-sm`}
//             placeholder="First Name"
//           />
//           {errors.firstname && (
//             <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Last Name
//           </label>
//           <input
//             type="text"
//             value={user.lastname}
//             onChange={(e) => setUser({ ...user, lastname: e.target.value })}
//             className={`mt-1 block w-full px-3 py-2 border ${
//               errors.lastname ? "border-red-500" : "border-gray-300"
//             } rounded-md shadow-sm`}
//             placeholder="Last Name"
//           />
//           {errors.lastname && (
//             <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//             className={`mt-1 block w-full px-3 py-2 border ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             } rounded-md shadow-sm`}
//             placeholder="Email"
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//           )}
//         </div>

//         {!id && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               value={user.password}
//               onChange={(e) => setUser({ ...user, password: e.target.value })}
//               className={`mt-1 block w-full px-3 py-2 border ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               } rounded-md shadow-sm`}
//               placeholder="Password"
//             />
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//             )}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
//         >
//           {id ? "Update User" : "Create User"}
//         </button>
//       </form>
//     </div>
//   );
// }

//Updated:
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getUser, createUser, updateUser } from "../api/api";
// import { User } from "../types/user";
// import { handleApiError } from "../utils/errorhandler";

// export default function UserForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [user, setUser] = useState<Omit<User, "id"> & { password: string }>({
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
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (id) {
//         try {
//           setIsLoading(true);
//           const existing = await getUser(Number(id));
//           setUser({ ...existing, password: "" });
//         } catch (error) {
//           const apiError = handleApiError(error);
//           setFormError(apiError.message);
//           if (apiError.status === 404) {
//             navigate("/", { replace: true });
//           }
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };
//     fetchUser();
//   }, [id, navigate]);

//   const validate = () => {
//     let valid = true;
//     const newErrors = {
//       firstname: "",
//       lastname: "",
//       email: "",
//       password: "",
//     };

//     if (!user.firstname.trim()) {
//       newErrors.firstname = "First name is required";
//       valid = false;
//     }

//     if (!user.lastname.trim()) {
//       newErrors.lastname = "Last name is required";
//       valid = false;
//     }

//     if (!user.email.trim()) {
//       newErrors.email = "Email is required";
//       valid = false;
//     } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
//       newErrors.email = "Invalid email format";
//       valid = false;
//     }

//     if (!id && !user.password) {
//       newErrors.password = "Password is required";
//       valid = false;
//     } else if (!id && user.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError("");
//     if (!validate() || isLoading) return;

//     const trimmedUser = {
//       firstname: user.firstname.trim(),
//       lastname: user.lastname.trim(),
//       email: user.email.trim(),
//       password: user.password,
//     };

//     setIsLoading(true);
//     try {
//       if (id) {
//         await updateUser(Number(id), trimmedUser);
//       } else {
//         await createUser(trimmedUser);
//       }
//       navigate("/");
//     } catch (error) {
//       const apiError = handleApiError(error);
//       if (apiError.errors) {
//         // Handle server-side validation errors
//         setErrors(prev => ({
//           ...prev,
//           ...apiError.errors
//         }));
//       }
//       setFormError(apiError.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">
//         {id ? "Edit User" : "Create New User"}
//       </h2>
      
//       {formError && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//           {formError}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Form fields remain the same as your original */}
//         {/* ... */}
//       </form>
//     </div>
//   );
// }

//Enhanded:
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getUser, createUser, updateUser } from "../api/api";
import { User } from "../types/user";
import { handleApiError } from "../utils/errorhandler";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [user, setUser] = useState<Omit<User, "id"> & { password: string }>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const existing = await getUser(Number(id));
          setUser({ ...existing, password: "" });
        } catch (error) {
          const apiError = handleApiError(error);
          setFormError(apiError.message);
          if (apiError.status === 404) {
            navigate("/", { replace: true });
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUser();
  }, [id, navigate]);

  const validate = () => {
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

    if (!isEditing && !user.password) {
      newErrors.password = "Password is required";
    } else if (!isEditing && user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (isEditing && user.password && user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setErrors({});

    if (!validate() || isLoading) return;

    const userData = {
      firstname: user.firstname.trim(),
      lastname: user.lastname.trim(),
      email: user.email.trim(),
      ...(user.password && { password: user.password }),
    };

    setIsLoading(true);
    try {
      if (isEditing) {
        await updateUser(Number(id), userData);
      } else {
        await createUser(userData);
      }
      navigate("/");
    } catch (error) {
      const apiError = handleApiError(error);
      if (apiError.errors) {
        setErrors(apiError.errors);
      }
      setFormError(apiError.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing && !user.firstname) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit User" : "Create New User"}
          </h2>
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            ← Back to Users
          </Link>
        </div>
        
        {formError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={user.firstname}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.firstname ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.firstname && (
              <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.lastname ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.lastname && (
              <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password {isEditing && <span className="text-gray-500">(leave blank to keep current)</span>}
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              required={!isEditing}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : (isEditing ? "Update User" : "Create User")}
            </button>
            <Link
              to="/"
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md text-center transition duration-200"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
