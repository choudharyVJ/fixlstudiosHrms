import React, { useContext } from "react";
import LeaveContext from "../../context/LeaveContext"; 

export default function LeaveTable({
  leaveRequests,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
  currentPage,
  goToPage,
  totalPages,
  itemsPerPage,
}) {
  const { dispatch } = useContext(LeaveContext);

  const leaveTypes = ["All", ...new Set(leaveRequests.flatMap((lr) => lr.leaveType))];
  const statuses = ["All", "Pending", "Approved", "Rejected"];

  const handleStatusChange = (id, newStatus) => {
    const leave = leaveRequests.find((lr) => lr.id === id);
    if (!leave) return;

    dispatch({
      type: "UPDATE_LEAVE",
      payload: { ...leave, status: newStatus },
    });
  };

  return (
    <>
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {leaveTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
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
            <tr className="bg-gray-100">
              {[
                "Employee",
                "Leave Type",
                "From",
                "To",
                "Days",
                "Reason",
                "Status",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="border border-gray-200 py-2 px-4 text-left font-semibold text-gray-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            ) : (
              leaveRequests.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{leave.employee}</td>
                  <td className="border px-4 py-2">{leave.leaveType}</td>
                  <td className="border px-4 py-2">{leave.fromDate}</td>
                  <td className="border px-4 py-2">{leave.toDate}</td>
                  <td className="border px-4 py-2">{leave.days}</td>
                  <td className="border px-4 py-2">{leave.reason}</td>
                  <td className="border px-4 py-2">{leave.status}</td>
                  <td className="border px-4 py-2 space-x-2">
                    {leave.status === "Pending" && (
                      <>
                        <button
                          className="text-green-600 hover:underline"
                          onClick={() => handleStatusChange(leave.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleStatusChange(leave.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
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
