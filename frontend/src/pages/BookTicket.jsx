import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function BookTicket() {
  const { trainNumber } = useParams();
  const [data, setData] = useState({
    from: "", to: "", date: "", classType: "SL", passengers: 1
  });
  const [result, setResult] = useState(null);

  const book = async () => {
    const res = await API.post("/bookings", {
      trainNumber,
      ...data
    });
    setResult(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl">Book Ticket</h2>
      <input className="border p-2 block mb-2" placeholder="From" onChange={e=>setData({...data, from:e.target.value})}/>
      <input className="border p-2 block mb-2" placeholder="To" onChange={e=>setData({...data, to:e.target.value})}/>
      <input className="border p-2 block mb-2" type="date" onChange={e=>setData({...data, date:e.target.value})}/>
      <input className="border p-2 block mb-2" placeholder="Passengers" onChange={e=>setData({...data, passengers:e.target.value})}/>
      <button className="bg-blue-600 text-white p-2" onClick={book}>Book</button>

      {result && (
        <div className="mt-4">
          <p>PNR: {result.pnr}</p>
          <p>Fare: {result.fare}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}
