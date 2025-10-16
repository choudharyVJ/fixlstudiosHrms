// /src/context/DepartmentContext.js
import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import EmployeeContext from "./EmployeeContext";

const DepartmentContext = createContext();
const STORAGE_KEY = "hrms_departments";

function groupEmployeesToDepartments(employees) {
  const deptMap = {};
  employees.forEach((emp) => {
    const deptName = emp.department || "Unassigned";
    if (!deptMap[deptName]) {
      deptMap[deptName] = {
        name: deptName,
        manager: emp.manager || "",
        employees: [],
        attendanceRate: emp.attendanceRate || 0,
        averageSalary: emp.averageSalary,
        totalSalary: 0,
      };
    }
    deptMap[deptName].employees.push(emp.fullName);
    const salary = (emp.basic || 0) + (emp.allowances || 0) - (emp.deductions || 0);
    deptMap[deptName].totalSalary += salary;
  });

  return Object.entries(deptMap).map(([name, dept], index) => {
    const averageSalary =
      dept.employees.length > 0 ? Math.round(dept.totalSalary / dept.employees.length) : 0;
    return {
      id: index + 1,
      name,
      manager: dept.manager,
      employees: dept.employees,
      attendanceRate: dept.attendanceRate,
      averageSalary,
    };
  });
}

export function DepartmentProvider({ children }) {
  const { employees } = useContext(EmployeeContext);

  const storedDepartments = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const derivedDepartments = useMemo(() => groupEmployeesToDepartments(employees), [employees]);

  const [departments, setDepartments] = useState(
    Array.isArray(storedDepartments) && storedDepartments.length > 0 ? storedDepartments : derivedDepartments
  );

  useEffect(() => {
    setDepartments(derivedDepartments);
  }, [derivedDepartments]);

  useEffect(() => {
    if (Array.isArray(departments)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(departments));
    }
  }, [departments]);

  const addDepartment = (newDept) => {
    setDepartments((prev) => [...prev, newDept]);
  };

  const updateDepartment = (updatedDept) => {
    setDepartments((prev) =>
      prev.map((dep) => (dep.id === updatedDept.id ? updatedDept : dep))
    );
  };

  const deleteDepartment = (id) => {
    setDepartments((prev) => prev.filter((dep) => dep.id !== id));
  };

  return (
    <DepartmentContext.Provider value={{ departments, addDepartment, updateDepartment, deleteDepartment }}>
      {children}
    </DepartmentContext.Provider>
  );
}

export default DepartmentContext;
