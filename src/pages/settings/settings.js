import { useContext, useState } from "react";
import SettingsContext, { SettingsProvider } from "../../context/SettingsContext";
import { toast } from "react-hot-toast";

function SettingsInner() {
  const {
    settings,
    updateLeavePolicy,
    updatePayrollCycle,
    updateCompany,
  } = useContext(SettingsContext);

  const [leavePolicy, setLeavePolicy] = useState(settings.leavePolicy);
  const handleLeavePolicyChange = (type, value) => {
    setLeavePolicy((prev) => ({
      ...prev,
      [type]: parseInt(value) || 0,
    }));
  };

  const [payrollCycle, setPayrollCycle] = useState(settings.payrollCycle);

  const [company, setCompany] = useState(settings.company);

  const handleSave = () => {
    updateLeavePolicy(leavePolicy);
    updatePayrollCycle(payrollCycle);
    updateCompany(company);
    toast.success("Settings Saved Sucessfully!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-bold mb-4">Leave Policy</h2>
        <div className="space-y-3">
          {Object.keys(leavePolicy).map((type) => (
            <div key={type} className="flex items-center gap-4">
              <label className="w-32">{type} Leaves</label>
              <input
                type="number"
                min={0}
                value={leavePolicy[type]}
                className="border px-2 py-1 rounded w-32"
                onChange={(e) => handleLeavePolicyChange(type, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payroll Cycle */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-bold mb-4">Payroll Cycle</h2>
        <select
          value={payrollCycle}
          onChange={(e) => setPayrollCycle(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="Monthly">Monthly</option>
          <option value="Weekly">Weekly</option>
        </select>
      </div>

      {/* Company Profile */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-bold mb-4">Company Profile</h2>
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={company.name}
              onChange={(e) =>
                setCompany((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Logo URL</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={company.logoUrl}
              onChange={(e) =>
                setCompany((prev) => ({ ...prev, logoUrl: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows={3}
              value={company.address}
              onChange={(e) =>
                setCompany((prev) => ({ ...prev, address: e.target.value }))
              }
            ></textarea>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save All
        </button>
      </div>
    </div>
  );
}

export default function Settings() {
  return (
    <SettingsProvider>
      <SettingsInner />
    </SettingsProvider>
  );
}
