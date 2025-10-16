import React, { useState, useEffect } from "react";
import SalaryChart from "./salaryChart";
import AttendanceChart from "./attendanceChart";

export default function ChartPlaceholder() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadData = () => {
      try {
        const employeesData = JSON.parse(localStorage.getItem("hrms_employees")) || [];
        const departmentsData = JSON.parse(localStorage.getItem("hrms_departments")) || [];
        setEmployees(employeesData);
        setDepartments(departmentsData);
      } catch {
        setEmployees([]);
        setDepartments([]);
      }
    };

    loadData();

    const handleStorageChange = (event) => {
      if (event.key === "hrms_employees" || event.key === "hrms_departments") {
        loadData();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const attendanceData = React.useMemo(() => {
    const labels = [];
    for (let i = 4; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString(undefined, { month: "short", day: "numeric" }));
    }

    const avgAttendance = employees.length > 0
      ? Math.round(employees.reduce((acc, emp) => acc + (emp.attendanceRate || 0), 0) / employees.length)
      : 90;

    const data = new Array(labels.length).fill(avgAttendance);
    return { labels, data };
  }, [employees]);

  return (
    <div className="space-y-6">
      <SalaryChart departments={departments} />
      <AttendanceChart attendanceData={attendanceData} />
    </div>
  );
}
