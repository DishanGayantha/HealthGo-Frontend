import IPatient from '@/types/patient'
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import RecepSidebar from "./RecepSidebar";
import { FaBell, FaSearch } from "react-icons/fa";


function ViewPatient() {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<IPatient>();

  useState(() => {
    try {
      const fetchPatient = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/patients/${id}`);
          if(response) {
            setPatient(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchPatient();
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <RecepSidebar />

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
          <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Patient Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-600">Name:</label>
                <div className="border rounded-md p-2 text-gray-800 bg-gray-100">
                  {patient?.name || 'N/A'}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="font-semibold text-gray-600">Email:</label>
                <div className="border rounded-md p-2 text-gray-800 bg-gray-100">
                  {patient?.email || 'N/A'}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="font-semibold text-gray-600">Age:</label>
                <div className="border rounded-md p-2 text-gray-800 bg-gray-100">
                  {patient?.age || 'N/A'}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="font-semibold text-gray-600">Gender:</label>
                <div className="border rounded-md p-2 text-gray-800 bg-gray-100">
                  {patient?.gender || 'N/A'}
                </div>
              </div>
              
              <div className="flex flex-col col-span-2">
                <label className="font-semibold text-gray-600">Address:</label>
                <div className="border rounded-md p-2 text-gray-800 bg-gray-100">
                  {patient?.address || 'N/A'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default ViewPatient