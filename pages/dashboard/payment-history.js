import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

export default function Report() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedType, setUpdatedType] = useState("");
  const [updatedInfo, setUpdatedInfo] = useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        const result = await axios.get("http://localhost:3000/payment/viewall");
        setReports(result.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    }
    fetchReports();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleDeleteClick = (report) => {
    setSelectedReport(report);
    setShowDeleteModal(true);
  };

  const handleUpdateClick = (report) => {
    setSelectedReport(report);
    setShowUpdateModal(true);
    setUpdatedType(report.paymentType);
    setUpdatedInfo(report.paymentInfo);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/payment/delete/${selectedReport.id}`);
      setShowDeleteModal(false);

      const updatedReports = reports.filter((report) => report.id !== selectedReport.id);
      setReports(updatedReports);
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/payment/update/${selectedReport.id}`, {
        paymentType: updatedType,
        paymentInfo: updatedInfo
      });
      console.log("Payment updated:", response.data);
      setShowUpdateModal(false);
      // Refresh reports after update
      const updatedReports = reports.map((report) => {
        if (report.id === selectedReport.id) {
          return { ...report, paymentType: updatedType, paymentInfo: updatedInfo };
        }
        return report;
      });
      setReports(updatedReports);
      // Reset updatedType and updatedInfo
      setUpdatedType("");
      setUpdatedInfo("");
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const filteredData = reports.filter((item) => {
    if (searchOption === "id") {
      return item.id.toString().includes(searchTerm);
    } else if (searchOption === "type") {
      return item.paymentType.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === "details") {
      return item.paymentInfo.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-48 container mx-auto">
        <div className="flex justify-center mt-8 mb-4">
          <h1 className="text-white px-48 py-2 border-blue-500 rounded-xl border font-bold	bg-slate-500 ">All Payment Histories</h1>
        </div>
        <div className="flex justify-center mt-8 mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-blue-500 rounded-l-lg py-2 px-2 focus:outline-none focus:border-blue-700"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <select
            className="border-2 border-blue-500 rounded-r-lg py-2 px-2 focus:outline-none focus:border-blue-700"
            value={searchOption}
            onChange={handleSearchOptionChange}
          >
            <option value="id">ID</option>
            <option value="type">Type</option>
            <option value="details">Details</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-2 py-2 bg-blue-500 text-white">ID</th>
                <th className="px-2 py-2 bg-blue-500 text-white">Payment Type</th>
                <th className="px-2 py-2 bg-blue-500 text-white">Payment Info</th>
                <th className="px-2 py-2 bg-blue-500 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-2 py-2">{item.id}</td>
                    <td className="border px-2 py-2">{item.paymentType}</td>
                    <td className="border px-2 py-2">{item.paymentInfo}</td>
                    <td className="border px-2 py-2">
                      <button
                        onClick={() => handleUpdateClick(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
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

      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-12 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-12 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon */}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Payment</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to delete this payment?</p>
                      <div className="mt-4">
                        <button
                          onClick={handleConfirmDelete}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-12 rounded mr-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(false)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-12 rounded"
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

      {showUpdateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-12 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-12 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon */}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Update Payment</h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                          Payment Type
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="type"
                          type="text"
                          placeholder="Payment Type"
                          value={updatedType}
                          onChange={(e) => setUpdatedType(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="info">
                          Payment Info
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="info"
                          type="text"
                          placeholder="Payment Info"
                          value={updatedInfo}
                          onChange={(e) => setUpdatedInfo(e.target.value)}
                        />
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleSaveUpdate}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setShowUpdateModal(false)}
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
