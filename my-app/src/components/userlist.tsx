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
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getUsers, deleteUser } from "../api/api";
// import { User } from "../types/user";
// import { useAuth } from "../context/authcontext";

// export default function UserList() {
//   const [users, setUsers] = useState<User[]>([]);
//   const { user, logout } = useAuth();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const data = await getUsers();
//       setUsers(data);
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       await deleteUser(id);
//       setUsers(users.filter((user) => user.id !== id));
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//         <div className="flex items-center space-x-4">
//           {user && (
//             <span className="text-gray-600">
//               Welcome, <span className="font-medium">{user.firstname}</span>!
//             </span>
//           )}
//           <button
//             onClick={logout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="mb-6">
//         <Link
//           to="/users/new"
//           className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
//         >
//           Add New User
//         </Link>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <ul className="divide-y divide-gray-200">
//           {users.map((user) => (
//             <li key={user.id} className="p-4 hover:bg-gray-50">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//                 <div className="flex-1">
//                   <h3 className="font-medium text-gray-800">
//                     {user.firstname} {user.lastname}
//                   </h3>
//                   <p className="text-sm text-gray-600">{user.email}</p>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Link
//                     to={`/users/${user.id}/edit`}
//                     className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition duration-200"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(user.id!)}
//                     className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition duration-200"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

//Updated:
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getUsers, deleteUser } from "../api/api";
// import { User } from "../types/user";
// import { useAuth } from "../context/authcontext";
// import { handleApiError } from "../utils/errorhandler";
// import { useNavigate } from "react-router-dom";

// export default function UserList() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { user: currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setIsLoading(true);
//         setError("");
//         const data = await getUsers();
//         setUsers(data);
//       } catch (error) {
//         const apiError = handleApiError(error);
//         setError(apiError.message || "Failed to load users");
//         if (apiError.status === 401) {
//           logout();
//           navigate("/login");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchUsers();
//   }, [navigate, logout]);

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         setIsLoading(true);
//         await deleteUser(id);
//         setUsers(users.filter((user) => user.id !== id));
//       } catch (error) {
//         const apiError = handleApiError(error);
//         setError(apiError.message || "Failed to delete user");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//         <div className="flex items-center space-x-4">
//           {currentUser && (
//             <span className="text-gray-600">
//               Welcome, <span className="font-medium">{currentUser.firstname}</span>!
//             </span>
//           )}
//           <button
//             onClick={logout}
//             disabled={isLoading}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="mb-6">
//         <Link
//           to="/users/new"
//           className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
//         >
//           Add New User
//         </Link>
//       </div>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//           {error}
//         </div>
//       )}

//       {isLoading && !users.length ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           {users.length === 0 ? (
//             <div className="p-8 text-center">
//               <p className="text-gray-500">No users found</p>
//               <Link
//                 to="/users/new"
//                 className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
//               >
//                 Create First User
//               </Link>
//             </div>
//           ) : (
//             <ul className="divide-y divide-gray-200">
//               {users.map((user) => (
//                 <li key={user.id} className="p-4 hover:bg-gray-50">
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//                     <div className="flex-1">
//                       <h3 className="font-medium text-gray-800">
//                         {user.firstname} {user.lastname}
//                       </h3>
//                       <p className="text-sm text-gray-600">{user.email}</p>
//                       {user.id === currentUser?.id && (
//                         <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
//                           Current User
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex space-x-2">
//                       <Link
//                         to={`/users/${user.id}/edit`}
//                         className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition duration-200"
//                       >
//                         Edit
//                       </Link>
//                       {user.id !== currentUser?.id && (
//                         <button
//                           onClick={() => handleDelete(user.id!)}
//                           disabled={isLoading}
//                           className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

//Enhanced:
import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../api/api";
import { User } from "../types/user";
import { useAuth } from "../context/authcontext";
import { handleApiError } from "../utils/errorhandler";
import { useNavigate } from "react-router-dom";

// Loading spinner component for better reusability
const LoadingSpinner = ({ size = "h-12 w-12" }: { size?: string }) => (
  <div className="flex justify-center items-center">
    <div className={`animate-spin rounded-full ${size} border-t-2 border-b-2 border-blue-500`} />
  </div>
);

