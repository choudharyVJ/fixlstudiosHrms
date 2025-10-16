import { CSVLink } from "react-csv";
import { toast } from "react-hot-toast";

export default function ExportCSVButton({ employees, attendanceForDate, selectedDate }) {
  const headers = [
    { label: "Name", key: "fullName" },
    { label: "Department", key: "department" },
    { label: "Attendance Status", key: "status" },
  ];

  const data = employees.map((emp) => ({
    fullName: emp.fullName,
    department: emp.department,
    status: attendanceForDate[emp.id] || "Not Marked",
  }));

  
  const handleDownloadClick = () => {
    toast.success("CSV download started!");
  };

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={`attendance-${selectedDate}.csv`}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={handleDownloadClick}
    >
      Export CSV
    </CSVLink>
  );
}
