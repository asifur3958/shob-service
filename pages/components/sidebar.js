// components/sidebar.js
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-48 bg-gray-800 text-white px-2 py-6">
      <div className="text-white text-xl font-bold mb-8 hover:font-bold hover:text-blue-100">Dashboard</div>
      <ul className="text-white">
        <li className="mb-4">
          <Link href="http://localhost:3001/">
            <span className="block hover:text-gray-200 hover:font-bold hover:text-blue-100">Home</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/profile">
            <span className="block hover:text-gray-200 hover:font-bold hover:text-blue-100">Profile</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/payment-history">
            <span className="block hover:text-gray-200 hover:font-bold hover:text-blue-100">Payment History</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/bookinglist">
            <span className="block hover:text-gray-200 hover:font-bold hover:text-blue-100">Booking List</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/Services">
            <span className="block hover:text-gray-200 hover:font-bold hover:text-blue-100">All Services</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/addNewService">
            <span className="block hover:text-gray-200 hover:font-bold hover:text-blue-100">Add a new Services</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/allUsers">
            <span className="block hover:text-gray-200 hover:font-bold hover:text-blue-100">All Users</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/sendMail">
            <span className="block hover:text-gray-200 hover:font-bold hover:text-blue-100">Send Email</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
