import { useState, useContext, useMemo } from "react";
import EmployeeContext from "../../context/EmployeeContext";
import AttendanceContext, { AttendanceProvider } from "../../context/AttendanceContext";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import DatePicker from "../../components/attendance/DatePicker";
import SummaryCounters from "../../components/attendance/SummaryCounters";
import ExportCSVButton from "../../components/attendance/ExportCSVButton";

function AttendanceInner() {
  const { employees } = useContext(EmployeeContext);
  const { attendance, markAttendance } = useContext(AttendanceContext);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [filterDept, setFilterDept] = useState("All");

  const filteredEmployees = useMemo(() => {
    return filterDept === "All"
      ? employees
      : employees.filter((emp) => emp.department === filterDept);
  }, [employees, filterDept]);

  const attendanceForDate = attendance[selectedDate] || {};

  const onMarkAttendance = (employeeId, status) => {
    markAttendance({ date: selectedDate, employeeId, status });
  };
  

  const departments = ["All", ...new Set(employees.map((e) => e.department))];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Attendance Management</h1>

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <ExportCSVButton
          employees={filteredEmployees}
          attendanceForDate={attendanceForDate}
          selectedDate={selectedDate}
        />
      </div>

      <SummaryCounters employees={filteredEmployees} attendanceForDate={attendanceForDate} />

      <AttendanceTable
        employees={filteredEmployees}
        attendanceForDate={attendanceForDate}
        markAttendance={onMarkAttendance}
      />
    </div>
  );
}

export default function Attendance() {
  return (
    <AttendanceProvider>
      <AttendanceInner />
    </AttendanceProvider>
  );
}
