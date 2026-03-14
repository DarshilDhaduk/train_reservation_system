import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Signup from "./pages/Signup";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import SearchTrains from "./pages/SearchTrains";
import BookTicket from "./pages/BookTicket";
import PNRStatus from "./pages/PNRStatus";
import AdminDashboard from "./pages/AdminDashboard";
import AddTrain from "./pages/AddTrain";
import TrainList from "./pages/TrainList";
import BookingPage from "./pages/BookingPage";
import MyTickets from "./pages/MyTickets";
import CancelTicket from "./pages/CancelTicket";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<ProtectedRoute><SearchTrains /></ProtectedRoute>} />
          <Route path="/book/:trainNumber" element={<ProtectedRoute><BookTicket /></ProtectedRoute>} />
          <Route path="/pnr" element={<ProtectedRoute><PNRStatus /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute admin><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add-train" element={<ProtectedRoute admin><AddTrain /></ProtectedRoute>} />
          <Route path="/trains" element={<TrainList />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/cancel-ticket" element={<CancelTicket />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
