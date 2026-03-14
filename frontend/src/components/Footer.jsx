export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-green-600">
            DDN<span className="text-black">tkt</span>
          </h2>
          <p className="text-gray-600 mt-3 text-sm">
            Book train tickets easily with real-time seat availability,
            PNR status and secure online booking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-green-600 cursor-pointer">Search Trains</li>
            <li className="hover:text-green-600 cursor-pointer">PNR Status</li>
            <li className="hover:text-green-600 cursor-pointer">My Tickets</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">
            Services
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Online Booking</li>
            <li>Seat Selection</li>
            <li>Instant PDF Ticket</li>
            <li>Admin Dashboard</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">
            Contact Us
          </h3>
          <p className="text-gray-600 text-sm">
            📍 Rajkot, Gujarat
          </p>
          <p className="text-gray-600 text-sm">
            📧 support@ddntkt.com
          </p>
          <p className="text-gray-600 text-sm">
            📞 +91 98765 43210
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 text-center py-4 text-gray-600 text-sm">
        © 2026 DDNtkt | All Rights Reserved
      </div>
    </footer>
  );
}