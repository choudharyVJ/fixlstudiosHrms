import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-6 py-3 border-b border-gray-200">
      <div className="max-w-md w-full">
        <input
          className="w-full bg-gray-100 rounded px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="search"
          placeholder="Search HRMS..."
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold text-blue-600 whitespace-nowrap">HR Manager</span>
        <button
          onClick={handleLogout}
          className="text-sm bg-blue-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