// User card component for better organization
const UserCard = ({ 
  user, 
  isCurrentUser, 
  onDelete, 
  isDeleting 
}: { 
  user: User; 
  isCurrentUser: boolean; 
  onDelete: (id: number) => void; 
  isDeleting: boolean; 
}) => (
  <li className="p-4 hover:bg-gray-50 transition-colors duration-150">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-800 truncate">
          {user.firstname} {user.lastname}
        </h3>
        <p className="text-sm text-gray-600 truncate" title={user.email}>
          {user.email}
        </p>
        {isCurrentUser && (
          <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
            Current User
          </span>
        )}
      </div>
      <div className="flex space-x-2 flex-shrink-0">
        <Link
          to={`/users/${user.id}/edit`}
          className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label={`Edit ${user.firstname} ${user.lastname}`}
        >
          Edit
        </Link>
        {!isCurrentUser && (
          <button
            onClick={() => onDelete(user.id!)}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            aria-label={`Delete ${user.firstname} ${user.lastname}`}
          >
            {isDeleting ? <LoadingSpinner size="h-4 w-4" /> : "Delete"}
          </button>
        )}
      </div>
    </div>
  </li>
);

// Error alert component
const ErrorAlert = ({ message, onDismiss }: { message: string; onDismiss?: () => void }) => (
  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex justify-between items-center">
    <span>{message}</span>
    {onDismiss && (
      <button
        onClick={onDismiss}
        className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
        aria-label="Dismiss error"
      >
        ×
      </button>
    )}
  </div>
);

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const { user: currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Memoize current user ID for performance
  const currentUserId = useMemo(() => currentUser?.id, [currentUser]);

  // Fetch users with better error handling
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      const apiError = handleApiError(error);
      setError(apiError.message || "Failed to load users");
      
      if (apiError.status === 401) {
        logout();
        navigate("/login", { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate, logout]);

  // Enhanced delete handler with individual loading states
  const handleDelete = useCallback(async (id: number) => {
    const userToDelete = users.find(user => user.id === id);
    const userName = userToDelete ? `${userToDelete.firstname} ${userToDelete.lastname}` : 'this user';
    
    if (!window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingUserId(id);
      setError("");
      await deleteUser(id);
      
      // Optimistic update
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      
      // Optional: Show success message
      // You could add a success state here if needed
      
    } catch (error) {
      const apiError = handleApiError(error);
      setError(apiError.message || "Failed to delete user");
      
      // Refresh the list to ensure consistency
      fetchUsers();
    } finally {
      setDeletingUserId(null);
    }
  }, [users, fetchUsers]);

  // Handle logout with confirmation for better UX
  const handleLogout = useCallback(() => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  }, [logout]);

  // Dismiss error handler
  const dismissError = useCallback(() => setError(""), []);

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Retry mechanism
  const handleRetry = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">User Management</h1>
          <p className="text-gray-600">Manage your application users</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser && (
            <div className="text-right">
              <span className="text-gray-600 block text-sm">Welcome back,</span>
              <span className="font-medium text-gray-800">{currentUser.firstname}!</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center space-x-2"
          >
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Action Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link
          to="/users/new"
          className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          <span className="mr-2">+</span>
          Add New User
        </Link>
        
        {users.length > 0 && (
          <div className="text-sm text-gray-500">
            Total users: {users.length}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && <ErrorAlert message={error} onDismiss={dismissError} />}

      {/* Main Content */}
      <main>
        {isLoading && users.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-sm">
            <LoadingSpinner />
            <p className="mt-4 text-gray-500">Loading users...</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {users.length === 0 ? (
              <div className="p-12 text-center">
                <div className="mb-4">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first user.</p>
                <div className="space-y-3">
                  <Link
                    to="/users/new"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Create First User
                  </Link>
                  {error && (
                    <div>
                      <button
                        onClick={handleRetry}
                        className="inline-block bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                      >
                        Retry Loading
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200" role="list">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isCurrentUser={user.id === currentUserId}
                    onDelete={handleDelete}
                    isDeleting={deletingUserId === user.id}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
}