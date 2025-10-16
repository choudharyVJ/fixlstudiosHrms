import { useState, useEffect } from "react";

const initialFormState = {
  name: "",
  manager: "",
  employees: [],
  attendanceRate: 0,
  averageSalary: 0,
};

export default function DepartmentFormModal({ isOpen, onClose, onSave, department }) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (department) {
      setFormData(department);
    } else {
      setFormData(initialFormState);
    }
  }, [department, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {department ? "Edit Department" : "Add Department"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block font-medium mb-1">Department Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            required
          />
          <label className="block font-medium mb-1">Manager</label>
          <input
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            required
          />
          <label className="block font-medium mb-1">Attendance Rate (%)</label>
          <input
            name="attendanceRate"
            type="number"
            value={formData.attendanceRate}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            min="0"
            max="100"
            required
          />
          <label className="block font-medium mb-1">Average Salary</label>
          <input
            name="averageSalary"
            type="number"
            value={formData.averageSalary}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            min="0"
            required
          />
          {/* Employees field can be expanded for employee selection if desired */}
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {department ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
