import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/sidebar";
import { useParams } from 'react-router-dom';

export default function SendEmail() {
  const { email } = useParams(); // Get the email from the route params
  const [emailData, setEmailData] = useState({
    to: email || "",
    subject: "",
    text: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/user/sendemail", {
        email: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
      });
      setStatusMessage("Email Sent Successfully!");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 0);
      }, 1000);
    } catch (error) {
      console.error("Error sending email:", error);
      setStatusMessage("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-48 container mx-auto relative">
        <div className="flex justify-center mt-8 mb-4">
          <h1 className="text-white px-48 py-2 border-blue-500 rounded-xl border font-bold bg-slate-500">
            Send Email
          </h1>
        </div>
        <div className="flex justify-center mt-8 mb-4">
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="to">
                To
              </label>
              <input
                type="email"
                name="to"
                id="to"
                value={emailData.to}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={emailData.subject}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
                Text
              </label>
              <textarea
                name="text"
                id="text"
                value={emailData.text}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="5"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.246 0-4.26-.934-5.726-2.43l1.726-2.43 1.414 1.414-1.726 2.43A5.978 5.978 0 004 18h4c1.366 0 2.621-.464 3.617-1.243l1.414 1.414C10.259 19.565 7.328 21 4 21v-4h2zm14-3.764A7.963 7.963 0 0120 12h4c0 4.418-3.582 8-8 8v-4c2.332 0 5.263-1.435 6.617-3.764l-1.414-1.414C21.621 15.536 20.366 16 19 16h-4c-.99 0-1.897-.366-2.617-.971l-1.414 1.414C12.739 18.066 14.754 19 17 19v-4h-2z"></path>
                  </svg>
                )}
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
