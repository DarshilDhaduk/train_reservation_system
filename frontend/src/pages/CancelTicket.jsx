import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function CancelTicket(){

  const [pnr,setPnr] = useState("");
  const [email,setEmail] = useState("");
  const [mobile,setMobile] = useState("");
  const [ticket,setTicket] = useState(null);

  const searchTicket = async () => {

    try{

      const res = await API.post("/bookings/cancel/search",{
        pnr,
        email,
        mobile
      });

      setTicket(res.data);

    }catch (error) {

    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Ticket not found or details mismatch");
    }

  }

  };

  const cancelTicket = async () => {

    if(!window.confirm("Cancel this ticket?")) return;

    try{

      await API.put(`/bookings/cancel/${ticket.pnr}`);

      alert("Ticket cancelled");

      setTicket({
        ...ticket,
        bookingStatus:"CANCELLED"
      });

    }catch{
      alert("Cancellation failed");
    }

  };

  return(
    <Layout>

      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">

        <h2 className="text-2xl font-bold mb-6">
          Cancel Ticket
        </h2>

        <div className="space-y-3">

          <input
          placeholder="PNR Number"
          value={pnr}
          onChange={(e)=>setPnr(e.target.value)}
          className="border p-2 w-full"/>

          <input
          placeholder="Registered Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 w-full"/>

          <input
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
          className="border p-2 w-full"/>

          <button
          onClick={searchTicket}
          className="bg-blue-600 text-white px-6 py-2 rounded">
          Search Ticket
          </button>

        </div>

        {ticket && (

          <div className="mt-6 border p-4 rounded bg-gray-50">

            <h3 className="font-bold text-lg mb-3">
              {ticket.trainNumber} - {ticket.trainName}
            </h3>

            <p>Passenger: {ticket.passengerName}</p>
            <p>From: {ticket.boardingStation}</p>
            <p>To: {ticket.destinationStation}</p>
            <p>Seat: {ticket.seatNumber}</p>
            <p>Status: {ticket.bookingStatus}</p>

            {ticket.bookingStatus !== "CANCELLED" && (

              <button
              onClick={cancelTicket}
              className="bg-red-600 text-white px-6 py-2 rounded mt-4">
              Cancel Ticket
              </button>

            )}

          </div>

        )}

      </div>

    </Layout>
  );
}