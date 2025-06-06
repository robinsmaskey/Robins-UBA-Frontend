import { useState, useMemo } from "react";
import { userData} from "../userdata/userdata";


interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const USERS_PER_PAGE = 2;

export default function UserList() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filteredUsers = useMemo(() => {
    let users = [...userData];

    // Filter by name
    if (search.trim()) {
      users = users.filter((u) =>
        `${u.firstname} ${u.lastname}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by firstname
    users.sort((a, b) => {
      const nameA = a.firstname.toLowerCase();
      const nameB = b.firstname.toLowerCase();
      return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    return users;
  }, [search, sortAsc]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/2"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Sort: {sortAsc ? "A → Z" : "Z → A"}
        </button>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length ? (
            paginatedUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="p-2">{user.firstname} {user.lastname}</td>
                <td className="p-2">{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center p-4 text-gray-500">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
