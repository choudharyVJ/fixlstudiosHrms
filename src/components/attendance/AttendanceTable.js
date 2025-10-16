import { useState, useEffect } from "react";

export default function AttendanceTable({ employees, attendanceForDate, markAttendance }) {
  const statusOptions = ["Present", "Absent", "On Leave"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    setCurrentPage(1);
  }, [employees]);

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const paginatedEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {["Name", "Department", "Status"].map((h) => (
                <th
                  key={h}
                  className="border border-gray-200 py-2 px-4 text-left text-sm font-semibold text-gray-600"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              paginatedEmployees.map(({ id, fullName, department }) => (
                <tr key={id} className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2">{fullName}</td>
                  <td className="border border-gray-200 px-4 py-2">{department}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <select
                      className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                      value={attendanceForDate[id] || ""}
                      onChange={(e) => markAttendance(id, e.target.value)}
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
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
