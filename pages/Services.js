import axios from "axios";
import { useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Sidebar from "./components/sidebar";

export default function Services({ services }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    type: "",
    isAvailable: false,
    price: 0,
  });
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // Delete function
  function handleDelete(id) {
    axios.delete(`http://localhost:3000/service/delete/${id}`).then(() => {
      window.location.reload();
    });
  }

  // Open delete confirmation modal
  function handleOpenDeleteModal(id) {
    setSelectedServiceId(id);
    setOpenDeleteModal(true);
  }

  // Editing the service
  function handleEdit(id) {
    const selectedService = services.find((service) => service.id === id);
    setServiceData(selectedService);
    setOpenEditModal(true);
  }

  function handleServiceInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setServiceData((prevServiceData) => ({
      ...prevServiceData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(
        `http://localhost:3000/service/update/${serviceData.id}`,
        serviceData
      )
      .then(() => {
        window.location.reload();
      });
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchOptionChange(event) {
    setSearchOption(event.target.value);
  }

  // Ensure services is an array before filtering
  const filteredData = Array.isArray(services)
    ? services.filter((item) => {
        if (searchOption === "id") {
          return item.id.toString().includes(searchTerm);
        } else if (searchOption === "name") {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchOption === "type") {
          return item.type.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
      })
    : [];

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto ml-48">
          <div className="flex justify-center mt-8 mb-4">
            <h1 className="text-white px-48 py-2 border-blue-500 rounded-xl border font-bold bg-slate-500">
              All Services
            </h1>
          </div>
          <div className="flex justify-center mt-5 mb-10">
            <input
              type="text"
              placeholder="Search..."
              className="border-2 border-blue-500 rounded-l-lg py-2 px-12 focus:outline-none focus:border-blue-700"
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
              <option value="type">Type</option>
            </select>
          </div>
          <div>
            <table className="table-fixed w-full">
              <thead>
                <tr className="px-2 py-2 bg-blue-500 text-white">
                  <th className="w-1/12 p-4">ID</th>
                  <th className="w-1/6 p-4">Name</th>
                  <th className="w-1/6 p-4">Description</th>
                  <th className="w-1/6 p-4">Type</th>
                  <th className="w-1/12 p-4">Availability</th>
                  <th className="w-1/8 p-4">Price</th>
                  <th className="w-1/6 p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((service) => (
                  <tr key={service.id}>
                    <td className="border p-4">{service.id}</td>
                    <td className="border p-4">{service.name}</td>
                    <td className="border p-4">{service.description}</td>
                    <td className="border p-4">{service.type}</td>
                    <td className="border p-4">
                      {service.isAvailable ? "Available" : "Not available"}
                    </td>
                    <td className="border p-4">{service.price}</td>
                    <td className="border p-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleEdit(service.id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                        onClick={() => handleOpenDeleteModal(service.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal open={openEditModal} onClose={() => setOpenEditModal(false)} center>
            <div className="p-8 bg-gray-100 rounded-lg" style={{ width: '600px' }}>
              <h2 className="text-2xl font-bold mb-6 text-gray-700">Edit Service</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Name</label>
                  <input
                    className="border-2 border-gray-300 p-4 w-full rounded-lg"
                    type="text"
                    name="name"
                    value={serviceData.name}
                    onChange={handleServiceInputChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Description</label>
                  <textarea
                    className="border-2 border-gray-300 p-4 w-full rounded-lg"
                    name="description"
                    value={serviceData.description}
                    onChange={handleServiceInputChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Type</label>
                  <input
                    className="border-2 border-gray-300 p-4 w-full rounded-lg"
                    type="text"
                    name="type"
                    value={serviceData.type}
                    onChange={handleServiceInputChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Availability</label>
                  <div className="flex items-center">
                    <input
                      className="mr-2"
                      type="checkbox"
                      name="isAvailable"
                      checked={serviceData.isAvailable}
                      onChange={handleServiceInputChange}
                    />
                    <span>Available</span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Price</label>
                  <input
                    className="border-2 border-gray-300 p-4 w-full rounded-lg"
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={serviceData.price}
                    onChange={handleServiceInputChange}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpenEditModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} center>
            <div className="p-8 bg-gray-100 rounded-lg" style={{ width: '400px' }}>
              <h2 className="text-xl font-bold mb-4 text-gray-700">Confirm Deletion</h2>
              <p className="text-gray-700 mb-6">Are you sure you want to delete this service?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => {
                    handleDelete(selectedServiceId);
                    setOpenDeleteModal(false);
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const result = await axios.get("http://localhost:3000/service/viewall");
  const services = result.data;
  return { props: { services } };
}
