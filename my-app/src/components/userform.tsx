// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getUser, createUser, updateUser } from "../api/api";
// import { User } from "../types/user";

// export default function UserForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState<Omit<User, "id">>({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         const data = await getUser(Number(id));
//         setUser(data);
//       };
//       fetchUser();
//     }
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (id) {
//       await updateUser(Number(id), user);
//     } else {
//       await createUser(user);
//     }
//     navigate("/");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={user.firstname}
//         onChange={(e) => setUser({ ...user, firstname: e.target.value })}
//         placeholder="First Name"
//       />
//       <input
//         type="text"
//         value={user.lastname}
//         onChange={(e) => setUser({ ...user, lastname: e.target.value })}
//         placeholder="Last Name"
//       />
//       <input
//         type="email"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder="Password"
//       />
//       <button type="submit">{id ? "Update" : "Create"}</button>
//     </form>
//   );
// }

//New code
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getUser, createUser, updateUser } from "../api/api";
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
//       const fetchUser = async () => {
//         const data = await getUser(Number(id));
//         setUser(data);
//       };
//       fetchUser();
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       if (id) {
//         await updateUser(Number(id), user);
//       } else {
//         await createUser(user);
//       }
//       navigate("/");
//     } catch (error) {
//       setErrors({
//         ...errors,
//         email: "Error saving user. Please try again."
//       });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">
//         {id ? "Edit User" : "Create New User"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">First Name</label>
//           <input
//             type="text"
//             value={user.firstname}
//             onChange={(e) => setUser({ ...user, firstname: e.target.value })}
//             className={`mt-1 block w-full px-3 py-2 border ${errors.firstname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
//             placeholder="First Name"
//           />
//           {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Last Name</label>
//           <input
//             type="text"
//             value={user.lastname}
//             onChange={(e) => setUser({ ...user, lastname: e.target.value })}
//             className={`mt-1 block w-full px-3 py-2 border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
//             placeholder="Last Name"
//           />
//           {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//             className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
//             placeholder="Email"
//           />
//           {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//         </div>

//         {!id && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={user.password}
//               onChange={(e) => setUser({ ...user, password: e.target.value })}
//               className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
//               placeholder="Password"
//             />
//             {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
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

//New Code
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getUser, createUser, updateUser } from "../api/api";
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
//       const fetchUser = async () => {
//         const data = await getUser(Number(id));
//         setUser({
//           ...data,
//           password: "", // Ensure password is always a string
//         });
//       };
//       fetchUser();
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const trimmedUser = {
//         firstname: user.firstname.trim(),
//         lastname: user.lastname.trim(),
//         email: user.email.trim(),
//         password: user.password,
//       };

//       if (id) {
//         // Remove password for update
//         const { password, ...updateData } = trimmedUser;
//         await updateUser(Number(id), updateData);
//       } else {
//         await createUser(trimmedUser);
//       }

//       navigate("/");
//     } catch (error) {
//       setErrors({
//         ...errors,
//         email: "Error saving user. Please try again.",
//       });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">
//         {id ? "Edit User" : "Create New User"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">First Name</label>
//           <input
//             type="text"
//             value={user.firstname}
//             onChange={(e) => setUser({ ...user, firstname: e.target.value })}
//             className={`mt-1 block w-full px-3 py-2 border ${errors.firstname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
//             placeholder="First Name"
//           />
//           {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Last Name</label>
//           <input
//             type="text"
//             value={user.lastname}
//             onChange={(e) => setUser({ ...user, lastname: e.target.value })}
//             className={`mt-1 block w-full px-3 py-2 border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
//             placeholder="Last Name"
//           />
//           {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//             className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
//             placeholder="Email"
//           />
//           {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//         </div>

//         {!id && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={user.password}
//               onChange={(e) => setUser({ ...user, password: e.target.value })}
//               className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
//               placeholder="Password"
//             />
//             {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
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

//New code2
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, createUser, updateUser } from "../api/api";
import { User } from "../types/user";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<Omit<User, "id"> & { password: string }>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const data = await getUser(Number(id));
          setUser({
            ...data,
            password: "", // password not fetched/set on edit
          });
        } catch (err) {
          // Handle error or show message
          console.error("Failed to fetch user", err);
        }
      };
      fetchUser();
    }
  }, [id]);

  const validate = () => {
    let valid = true;
    const newErrors = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };

    if (!user.firstname.trim()) {
      newErrors.firstname = "First name is required";
      valid = false;
    }

    if (!user.lastname.trim()) {
      newErrors.lastname = "Last name is required";
      valid = false;
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!id && !user.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!id && user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const trimmedUser = {
        firstname: user.firstname.trim(),
        lastname: user.lastname.trim(),
        email: user.email.trim(),
        password: user.password,
      };

      if (id) {
        // For update, exclude password if empty
        const { password, ...updateData } = trimmedUser;
        await updateUser(Number(id), updateData);
      } else {
        await createUser(trimmedUser);
      }

      navigate("/");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        email: "Error saving user. Please try again.",
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Edit User" : "Create New User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.firstname ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm`}
            placeholder="First Name"
          />
          {errors.firstname && (
            <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.lastname ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm`}
            placeholder="Last Name"
          />
          {errors.lastname && (
            <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {!id && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
        >
          {id ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}

