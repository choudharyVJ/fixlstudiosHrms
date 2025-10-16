import { useState, useEffect } from "react";

const initialFormState = {
  fullName: "",
  email: "",
  department: "",
  role: "",
  status: "Active",
  joiningDate: "",
};

export default function EmployeeFormModal({ isOpen, onClose, onSave, employee }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [employee, isOpen]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.department.trim()) tempErrors.department = "Department is required";
    if (!formData.role.trim()) tempErrors.role = "Role is required";
    if (!formData.joiningDate) tempErrors.joiningDate = "Joining Date is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">{employee ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none ${
                errors.department ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Role</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none border-gray-300"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Probation">Probation</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Joining Date</label>
            <input
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none ${
                errors.joiningDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.joiningDate && <p className="text-red-500 text-xs mt-1">{errors.joiningDate}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {employee ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
