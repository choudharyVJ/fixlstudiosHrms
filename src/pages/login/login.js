import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { mockUser } from "../../utils/mockUser"; 


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const toastId = toast.loading("Logging in...");

    setTimeout(() => {
      if (email === mockUser.email && password === mockUser.password) {
        localStorage.setItem("hrms_user", JSON.stringify({
          ...mockUser,
          isLoggedIn: true
        }));
        toast.success("Login successful!", { id: toastId });
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password", { id: toastId });
        setError("Invalid email or password");
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          FixlStudios HRMS Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="your.email@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-5 text-xs text-gray-400 text-center">
          &copy; {new Date().getFullYear()} FixlStudios HRMS. All rights reserved.
        </div>
      </div>
    </div>
  );
}
