import React, { createContext, useReducer, useEffect, useMemo, useContext } from "react";
import EmployeeContext from "./EmployeeContext";

const PayrollContext = createContext();
const STORAGE_KEY = "hrms_payroll";

// Helper to create default payroll entries from employees when localStorage is empty
function deriveInitialPayroll(employees) {
  return employees.map((emp, index) => ({
    id: index + 1,
    employee: emp.fullName,
    department: emp.department,
    month: "2025-09",
    basic: emp.basic,
    allowances: emp.allowances,
    deductions: emp.deductions,
    status: emp.payrollStatus || "Pending",
  }));
}

function reducer(state, action) {
  switch (action.type) {
    case "MARK_PROCESSED":
      return state.map((rec) =>
        rec.id === action.payload ? { ...rec, status: "Processed" } : rec
      );
    case "ADD_PAYROLL":
      return [...state, action.payload];
    case "UPDATE_PAYROLL":
      return state.map((rec) =>
        rec.id === action.payload.id ? action.payload : rec
      );
    case "DELETE_PAYROLL":
      return state.filter((rec) => rec.id !== action.payload);
    default:
      return state;
  }
}

export function PayrollProvider({ children }) {
  const { employees } = useContext(EmployeeContext);
  const storedPayroll = JSON.parse(localStorage.getItem(STORAGE_KEY));

  // If payroll not stored yet, derive it from employees
  const initialState = storedPayroll || deriveInitialPayroll(employees);

  const [payroll, dispatch] = useReducer(reducer, initialState);

  const records = useMemo(() => payroll, [payroll]);
  const totalCost = useMemo(
    () => records.reduce((sum, rec) => sum + rec.basic + rec.allowances - rec.deductions, 0),
    [records]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payroll));
  }, [payroll]);

  return (
    <PayrollContext.Provider value={{ payroll: records, dispatch, totalCost }}>
      {children}
    </PayrollContext.Provider>
  );
}

export default PayrollContext;
