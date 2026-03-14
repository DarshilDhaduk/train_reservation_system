import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    API.get("/bookings/my")
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">

        <h2 className="text-2xl font-bold text-green-600 mb-6">
          My Tickets
        </h2>

        {tickets.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          tickets.map(ticket => (
            <div
                key={ticket.pnr}
                className="bg-white rounded-xl shadow-md p-6 mb-6 border hover:shadow-lg transition"
                >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-green-600">
                    PNR: {ticket.pnr}
                    </h3>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Confirmed
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <p><strong>Train:</strong> {ticket.trainNumber} - {ticket.trainName}</p>
                    <p><strong>Passenger:</strong> {ticket.passengerName}</p>
                    <p><strong>Seat:</strong> {ticket.seatNumber}</p>
                    <p><strong>Coach:</strong> {ticket.coachType}</p>
                    <p><strong>Date:</strong> {ticket.journeyDate}</p>
                </div>
                </div>
          ))
        )}

      </div>
    </Layout>
  );
}