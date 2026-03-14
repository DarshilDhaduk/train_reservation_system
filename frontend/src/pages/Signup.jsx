import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    try {
      const res = await API.post("/auth/google", {
        email: decoded.email,
        name: decoded.name,
      });

      login(res.data);
      navigate("/search");

    } catch {
      alert("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE IMAGE AREA */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        {/* Replace with your own image */}
        <img
          src="/train.png"
          alt="signup illustration"
          className="w-[80%]"
        />
      </div>

      {/* RIGHT SIDE SIGNUP CARD */}
      <div className="flex w-full md:w-1/2 items-center justify-center">

        <div className="w-full max-w-md  p-10 rounded-bl-3xl rounded-tr-3xl shadow-2xl 
                        bg-[#ffffff] relative overflow-hidden">

          {/* Grain Texture */}
          <div className="absolute inset-0 opacity-10 
                          bg-[url('https://grainy-gradients.vercel.app/noise.svg')] 
                          pointer-events-none"></div>

          <div className="relative z-10">

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Create Account
            </h2>

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-3xl  border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#42A047]"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full  px-4 py-3 rounded-3xl border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#42A047]"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-3xl border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#42A047]"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <button
                onClick={handleSignup}
                className="w-full bg-[#42A047] hover:bg-[#2E7032] 
                           text-white py-3 rounded-3xl font-semibold 
                           transition duration-300"
              >
                Sign Up
              </button>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="mx-3 text-gray-500 text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <div className="w-full rounded-3xl ">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log("Google Signup Failed")}
                  shape="pill"
                  size="large"
                  width="100%"
                />
              </div>

              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-semibold">
                  Log In
                </Link>
              </p>

              <p className="text-sm text-center">
                Admin?{" "}
                <Link to="/admin-login" className="text-red-600 font-semibold">
                  Login here
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}