import React, { createContext, useState, useEffect } from "react";

const SETTINGS_KEY = "hrms_settings";
const defaultSettings = {
  leavePolicy: { Annual: 15, Sick: 7, Casual: 8 },
  payrollCycle: "Monthly",
  company: {
    name: "FixlStudios",
    logoUrl: "",
    address: "",
  },
};

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() =>
    JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings
  );

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateLeavePolicy = (policy) =>
    setSettings((prev) => ({ ...prev, leavePolicy: policy }));

  const updatePayrollCycle = (cycle) =>
    setSettings((prev) => ({ ...prev, payrollCycle: cycle }));

  const updateCompany = (company) =>
    setSettings((prev) => ({ ...prev, company }));

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateLeavePolicy,
        updatePayrollCycle,
        updateCompany,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContext;
