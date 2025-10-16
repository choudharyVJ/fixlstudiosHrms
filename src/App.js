import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Dashboard from "./pages/dashboard/dashboard";
import Employees from "./pages/employees/employees";
import Attendance from "./pages/attendance/attendance";
import Leave from "./pages/leave/leave";
import Payroll from "./pages/payroll/payroll";
import Departments from "./pages/departments/departments";
import Settings from "./pages/settings/settings";
import Login from "./pages/login/login";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";


const Layout = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  </div>
);

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route
              path="/attendance"
              element={
                  <Attendance />
              }
            />
            <Route
              path="/leave"
              element={
                  <Leave />
              }
            />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Add fallback 404 route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
  );
}


export default App;
