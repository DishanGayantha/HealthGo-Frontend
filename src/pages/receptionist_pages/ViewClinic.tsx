import IClinic from "@/types/Clinic";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaBell, FaSearch } from "react-icons/fa";
import RecepSidebar from "./RecepSidebar";

function ViewClinic() {
  const [clinics, setClinics] = useState<IClinic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchClinics = async () => {
        const response = await axios.get("http://localhost:8080/api/clinics/");
        setClinics(response.data);
      };
      fetchClinics();
    } catch (error) {
      console.log(error);
    }
  },[]);

  const handleClinic = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/clinics/${id}`
      );
      if (response) {
        enqueueSnackbar("Clinic deleted successfully", {
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
          <div className="space-y-6">
            {clinics.map((clinic, clinicIndex) => (
              <div
                className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                key={clinicIndex}
              >
                <div className="mb-4">
                  <h3 className="font-bold text-2xl text-gray-800">Clinic: {clinic.clinicName}</h3>
                  <span className="text-gray-500 text-0.5xl italic mt-1 block">Doctor: {clinic.doctor.name}</span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">Patient Numbers</h4>
                  <div className="flex flex-wrap gap-2">
                    {clinic.patients.map((patient, patientIndex) => (
                      <button
                        key={patientIndex}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-colors"
                        onClick={() => navigate(`/patient/${patient.id}`)}
                      >
                        {patientIndex + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    onClick={() => navigate(`/add-to-clinic/${clinic.id}`)}
                  >
                    Add Patient
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                    onClick={() => handleClinic(clinic.id)}
                  >
                    Delete Clinic
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewClinic;
