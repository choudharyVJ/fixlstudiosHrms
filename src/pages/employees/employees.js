import { useState, useContext } from "react";
import EmployeeContext, { EmployeeProvider } from "../../context/EmployeeContext";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeFormModal from "../../components/employees/EmployeeFormModal";
import { toast } from "react-hot-toast";

function EmployeesInner() {
  const { employees, dispatch } = useContext(EmployeeContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const openAddModal = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = (employeeData) => {
    if (editingEmployee) {
      dispatch({ type: "UPDATE_EMPLOYEE", payload: employeeData });
      toast.success(`Employee "${employeeData.fullName}" updated successfully!`);
    } else {
      dispatch({
        type: "ADD_EMPLOYEE",
        payload: { ...employeeData, id: Date.now() },
      });
      toast.success(`Employee "${employeeData.fullName}" added successfully!`);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employee Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>
      <EmployeeTable onEdit={openEditModal} />
      <EmployeeFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        employee={editingEmployee}
      />
    </div>
  );
}

export default function Employees() {
  return (
    <EmployeeProvider>
      <EmployeesInner />
    </EmployeeProvider>
  );
}
