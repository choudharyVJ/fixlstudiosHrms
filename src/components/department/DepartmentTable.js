import { useContext, useState } from "react";
import DepartmentContext from "../../context/DepartmentContext";
import { toast } from "react-hot-toast";

export default function DepartmentTable({ onEdit }) {
  const { departments, dispatch } = useContext(DepartmentContext);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;


  const totalPages = Math.ceil(departments.length / itemsPerPage);


  const paginatedDepartments = departments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    const dep = departments.find((d) => d.id === id);
    if (window.confirm(`Are you sure you want to delete "${dep.name}"?`)) {
      dispatch({ type: "DELETE_DEPARTMENT", payload: id });
      toast.success(`Department "${dep.name}" deleted successfully!`);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };
{console.log(departments,"scscdsc")}
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {[
                "Department Name",
                "Total Employees",
                "Manager",
                "Attendance Rate",
                "Avg Salary",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="border py-2 px-4 text-left font-semibold text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedDepartments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No departments found.
                </td>
              </tr>
            ) : (
              paginatedDepartments.map((dep) => (
                <tr key={dep.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{dep.name}</td>
                  <td className="border px-4 py-2">{dep.employees.length}</td>
                  <td className="border px-4 py-2">{dep.manager}</td>
                  <td className="border px-4 py-2">{dep.attendanceRate}%</td>
                  <td className="border px-4 py-2">₹{dep.averageSalary}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => onEdit(dep)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(dep.id)}
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
