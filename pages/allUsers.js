import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/sidebar";

export default function Report() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    phone: "",
    email: "",
    DOB: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const result = await axios.get("http://localhost:3000/user/viewall");
        setUsers(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };


  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
    setUpdatedUser({
      name: user.name,
      phone: user.phone,
      email: user.email,
      DOB: user.DOB,
      username: user.username,
      password: "",
      confirmPassword: "",
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/delete/${selectedUser.id}`);
      setShowDeleteModal(false);

      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/user/update/${selectedUser.id}`, updatedUser);
      setShowUpdateModal(false);

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const filteredData = users.filter((user) => {
    if (searchOption === "id") {
      return user.id.toString().includes(searchTerm);
    } else if (searchOption === "name") {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === "phone") {
      return user.phone.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === "email") {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === "username") {
      return user.username.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-48 container mx-auto">
        <div className="flex justify-center mt-8 mb-4">
          <h1 className="text-white px-48 py-2 border-blue-500 rounded-xl border font-bold	bg-slate-500 ">
            All Users
          </h1>
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
            <option value="name">Name</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="username">Username</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-2 py-2 bg-blue-500 text-white">ID</th>
                <th className="px-2 py-2 bg-blue-500 text-white">Name</th>
                <th className="px-2 py-2 bg-blue-500 text-white">Phone</th>
                <th className="px-2 py-2 bg-blue-500 text-white">Email</th>
                <th className="px-2 py-2 bg-blue-500 text-white">DOB</th>
                <th className="px-2 py-2 bg-blue-500 text-white">Username</th>
                <th className="px-2 py-2 bg-blue-500 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user.id}>
                  <td className="border px-2 py-2">{user.id}</td>
                  <td className="border px-2 py-2">{user.name}</td>
                  <td className="border px-2 py-2">{user.phone}</td>
                  <td className="border px-2 py-2">{user.email}</td>
                  <td className="border px-2 py-2">{user.DOB}</td>
                  <td className="border px-2 py-2">{user.username}</td>
                  <td className="border px-2 py-2">
                    <button
                      onClick={() => handleUpdateClick(user)}
                      className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="bg-red-500 hover:bg-red-800 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>                    <button

                      className="bg-slate-500 hover:bg-slate-800 text-white font-bold py-1 px-2 rounded"
                    >
                      Send Mail
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
            <div className="inline-block align-bottom bg-white rounded
-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
<div className="bg-white px-12 pt-5 pb-4 sm:p-6 sm:pb-4">
  <div className="sm:flex sm:items-start">
    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
      {/* Icon */}
    </div>
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Delete User</h3>
      <div className="mt-2">
        <p className="text-sm text-gray-500">Are you sure you want to delete this user?</p>
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
<form onSubmit={handleSubmit}>
  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div className="sm:flex sm:items-start">
      <div className="w-full">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={updatedUser.name}
            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={updatedUser.phone}
            onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter phone"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={updatedUser.email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="DOB" className="block text-gray-700 text-sm font-bold mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="DOB"
            value={updatedUser.DOB}
            onChange={(e) => setUpdatedUser({ ...updatedUser, DOB: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
    </div>
  </div>
  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    <button
      type="submit"
      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-
      -2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
      >
      Update
      </button>
      <button
      onClick={() => setShowUpdateModal(false)}
      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
      Cancel
      </button>
      </div>
      </form>
      </div>
      </div>
      </div>
      )}
      </div>
      );
      }