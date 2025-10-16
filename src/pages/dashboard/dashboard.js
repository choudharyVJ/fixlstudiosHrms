import { useMemo, useContext } from "react";
import KPIcard from "../../components/cards/KPIcard";
import ActivityTable from "../../components/table/ActivityTable";
import PayrollContext from "../../context/PayrollContext";

import SalaryChart from "../../components/chart/salaryChart";
import AttendanceChart from "../../components/chart/attendanceChart";

export default function Dashboard() {
  const { totalCost } = useContext(PayrollContext);

  const employees = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("hrms_employees")) || [];
    } catch {
      return [];
    }
  }, []);

  const departments = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("hrms_departments")) || [];
    } catch {
      return [];
    }
  }, []);

  const leaveRequests = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("hrms_leave_requests")) || [];
    } catch {
      return [];
    }
  }, []);

  const totalEmployees = employees.length;
  const activeDepartments = departments.filter((d) => d.employees?.length > 0).length;
  const attendanceTodayPercent = employees.length
    ? Math.round(
        employees.reduce((acc, emp) => acc + (emp.attendanceRate || 0), 0) /
          employees.length
      ) + "%"
    : "N/A";
  const pendingLeaves = leaveRequests.filter((l) => l.status === "Pending").length;

  const kpis = [
    { title: "Total Employees", value: totalEmployees },
    { title: "Active Departments", value: activeDepartments },
    { title: "Attendance Today (%)", value: attendanceTodayPercent },
    { title: "Pending Leave Requests", value: pendingLeaves },
    { title: "Payroll Processed (This Month)", value: totalCost || 0 },
  ];

  const attendanceData = useMemo(() => {
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString(undefined, { month: "short", day: "numeric" }));
    }
    const avgAttendance =
      employees.length > 0
        ? Math.round(employees.reduce((sum, e) => sum + (e.attendanceRate || 0), 0) / employees.length)
        : 90;
    const data = new Array(labels.length).fill(avgAttendance);
    return { labels, data };
  }, [employees]);

  const leaveTypeCounts = useMemo(() => {
    const counts = {};
    leaveRequests.forEach((leave) => {
      counts[leave.leaveType] = (counts[leave.leaveType] || 0) + 1;
    });
    return counts;
  }, [leaveRequests]);

  const recentActivities = useMemo(() => {
    const activities = [];
    if (employees.length > 0) {
      const lastEmployee = employees[employees.length - 1];
      activities.push({
        type: "Employee Added",
        detail: `${lastEmployee.fullName} (${lastEmployee.department || "N/A"})`,
        time: "Just now",
      });
    }
    if (leaveRequests.length > 0) {
      const recentLeave = leaveRequests[leaveRequests.length - 1];
      activities.push({
        type: "Leave Status Changed",
        detail: `${recentLeave.employee} - ${recentLeave.days} days`,
        time: "Recently",
      });
    }
    activities.push({
      type: "Payroll Processed",
      detail: "Most recent payroll batch",
      time: "Today",
    });
    return activities;
  }, [employees, leaveRequests]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => (
          <KPIcard key={idx} title={kpi.title} value={kpi.value} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departments.length > 0 && <SalaryChart departments={departments} />}
        <AttendanceChart attendanceData={attendanceData} />
        <div className="bg-white p-4 rounded shadow-md flex flex-col justify-center items-center">
          <div className="font-semibold mb-4">Leave Type Distribution</div>
          {Object.keys(leaveTypeCounts).length === 0 ? (
            <p className="text-gray-400">No leave data</p>
          ) : (
            <ul className="text-gray-700">
              {Object.entries(leaveTypeCounts).map(([type, count]) => (
                <li key={type}>
                  {type}: {count}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <div className="font-semibold mb-3">Recent Activity</div>
        <ActivityTable activities={recentActivities} />
      </div>
    </div>
  );
}
