import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import EmployeeContext from "./EmployeeContext";

const AttendanceContext = createContext();
const STORAGE_KEY = "hrms_attendance";

function deriveInitialAttendance(employees) {
  const attendance = {};
  const today = new Date().toISOString().slice(0, 10);
  attendance[today] = {};
  employees.forEach(emp => {
    attendance[today][emp.id] = ""; 
  });
  return attendance;
}

export function AttendanceProvider({ children }) {
  const { employees } = useContext(EmployeeContext);

  const storedAttendance = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const initialAttendance = storedAttendance && Object.keys(storedAttendance).length > 0
    ? storedAttendance
    : deriveInitialAttendance(employees);

  const [attendance, setAttendance] = useState(initialAttendance);

  const markAttendance = ({ date, employeeId, status }) => {
    setAttendance(prev => ({
      ...prev,
      [date]: {
        ...(prev[date] || {}),
        [employeeId]: status,
      },
    }));
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
  }, [attendance]);

  return (
    <AttendanceContext.Provider value={{ attendance, markAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export default AttendanceContext;
