import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  CalendarIcon,
  SunIcon,
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <HomeIcon className="h-5 w-5" /> },
  { name: "Employees", path: "/employees", icon: <UserIcon className="h-5 w-5" /> },
  { name: "Attendance", path: "/attendance", icon: <CalendarIcon className="h-5 w-5" /> },
  { name: "Leave", path: "/leave", icon: <SunIcon className="h-5 w-5" /> },
  { name: "Payroll", path: "/payroll", icon: <CurrencyDollarIcon className="h-5 w-5" /> },
  { name: "Departments", path: "/departments", icon: <BuildingLibraryIcon className="h-5 w-5" /> },
  { name: "Settings", path: "/settings", icon: <Cog6ToothIcon className="h-5 w-5" /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0B2545] shadow-lg flex flex-col text-white">
      <div className="flex items-center p-4 font-bold text-xl border-b border-blue-700">
        FixlStudios HRMS
      </div>
      <nav className="flex-1 flex flex-col px-2 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded cursor-pointer transition-colors ${
                isActive
                  ? "bg-blue-700 text-white font-semibold"
                  : "text-blue-200 hover:bg-blue-600 hover:text-white"
              }`
            }
          >
            {link.icon}
            <span className="ml-3">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
