import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignOut = () => {
    setShowModal(true); // Show the modal before sign-out
  };

  const confirmSignOut = () => {
    sessionStorage.removeItem("user");
    window.location.href = "/Signin";
  };

  return (
    <>
      <Sidebar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4">Profile</h2>
            {user ? (
              <>
                <p className="text-gray-600">
                  <span className="font-medium">Name:</span> {user.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {user.phone}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Date of Birth:</span>{" "}
                  {user.DOB}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Username:</span>{" "}
                  {user.username}
                </p>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
            {/* Sign-out button */}
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            {/* Modal */}
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
                          {/* Icon */}
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Sign Out</h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Are you sure you want to sign out?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        onClick={confirmSignOut}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Sign Out
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
