import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <aside className="w-64 bg-black text-white p-5">
      <nav className="space-y-4">
        {user.role === "USER" && (
          <>
            <NavLink
              to="/search"
              className="block p-2 rounded hover:bg-gray-700"
            >
              🔍 Search Trains
            </NavLink>

            <NavLink
              to="/pnr"
              className="block p-2 rounded hover:bg-gray-700"
            >
              🎫 PNR Status
            </NavLink>
          </>
        )}

        {user.role === "ADMIN" && (
            <>
                <NavLink
                to="/admin"
                className="block p-2 rounded hover:bg-gray-700"
                >
                📊 Dashboard
                </NavLink>

                <NavLink
                to="/admin/add-train"
                className="block p-2 rounded hover:bg-gray-700"
                >
                🚆 Add Train
                </NavLink>
            </>
        )}

      </nav>
    </aside>
  );
}
