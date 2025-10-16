export default function StatusBadge({ status }) {
    const colors = {
      Active: "bg-green-200 text-green-800",
      Inactive: "bg-gray-200 text-gray-600",
      Probation: "bg-yellow-200 text-yellow-800",
    };
  
    return (
      <span
        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${colors[status] || "bg-gray-200 text-gray-600"}`}
      >
        {status}
      </span>
    );
  }
  