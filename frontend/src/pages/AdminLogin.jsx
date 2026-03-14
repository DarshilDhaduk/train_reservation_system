import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.data.role !== "ADMIN") {
        alert("Access denied. Admin only.");
        return;
      }

      login(res.data);
      navigate("/admin");

    } catch {
      alert("Admin login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img 
          src="/train.png"
          alt="admin login"
          className="w-[80%]"
        />
      </div>

      {/* RIGHT SIDE CARD */}
      <div className="flex w-full md:w-1/2 items-center justify-center">

        <div className="w-full max-w-md p-10 rounded-3xl shadow-2xl 
                        bg-[#ffffff] relative overflow-hidden">

          {/* Grain Effect */}
          <div className="absolute inset-0 opacity-10 
                          bg-[url('https://grainy-gradients.vercel.app/noise.svg')] 
                          pointer-events-none"></div>

          <div className="relative z-10">

            <h2 className="text-3xl font-bold text-center text-black mb-8">
              Admin Login
            </h2>

            <div className="space-y-6">

              <input 
                type="email"
                placeholder="Admin Email"
                className="w-full px-4 py-3 rounded-3xl border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-3xl border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-red-600 hover:bg-red-700 
                           text-white py-3 rounded-3xl font-semibold 
                           transition duration-200"
              >
                Login as Admin
              </button>

              <p className="text-sm text-center mt-4">
                User?{" "}
                <Link to="/login" className="text-green-600 font-semibold">
                  Login here
                </Link>
              </p>

              <p className="text-sm text-center">
                Don’t have account?{" "}
                <Link to="/signup" className="text-blue-600 font-semibold">
                  Sign Up
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}