// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getUsers, deleteUser } from "../api/api";
// import { User } from "../types/user";
// import { useAuth } from "../context/authcontext";

// export default function UserList() {
//   const [users, setUsers] = useState<User[]>([]);
//   const { user, logout } = useAuth(); // Get auth context

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const data = await getUsers();
//       setUsers(data);
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id: number) => {
//     await deleteUser(id);
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <h1>Users</h1>
//         <div>
//           {user && (
//             <span style={{ marginRight: '1rem' }}>
//               Welcome, {user.firstname}!
//             </span>
//           )}
//           <button onClick={logout}>Logout</button>
//         </div>
//       </div>
      
//       <Link to="/users/new">Add User</Link>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.firstname} {user.lastname} ({user.email})
//             <Link to={`/users/${user.id}/edit`}>Edit</Link>
//             <button onClick={() => handleDelete(user.id!)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

//New code
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../api/api";
import { User } from "../types/user";
import { useAuth } from "../context/authcontext";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-gray-600">
              Welcome, <span className="font-medium">{user.firstname}</span>!
            </span>
          )}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-6">
        <Link
          to="/users/new"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Add New User
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {user.firstname} {user.lastname}
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/users/${user.id}/edit`}
                    className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id!)}
                    className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}