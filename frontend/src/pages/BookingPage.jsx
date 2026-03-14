import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";import Layout from "../components/Layout";
import API from "../services/api";
import jsPDF from "jspdf";

export default function BookingPage() {
  const location = useLocation();
  const { train, coach, from, to, date } = location.state || {};

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("M");
  const [quota, setQuota] = useState("GENERAL");
  const [bookedSeats, setBookedSeats] = useState([]);

  

const fetchBookedSeats = useCallback(async () => {

  try {

    const res = await API.get("/bookings/seats", {
      params: {
        trainId: train._id,
        coachType: coach.classType,
        date
      }
    });

    setBookedSeats(res.data);

  } catch (err) {
    console.log(err);
  }

}, [train?._id, coach?.classType, date]);

useEffect(() => {

  if (!train || !coach) return;

  fetchBookedSeats();

}, [fetchBookedSeats, train, coach]);

  if (!train || !coach) {
    return <Layout><p>No booking data</p></Layout>;
  }

  const totalSeats = coach.totalSeats;

  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const handleConfirm = async () => {
    if (!selectedSeat || !name || !age || !mobile || !email) {
      alert("Fill all details");
      return;
    }

    try {
      const res = await API.post("/bookings", {
        trainId: train._id,
        coachType: coach.classType,
        seatNumber: selectedSeat,
        passengerName: name,
        age: age,
        mobile: mobile,
        email: email,
        gender: gender,
        quota: quota,
        date: date,
        from: from,
        to: to
      });

      await fetchBookedSeats();
      generateTicketPDF(res.data);

    } catch (error) {

      console.log(error);

      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Booking failed");
      }

    }
  };



const generateTicketPDF = async (ticket) => {
 // console.log(ticket);
  const doc = new jsPDF();
  doc.rect(10,7,190,148);
  // IRCTC LOGO
  doc.addImage("/logo.png", "PNG", 170, 8, 25, 17);

  doc.setFontSize(16);
  doc.text("Electronic Reservation Slip (ERS)", 60, 15);

  doc.setFontSize(10);
  doc.text("Normal User", 130, 19);

  //doc.line(10,30,200,30);

  // Boarding section
  doc.rect(10,27,190,23);
  doc.setFontSize(11);

  doc.text("Booked from",12,34);
  doc.text(ticket.boardingStation,12,42);
  

  doc.text("Boarding At",95,34);
  doc.text(ticket.boardingStation,95,42);

  doc.text("To",160,34);
  doc.text(ticket.destinationStation,160,42);

  //doc.line(10,60,200,60);

  // Train Details
  doc.setFontSize(12);
  doc.text("Train Details",12,60);
  doc.rect(10,63,190,53);
  doc.text("PNR",12,70);
  doc.text(ticket.pnr,12,78);

  doc.text("Train No./Name",95,70);
  doc.text(`${ticket.trainNumber}/${ticket.trainName}`,95,78);

  doc.text("Class",160,70);
  doc.text(ticket.className,160,78);

  doc.text("Quota",12,90);
  doc.text(`Quota: ${ticket.quota}`, 12, 95);

  doc.text("Distance",95,90);
  doc.text(`${ticket.distance} KM`,95 ,98);

  doc.text("Booking Date",160,90);
  doc.text(new Date(ticket.bookingDate).toLocaleString(),160,98);

  doc.text(`Journey Date: ${new Date(ticket.date).toLocaleDateString()}`,95,110);
  doc.text("Fare : ",12,110);
  doc.text(`Rs.${ticket.fare}`, 25, 110);

  //doc.line(10,120,200,120);

  // Passenger table header
  doc.setFontSize(12);
  doc.text("Passenger Details",12,130);

  doc.rect(10,135,190,10);
  doc.text("#",12,142);
  doc.text("Name",25,142);
  doc.text("Age",95,142);
  doc.text("Gender",115,142);
  doc.text("Booking Status",160,142);

  // Passenger row
  doc.rect(10,145,190,10);

  doc.text("1",12,152);
  doc.text(ticket.passengerName,25,152);
  doc.text(ticket.age.toString(),95,152);
  doc.text(ticket.gender || "M",115,152);
  doc.text(ticket.bookingStatus,160,152);


  

  doc.save(`Ticket_${ticket.pnr}.pdf`);
};

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">

        <h2 className="text-2xl font-bold mb-4">
          {train.trainNumber} - {train.trainName}
        </h2>

        <p className="mb-4 text-gray-600">
          Class: {coach.classType}
        </p>

        <h3 className="font-semibold mb-2">Select Seat</h3>

        <div className="grid grid-cols-8 gap-2 mb-6">
          {seats.map(seat => {

            const isBooked = bookedSeats.includes(seat);
            //const isSelected = selectedSeat === seat;

            return (
              <div
                key={seat}
                onClick={() => !isBooked && setSelectedSeat(seat)}
                className={`p-2 text-center rounded cursor-pointer text-sm
                    ${isBooked
                    ? "bg-blue-500 text-white cursor-not-allowed"
                    : selectedSeat === seat
                    ? "bg-green-600 text-white"
                    : "bg-green-100 hover:bg-green-200"}`}
              >
                {seat}
              </div>
            );
          })}
        </div>

        <h3 className="font-semibold mb-2">Passenger Details</h3>

        <div className="flex gap-4 mb-4">

          <input
            placeholder="Passenger Name"
            className="border p-2 flex-1"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            className="border p-2 w-32"
            value={age}
            onChange={(e)=>setAge(e.target.value)}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            className="border p-2 w-40"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="border p-2 w-40"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>

        <div className="flex gap-4 mb-4">

          <select
            className="border p-2 w-40"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>

          <select
            className="border p-2 w-40"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
          >
            <option value="GENERAL">General</option>
            <option value="TATKAL">Tatkal</option>
            <option value="PREMIUM TATKAL">Premium Tatkal</option>
            <option value="LADIES">Ladies</option>
            <option value="SENIOR">Senior Citizen</option>
          </select>

        </div>

        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Confirm Booking
        </button>

      </div>
    </Layout>
  );
}