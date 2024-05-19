import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatedTime, setUpdatedTime] = useState("");
  const [updatedService, setUpdatedService] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("http://localhost:3000/booking/viewall");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleUpdateClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/booking/update/${selectedBooking.id}`, {
        time: updatedTime,
        Service: { name: updatedService } // Assuming Service is an object with a name property
      });
      console.log("Booking updated:", response.data);
      setShowModal(false);
      // Refresh bookings after update
      const updatedBookings = bookings.map((booking) => {
        if (booking.id === selectedBooking.id) {
          return { ...booking, time: updatedTime, Service: { name: updatedService } };
        }
        return booking;
      });
      setBookings(updatedBookings);
      // Reset updatedTime and updatedService
      setUpdatedTime("");
      setUpdatedService("");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/booking/delete/${selectedBooking.id}`);
      setShowDeleteModal(false);
      // Refresh bookings after deletion
      const updatedBookings = bookings.filter((booking) => booking.id !== selectedBooking.id);
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const filteredData = bookings.filter((booking) => {
    if (searchOption === "id") {
      return booking.id.toString().includes(searchTerm);
    } else if (searchOption === "time") {
      return booking.time.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === "user") {
      return booking.UserList.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === "service") {
      return booking.Service.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto ml-48">
      <div className="flex justify-center mt-8 mb-4">
          <h1 className="text-white px-48 py-2 border-blue-500 rounded-xl border font-bold	bg-slate-500 ">All Booking Histories</h1>
        </div>
        <div className="flex justify-center mt-5 mb-10">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-blue-500 rounded-l-lg py-2 px-4 focus:outline-none focus:border-blue-700"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <select
            className="border-2 border-blue-500 rounded-r-lg py-2 px-4 focus:outline-none focus:border-blue-700"
            value={searchOption}
            onChange={handleSearchOptionChange}
          >
            <option value="id">ID</option>
            <option value="time">Time</option>
            <option value="user">User</option>
            <option value="service">Service</option>
          </select>
        </div>
        <div className="overflow-y-auto">
          <div className="flex justify-center"> 
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-blue-500 text-white">ID</th>
                  <th className="px-4 py-2 bg-blue-500 text-white">Time</th>
                  <th className="px-4 py-2 bg-blue-500 text-white">User</th>
                  <th className="px-4 py-2 bg-blue-500 text-white">Service</th>
                  <th className="px-4 py-2 bg-blue-500 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((booking) => (
                  <tr key={booking.id}>
                    <td className="border px-4 py-2">{booking.id}</td>
                    <td className="border px-4 py-2">{booking.time}</td>
                    <td className="border px-4 py-2">{booking.UserList.name}</td>
                    <td className="border px-4 py-2">{booking.Service.name}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleUpdateClick(booking)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                        onClick={() => handleDeleteClick(booking)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Update Booking</h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={updatedTime}
                        onChange={(e) => setUpdatedTime(e.target.value)}
                        className="border-2 border-gray-300 p-2 w-full rounded-lg mb-2"
                        placeholder="Enter updated time"
                      />
                      <input
                        type="text"
                        value={updatedService}
                        onChange={(e) => setUpdatedService(e.target.value)}
                        className="border-2 border-gray-300 p-2 w-full rounded-lg mb-4"
                        placeholder="Enter updated service"
                      />
                      <div>
                        <button
                          onClick={handleSaveUpdate}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={closeModal}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Booking</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to delete this booking?</p>
                      <div className="mt-4">
                        <button
                          onClick={handleConfirmDelete}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(false)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
