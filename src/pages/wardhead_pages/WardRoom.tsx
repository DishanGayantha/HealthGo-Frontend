import IWard from "@/types/ward";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { FaBell, FaSearch } from "react-icons/fa";
import WHSidebar from "./WHSidebar";

const WardRoom = () => {
  const [wards, setWards] = useState<IWard[]>([]);

  useEffect(() => {
    try {
      const fetchWards = async () => {
        const hospitalId = "67102b30c5c477743962a815";

        const response = await axios.get(
          `http://localhost:8080/api/wards/hospital/${hospitalId}`
        );
        console.log(response);
        setWards(response.data);
      };

      fetchWards();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/wards/${id}`
      );

      if (response) {
        enqueueSnackbar("ward deleted successfully", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-layout">
    {/* Sidebar */}
    <WHSidebar/>

    {/* Main content on the screen */}
    <main className="main-content">

    {/* First Part */}  
    <header className="header">
        {/* Header Left Side */}
        <div className="header-left">
          <div className="user-info">
            <h2 className="text-3xl font-semibold">Available Clinics</h2>
          </div>
        </div>

        {/* Header Left Side */}
        <div className="header-right flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
          />
          <div className="absolute mt-0.7 ml-4 text-gray-500">
            <FaSearch size="15px" />
          </div>

          <button className="notification-icon mr-4">
            <FaBell size={18} />
          </button>
          <img  className="profile-image" alt="Doctor" />
        </div>
      </header>

      <div className="dashboard-container">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Wards</h2>

          <div className="flex justify-end mb-4">
            <Link to={`/wards/create`}>
              <button className="bg-green-700 text-white px-10 p-3 rounded-lg hover:bg-green-800 transition duration-200 shadow-lg transform hover:scale-105">
                + Add Ward
              </button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            {wards.map((ward, index) => {
              const images = [
                'https://i.pinimg.com/564x/bf/00/fd/bf00fd2de582fa7434cd2f67f9323f99.jpg',
                'https://i.pinimg.com/564x/87/a7/f2/87a7f265acade4d0cc9fdb3e46de7fe1.jpg',
                'https://i.pinimg.com/564x/4c/a1/63/4ca1638b1dd382cf422958bb9850b7de.jpg',
                'https://i.pinimg.com/564x/da/1b/ff/da1bff441a944e5f0ad39f455952d2f9.jpg',
                'https://i.pinimg.com/564x/7a/4d/d4/7a4dd43514515a68da48bbb845daacaa.jpg',
              ];
              
              const randomImage = images[Math.floor(Math.random() * images.length)];

              return (
                <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex">
                  <div className="flex-shrink-0 mr-4">
                    <img src={randomImage} alt={`Ward ${ward.wardNo}`} className="w-32 h-32 rounded-lg" />
                  </div>
                  <div className="flex-grow">
                    <Link to={`/wards/room/${ward.wardId}`}>
                      <div className="bg-white p-4 rounded-lg mb-4 shadow-lg transition duration-150 hover:shadow-xl">
                        <span className="font-bold text-xl text-gray-900">Ward No:</span> {ward.wardNo}
                      </div>
                    </Link>
                    <div className="text-center">
                      <button
                        className="bg-red-700 text-white px-8 p-2 rounded-lg hover:bg-red-800 transition duration-200 shadow-md transform hover:scale-105"
                        onClick={() => handleDelete(ward.wardId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  </div>
  );
};

export default WardRoom;
