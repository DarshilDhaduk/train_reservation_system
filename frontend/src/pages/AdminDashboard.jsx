import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/bookings/admin")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const totalBookings = data.length;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          Admin Dashboard
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Total Bookings</h3>
            <p className="text-2xl font-bold text-green-600">
              {totalBookings}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-blue-600">
              ₹{totalBookings * 500}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Active Trains</h3>
            <p className="text-2xl font-bold text-orange-500">
              5
            </p>
          </div>
        </div>

        {/* Booking Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4">PNR</th>
                <th className="p-4">Train</th>
                <th className="p-4">Passenger</th>
                <th className="p-4">Seat</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map(b => (
                <tr
                  key={b.pnr}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-semibold text-gray-700">
                    {b.pnr}
                  </td>
                  <td className="p-4">
                    {b.trainNumber} - {b.trainName}
                  </td>
                  <td className="p-4">{b.passengerName}</td>
                  <td className="p-4">{b.seatNumber}</td>
                  <td className="p-4">{b.journeyDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
}