import { useState, useContext } from "react";
import { DepartmentProvider } from "../../context/DepartmentContext";
import DepartmentContext from "../../context/DepartmentContext";
import DepartmentTable from "../../components/department/DepartmentTable";
import DepartmentFormModal from "../../components/department/DepartmentFormModal";
import { toast } from "react-hot-toast";

function DepartmentsInner() {
  const { departments, addDepartment, updateDepartment, deleteDepartment } = useContext(DepartmentContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);


  const openAddModal = () => {
    setEditingDepartment(null);
    setModalOpen(true);
  };
  const openEditModal = (dep) => {
    setEditingDepartment(dep);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleSave = (department) => {
    if (editingDepartment) {
      updateDepartment(department);
      toast.success(`Department "${department.name}" updated successfully!`);
    } else {
      addDepartment({ ...department, id: Date.now(), employees: [] });
      toast.success(`Department "${department.name}" added successfully!`);
    }
    setModalOpen(false);
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Department Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Department
        </button>
      </div>
      <DepartmentTable onEdit={openEditModal} />
      <DepartmentFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        department={editingDepartment}
      />
    </div>
  );
}

export default function Departments() {
  return (
    <DepartmentProvider>
      <DepartmentsInner />
    </DepartmentProvider>
  );
}
