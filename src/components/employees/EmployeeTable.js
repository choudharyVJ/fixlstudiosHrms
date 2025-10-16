import { useContext, useState, useMemo } from "react";
import EmployeeContext from "../../context/EmployeeContext";
import StatusBadge from "./StatusBadge";
import { toast } from "react-hot-toast";

export default function EmployeeTable({ onEdit }) {
  const { employees, dispatch } = useContext(EmployeeContext);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchSearch =
        emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase());
      const matchDept = filterDept === "All" || emp.department === filterDept;
      const matchStatus = filterStatus === "All" || emp.status === filterStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, search, filterDept, filterStatus]);

  
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const departments = ["All", ...new Set(employees.map((e) => e.department))];
  const statuses = ["All", "Active", "Inactive", "Probation"];

  const handleDelete = (id) => {
    const emp = employees.find((e) => e.id === id);
    if (window.confirm(`Are you sure you want to delete "${emp.fullName}"?`)) {
      dispatch({ type: "DELETE_EMPLOYEE", payload: id });
      toast.success(`Employee "${emp.fullName}" deleted successfully!`);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterDept}
          onChange={(e) => {
            setFilterDept(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {[
                "Name",
                "Email",
                "Department",
                "Role",
                "Status",
                "Joining Date",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="border border-gray-200 py-2 px-4 text-left text-sm font-semibold text-gray-600"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2">
                    {emp.fullName}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {emp.email}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {emp.department}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{emp.role}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <StatusBadge status={emp.status} />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {emp.joiningDate}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => onEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-3 py-1 border rounded ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
