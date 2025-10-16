import { useMemo } from "react";

export default function LeaveSummary({ leaveRequests }) {
  const summary = useMemo(() => {
    const counts = { Approved: 0, Pending: 0, Rejected: 0 };
    leaveRequests.forEach((lr) => {
      if (counts[lr.status] !== undefined) counts[lr.status] += 1;
    });
    return counts;
  }, [leaveRequests]);

  return (
    <div className="flex gap-6 mb-6">
      <div className="bg-white p-4 rounded shadow text-center flex-1">
        <div className="font-semibold text-green-600">Approved</div>
        <div className="text-3xl font-bold">{summary.Approved}</div>
      </div>
      <div className="bg-white p-4 rounded shadow text-center flex-1">
        <div className="font-semibold text-yellow-600">Pending</div>
        <div className="text-3xl font-bold">{summary.Pending}</div>
      </div>
      <div className="bg-white p-4 rounded shadow text-center flex-1">
        <div className="font-semibold text-red-600">Rejected</div>
        <div className="text-3xl font-bold">{summary.Rejected}</div>
      </div>
    </div>
  );
}
