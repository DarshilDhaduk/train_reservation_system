import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

export default function UserLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      navigate("/search");
    } catch {
      alert("Login failed");
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
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE IMAGE AREA */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        {/* Replace this image with your own */}
        <img 
          src="/train.png"
          alt="login illustration"
          className="w-[80%]"
        />
      </div>

      {/* RIGHT SIDE LOGIN CARD */}
      <div className="flex w-full md:w-1/2 items-center justify-center">

        <div className="w-full max-w-md p-10 rounded-3xl shadow-2xl 
                        bg-[#ffffff] relative overflow-hidden">

          {/* Grain Texture */}
          <div className="absolute inset-0 opacity-10 
                          bg-[url('https://grainy-gradients.vercel.app/noise.svg')] 
                          pointer-events-none"></div>

          <div className="relative z-10">

            <h2 className="text-3xl font-bold text-center text-black mb-8">
              Log In
            </h2>

            <div className="space-y-6">

              <input 
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-3xl border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-[#42A047]  bg-[#ffffff]"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-3xl border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#42A047]"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-[#42A047] hover:bg-[#2E7032] 
                           text-white py-3 rounded-3xl font-semibold 
                           transition duration-200"
              >
                Log In
              </button>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="mx-3 text-gray-500 text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <div className="w-full justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log("Google Login Failed")}
                  shape="pill"
                  size="large"
                  width="100%"
                />
              </div>

              <p className="text-sm text-center mt-4">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-blue-600 font-semibold">
                  Sign Up
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