import React, { createContext, useReducer, useEffect, useContext, useState, useMemo } from "react";
import EmployeeContext from "./EmployeeContext";

const LeaveContext = createContext();
const STORAGE_KEY = "hrms_leave_requests";

function deriveInitialLeaves(employees) {
  return employees.map((emp, index) => ({
    id: index + 1,
    employee: emp.fullName,
    leaveType: emp.leaveType || "Annual",
    fromDate: emp.leaveFrom || "2025-10-10",
    toDate: emp.leaveTo || "2025-10-12",
    days: emp.leaveCount || 3,
    reason: emp.leaveReason || "Personal Work",
    status: emp.leaveStatus || "Pending",
  }));
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_LEAVE":
      return [...state, action.payload];
    case "UPDATE_LEAVE":
      return state.map((req) =>
        req.id === action.payload.id ? action.payload : req
      );
    case "DELETE_LEAVE":
      return state.filter((req) => req.id !== action.payload);
    default:
      return state;
  }
}

export function LeaveProvider({ children }) {
  const { employees } = useContext(EmployeeContext);

  const storedLeaves = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const initialState = storedLeaves && storedLeaves.length > 0 ? storedLeaves : deriveInitialLeaves(employees);

  const [leaveRequests, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  return (
    <LeaveContext.Provider value={{ leaveRequests, dispatch }}>
      {children}
    </LeaveContext.Provider>
  );
}

export default LeaveContext;
