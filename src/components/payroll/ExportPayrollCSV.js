import { CSVLink } from "react-csv";
import { toast } from "react-hot-toast";

export default function ExportPayrollCSV({ records, filter }) {
  const headers = [
    { label: "Employee", key: "employee" },
    { label: "Department", key: "department" },
    { label: "Month", key: "month" },
    { label: "Basic", key: "basic" },
    { label: "Allowances", key: "allowances" },
    { label: "Deductions", key: "deductions" },
    { label: "Net Salary", key: "netSalary" },
    { label: "Status", key: "status" },
  ];

  const data = records.map((rec) => ({
    ...rec,
    netSalary: rec.basic + rec.allowances - rec.deductions,
  }));

  const handleDownloadClick = () => {
    toast.success("CSV download started!");
  };

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={`payroll-${filter.month}-${filter.department}.csv`}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={handleDownloadClick}
    >
      Export CSV
    </CSVLink>
  );
}
