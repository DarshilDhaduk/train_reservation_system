import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UserHeader() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/search")}
          className="text-2xl font-bold text-green-600 cursor-pointer"
        >
          DDN<span className="text-black">tkt</span>
        </h1>

        {/* Navigation */}
        <div className="flex gap-6 items-center text-gray-700">
          <span onClick={() => navigate("/search")} className="cursor-pointer hover:text-green-600">
            SearchTrain
          </span>
          <span onClick={() => navigate("/pnr")} className="cursor-pointer hover:text-green-600">
            PNR Status
          </span>
          <span onClick={() => navigate("/my-tickets")} className="cursor-pointer hover:text-green-600">
            My Tickets
          </span>
          <span onClick={() => navigate("/cancel-ticket")} className="cursor-pointer hover:text-green-600">
            Cancel Ticket
          </span>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}