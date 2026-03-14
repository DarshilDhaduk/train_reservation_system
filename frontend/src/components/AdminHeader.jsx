import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminHeader() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Admin Logo */}
        <h1
          onClick={() => navigate("/admin")}
          className="text-2xl font-bold text-orange-400 cursor-pointer"
        >
          DDNtkt Admin
        </h1>

        {/* Admin Navigation */}
        <div className="flex gap-6 items-center">
          <span onClick={() => navigate("/admin")} className="cursor-pointer hover:text-orange-400">
            Dashboard
          </span>
          <span onClick={() => navigate("/admin/add-train")} className="cursor-pointer hover:text-orange-400">
            Add Train
          </span>

          <button
            onClick={() => {
              logout();
              navigate("/admin-login");
            }}
            className="bg-orange-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}