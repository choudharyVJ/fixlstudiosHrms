import { useState, useEffect } from "react";

export default function PayrollTable({ records, onProcess }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    setCurrentPage(1);
  }, [records]);

  const totalPages = Math.ceil(records.length / itemsPerPage);

  const paginatedRecords = records.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {[
                "Employee",
                "Department",
                "Basic",
                "Allowances",
                "Deductions",
                "Net Salary",
                "Status",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="border py-2 px-4 text-left font-semibold text-gray-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No payroll records found.
                </td>
              </tr>
            ) : (
              paginatedRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{rec.employee}</td>
                  <td className="border px-4 py-2">{rec.department}</td>
                  <td className="border px-4 py-2">₹{rec.basic}</td>
                  <td className="border px-4 py-2">₹{rec.allowances}</td>
                  <td className="border px-4 py-2">₹{rec.deductions}</td>
                  <td className="border px-4 py-2 font-bold text-blue-600">
                    ₹{rec.basic + rec.allowances - rec.deductions}
                  </td>
                  <td className="border px-4 py-2">{rec.status}</td>
                  <td className="border px-4 py-2">
                    {rec.status === "Pending" && (
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                        onClick={() => onProcess(rec.id)}
                      >
                        Mark Processed
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
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
    </>
  );
}
