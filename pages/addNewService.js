import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Sidebar from './components/sidebar';

const AddNewService = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [price, setPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      name: serviceName,
      description: description,
      type: type,
      isAvailable: isAvailable,
      price: price
    };

    try {
      await axios.post('http://localhost:3000/service/insert', newService);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        window.location.href = '/Services';
      }, 1000); // Change to 1000 milliseconds (1 second)
    } catch (error) {
      console.error('Error adding new service:', error);
    }
  };

  return (
    <>
    <Sidebar/>
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center">
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
      )}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <h1 className="text-3xl text-blue-100 bg-slate-500 rounded-xl p-2 font-bold text-center mb-8">Add a New Service</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="serviceName" className="text-gray-700 font-semibold mb-2 block">Service Name</label>
            <input type="text" placeholder='Name the service' id="serviceName" className="form-input w-full rounded-md py-2 px-3 border border-gray-300" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required />
          </div>

          <div>
            <label htmlFor="description" className="text-gray-700 font-semibold mb-2 block">Description</label>
            <textarea placeholder='Give a short description' id="description" className="form-textarea w-full rounded-md py-2 px-3 border border-gray-300" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div>
            <label htmlFor="type" className="text-gray-700 font-semibold mb-2 block">Type</label>
            <input placeholder='Describe the service type' type="text" id="type" className="form-input w-full rounded-md py-2 px-3 border border-gray-300" value={type} onChange={(e) => setType(e.target.value)} required />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="isAvailable" className="form-checkbox text-indigo-600 h-5 w-5" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
            <label htmlFor="isAvailable" className="text-gray-700 ml-2">Available</label>
          </div>

          <div>
            <label htmlFor="price" className="text-gray-700 font-semibold mb-2 block">Price</label>
            <input type="number" va placeholder="Enter the price" id="price" className="form-input w-full rounded-md py-2 px-3 border border-gray-300" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
          </div>

          <div className="flex justify-between items-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-md">Submit</button>
            <Link href="http://localhost:3001/dashboard/profile">
              <button className="text-blue-600 font-semibold py-3 px-8 rounded-md border border-blue-600 hover:bg-slate-200">Back</button>
            </Link>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500 mx-auto animate-tick"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18.95 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 01-1.392.019l-4-4a1 1 0 011.391-1.44l3.308 3.308 8.299-8.299a1 1 0 011.414 0l1.999 1.999zM9 18a9 9 0 100-18 9 9 0 000 18z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-center mt-4">New Service Added</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AddNewService;
