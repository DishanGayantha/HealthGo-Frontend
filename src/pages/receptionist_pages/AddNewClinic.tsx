import IDoctor from '@/types/doctor';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RecepSidebar from './RecepSidebar';
import { FaBell, FaSearch } from "react-icons/fa";


function AddNewClinic() {

    const [doctors, setDoctors] = useState<IDoctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<string>("");
    const [clinicName, setClinicName] = useState<string>("");
    const navigate = useNavigate();

    const hospitalId = '67102b30c5c477743962a815';

    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDoctor(e.target.value);
      };

    useEffect(() => {
        try {
            const fetchDoctor = async () => {
                const response = await axios.get('http://localhost:8080/api/doctors/');
                if(response) {
                    setDoctors(response.data);
                }
            }
            fetchDoctor();
        } catch (error) {
            console.log(error);
        }
    },[])  

    const handleSubmit = async() => {
        try {
            const response = await axios.post('http://localhost:8080/api/clinics/create', {
                clinicName : clinicName,
                doctorId : selectedDoctor,
                hospitalId : hospitalId
            })

            if(response) {
                enqueueSnackbar("Patient added to the clinic successfully", {
                    variant: "success",
                  });
                  navigate("/clinics");
            }

        } catch (error) {
            console.log(error);
        }
    };

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
              <h2 className="text-3xl font-semibold">Add New Clinic</h2>
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
          <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Clinic</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-xl font-semibold mb-2">Clinic Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter Clinic Name"
                onChange={(e) => setClinicName(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-xl font-semibold mb-2">Doctor</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={selectedDoctor}
                onChange={handleDoctorChange}
              >
                <option value="" disabled>Select a Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-800"
                onClick={handleSubmit}
              >
                Add Clinic
              </button>
              <button
                className="bg-red-500 text-white font-bold px-4 py-2 rounded-md hover:bg-red-800"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddNewClinic