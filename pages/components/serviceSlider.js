import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";

const ServiceSlider = () => {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedService(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const handleServiceClick = (service) => {
    router.push(`/service/${encodeURIComponent(service.name)}`);
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handlePrevClick = () => {
    setCurrentServiceIndex((currentServiceIndex - 1 + services.length) % services.length);
  };

  const handleNextClick = () => {
    setCurrentServiceIndex((currentServiceIndex + 1) % services.length);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/service/viewal")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setServices([]); // Fallback to empty array in case of error
        }
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        setServices([]); // Fallback to empty array in case of error
      });
  }, []);

  return (
    <div className="relative w-full md:w-[1200px] mx-auto">
      <div className="flex justify-between items-center px-5 md:px-10 mb-5">
        <h1 className="text-2xl font-bold absolute left-[-1px]"></h1><br/>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevClick}
            className={`${
              currentServiceIndex === 0
                ? "hidden"
                : "opacity-100 cursor-pointer"
            } bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none absolute top-[125px] left-[-50px] hover:bg-gray-300 transition duration-300`}
            disabled={currentServiceIndex === 0}
          >
            <svg width="800px" height="800px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.99951 16C1.99951 8.26801 8.26753 2 15.9995 2C23.7315 2 29.9995 8.26801 29.9995 16C29.9995 23.732 23.7315 30 15.9995 30C8.26753 30 1.99951 23.732 1.99951 16ZM16.7066 11.7071C17.0971 11.3166 17.0971 10.6834 16.7066 10.2929C16.3161 9.90237 15.6829 9.90237 15.2924 10.2929L10.2924 15.2929C9.90188 15.6834 9.90188 16.3166 10.2924 16.7071L15.2924 21.7071C15.6829 22.0976 16.3161 22.0976 16.7066 21.7071C17.0971 21.3166 17.0971 20.6834 16.7066 20.2929L13.4137 17H20.9995C21.5518 17 21.9995 16.5523 21.9995 16C21.9995 15.4477 21.5518 15 20.9995 15H13.4137L16.7066 11.7071Z" fill="#3A52EE"/>
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            className={`${
              currentServiceIndex === services.length - 4
                ? "hidden"
                : "opacity-100 cursor-pointer"
            } bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none absolute top-[125px] right-[-10px] hover:bg-gray-300 transition duration-300`}
            disabled={currentServiceIndex === services.length - 4}
          >
            <svg width="800px" height="800px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M2 16C2 8.26801 8.26801 2 16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16ZM15.2929 11.7071C14.9024 11.3166 14.9024 10.6834 15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929L21.7071 15.2929C22.0976 15.6834 22.0976 16.3166 21.7071 16.7071L16.7071 21.7071C16.3166 22.0976 15.6834 22.0976 15.2929 21.7071C14.9024 21.3166 14.9024 20.6834 15.2929 20.2929L18.5858 17H11C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15H18.5858L15.2929 11.7071Z" fill="#3A52EE"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto pb-5 justify-center">
        {Array.isArray(services) && services.length > 0 ? (
          services.slice(currentServiceIndex, currentServiceIndex + 4).map((service) => (
            <Link href={`/service/${encodeURIComponent(service.name)}`} key={service.id}>
              <div
                key={service.id}
                className="w-[280px] md:w-[250px] mr-10 cursor-pointer"
                onClick={() => handleServiceClick(service)}
              >
                <div className="relative h-64">
                  <img
                    src={`./${service.id}.jpg`}
                    alt={service.title}
                    className="absolute w-full h-full object-cover rounded-t-lg transition duration-300 transform hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white py-4 px-6 rounded-b-lg">
                    <h2 className="text-lg font-bold mb-2">{service.name}</h2>
                    <p className="text-gray-700 text-sm leading-tight">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p></p> // Fallback message when services array is empty or not an array
        )}
      </div>
    </div>
  );
};

export default ServiceSlider;
