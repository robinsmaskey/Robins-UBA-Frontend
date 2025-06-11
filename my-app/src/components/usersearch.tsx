// import { useState, useMemo } from "react";
// import { userData} from "../userdata/userdata";


// interface User {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
// }

// const USERS_PER_PAGE = 2;

// export default function UserSearch() {
//   const [search, setSearch] = useState("");
//   const [sortAsc, setSortAsc] = useState(true);
//   const [page, setPage] = useState(1);

//   const filteredUsers = useMemo(() => {
//     let users = [...userData];

//     // Filter by name
//     if (search.trim()) {
//       users = users.filter((u) =>
//         `${u.firstname} ${u.lastname}`.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Sort by firstname
//     users.sort((a, b) => {
//       const nameA = a.firstname.toLowerCase();
//       const nameB = b.firstname.toLowerCase();
//       return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
//     });

//     return users;
//   }, [search, sortAsc]);

//   const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
//   const paginatedUsers = filteredUsers.slice(
//     (page - 1) * USERS_PER_PAGE,
//     page * USERS_PER_PAGE
//   );

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">User List</h1>

//       {/* Search and Sort */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//           className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/2"
//         />
//         <button
//           onClick={() => setSortAsc(!sortAsc)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Sort: {sortAsc ? "A → Z" : "Z → A"}
//         </button>
//       </div>

//       {/* Table */}
//       <table className="w-full border border-gray-300 rounded-md">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="text-left p-2">Name</th>
//             <th className="text-left p-2">Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedUsers.length ? (
//             paginatedUsers.map((user) => (
//               <tr key={user.id} className="border-t border-gray-200">
//                 <td className="p-2">{user.firstname} {user.lastname}</td>
//                 <td className="p-2">{user.email}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={2} className="text-center p-4 text-gray-500">No users found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           disabled={page === 1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="text-sm">Page {page} of {totalPages}</span>
//         <button
//           onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//           disabled={page === totalPages}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

//Enhanced:
import { useState, useMemo, useEffect, useCallback } from "react";
import { getUsers } from "../api/api";
import { User } from "../types/user";
import { useAuth } from "../context/authcontext";
import { handleApiError } from "../utils/errorhandler";
import { useNavigate } from "react-router-dom";

const USERS_PER_PAGE = 10;

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    {[...Array(USERS_PER_PAGE)].map((_, index) => (
      <tr key={index} className="border-t border-gray-200">
        <td className="p-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </td>
        <td className="p-3">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </td>
      </tr>
    ))}
  </div>
);

// Search input component
const SearchInput = ({ 
  value, 
  onChange, 
  onClear,
  disabled 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  onClear: () => void;
  disabled: boolean;
}) => (
  <div className="relative w-full md:w-1/2">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="pl-10 pr-10 border border-gray-300 px-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
      aria-label="Search users"
    />
    {value && (
      <button
        onClick={onClear}
        disabled={disabled}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
        aria-label="Clear search"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

// Sort button component
const SortButton = ({ 
  sortAsc, 
  onToggle, 
  disabled 
}: { 
  sortAsc: boolean; 
  onToggle: () => void; 
  disabled: boolean;
}) => (
  <button
    onClick={onToggle}
    disabled={disabled}
    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2"
    aria-label={`Sort ${sortAsc ? 'descending' : 'ascending'}`}
  >
    <span>Sort: {sortAsc ? "A → Z" : "Z → A"}</span>
    <svg className={`h-4 w-4 transform transition-transform ${sortAsc ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
    </svg>
  </button>
);

// Pagination component
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  disabled 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
  disabled: boolean;
}) => {
  const getVisiblePageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || disabled}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          ← Prev
        </button>
        
        {getVisiblePageNumbers().map((pageNum, index) => (
          pageNum === '...' ? (
            <span key={index} className="px-2 py-1 text-gray-500">...</span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum as number)}
              disabled={disabled}
              className={`px-3 py-1 rounded transition-colors ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 disabled:opacity-50'
              } disabled:cursor-not-allowed`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// Error component
const ErrorMessage = ({ 
  message, 
  onRetry, 
  onDismiss 
}: { 
  message: string; 
  onRetry: () => void; 
  onDismiss: () => void;
}) => (
  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
    <div className="flex items-start justify-between">
      <div className="flex">
        <svg className="h-5 w-5 text-red-400 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="text-sm font-medium text-red-800">Error loading users</h3>
          <p className="text-sm text-red-700 mt-1">{message}</p>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-600"
        aria-label="Dismiss error"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="mt-3">
      <button
        onClick={onRetry}
        className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default function UserSearch() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Fetch users from backend
  const fetchUsers = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
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
      setIsRefreshing(false);
    }
  }, [logout, navigate]);

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filteredData = [...users];

    // Filter by name or email
    if (search.trim()) {
      const searchTerm = search.toLowerCase();
      filteredData = filteredData.filter((user) =>
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by firstname
    filteredData.sort((a, b) => {
      const nameA = a.firstname.toLowerCase();
      const nameB = b.firstname.toLowerCase();
      return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    return filteredData;
  }, [users, search, sortAsc]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  // Handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page when searching
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearch("");
    setPage(1);
  }, []);

  const handleSortToggle = useCallback(() => {
    setSortAsc(prev => !prev);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRetry = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRefresh = useCallback(() => {
    fetchUsers(true);
  }, [fetchUsers]);

  const dismissError = useCallback(() => {
    setError("");
  }, []);

  // Reset page when filtered results change
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [totalPages, page]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">User Directory</h1>
          <p className="text-gray-600">Search and browse all users</p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isLoading || isRefreshing}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center space-x-2"
        >
          <svg className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={handleRetry}
          onDismiss={dismissError}
        />
      )}

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          disabled={isLoading}
        />
        
        <SortButton
          sortAsc={sortAsc}
          onToggle={handleSortToggle}
          disabled={isLoading}
        />
      </div>

      {/* Results Summary */}
      {!isLoading && (
        <div className="mb-4 text-sm text-gray-600">
          {search ? (
            <>Showing {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} for "{search}" out of {users.length} total users</>
          ) : (
            <>Showing {users.length} user{users.length !== 1 ? 's' : ''}</>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <LoadingSkeleton />
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-8">
                    <div className="flex flex-col items-center">
                      <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        {search ? 'No users found' : 'No users available'}
                      </h3>
                      <p className="text-gray-500">
                        {search ? `No users match "${search}"` : 'There are no users to display'}
                      </p>
                      {search && (
                        <button
                          onClick={handleSearchClear}
                          className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {user.firstname} {user.lastname}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        disabled={isLoading}
      />
    </div>
  );
}