import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {isAdmin ? <AdminHeader /> : <UserHeader />}

      <div className="flex-1 container mx-auto px-6 py-8">
        {children}
      </div>

      <Footer />
    </div>
  );
}