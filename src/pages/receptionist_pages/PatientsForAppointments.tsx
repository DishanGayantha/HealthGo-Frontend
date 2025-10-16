import IPatient from "@/types/patient";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecepSidebar from "./RecepSidebar";
import receppro from '../../assets/images/recep/recepprofilepic.png'
import { FaBell, FaSearch } from "react-icons/fa";

function PatientsForAppointments() {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/patients/");
        setPatients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();
  }, []);

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
              <h2 className="text-3xl font-semibold">Receptionist Dashboard</h2>
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

            <img src={receppro} className="profile-image" alt="Recep" />
          </div>
        </header>

        <div className="dashboard-container">
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Select Patient</h2>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Patient Name</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Age</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Gender</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                      <td className="py-4 px-6 text-gray-800">{patient.name}</td>
                      <td className="py-4 px-6 text-gray-800">{patient.age}</td>
                      <td className="py-4 px-6 text-gray-800">{patient.gender}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => navigate(`/create-appointment/${patient.id}`)}
                          className="px-8 py-2 rounded-lg bg-green-600 font-semibold text-white hover:bg-green-700 transition duration-200"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientsForAppointments;
