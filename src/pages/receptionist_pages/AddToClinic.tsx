import IPatient from "@/types/patient";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecepSidebar from "./RecepSidebar";
import { FaBell, FaSearch } from "react-icons/fa";

function AddToClinic() {
  const { id } = useParams<{ id: string }>();
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

  const handleAssignToClinic = async (patientId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/clinics/${id}/add-patient/${patientId}`
      );
      if (response) {
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
              <h2 className="text-3xl font-semibold">Assign Patients</h2>
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
          <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Assign Patients To Clinic</h2>
            
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-black">
                  <th className="py-3 px-4 text-left text-white">Patient Name</th>
                  <th className="py-3 px-4 text-left text-white">Age</th>
                  <th className="py-3 px-4 text-left text-white">Gender</th>
                  <th className="py-3 px-4 text-center text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <label className="font-semibold text-black">{patient.name || 'N/A'}</label>
                    </td>
                    <td className="py-4 px-4">
                      <label className="font-semibold text-black">{patient.age || 'N/A'}</label>
                      
                    </td>
                    <td className="py-4 px-4">
                      <label className="font-semibold text-black">{patient.gender || 'N/A'}</label>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        className="mt-6 px-8 py-2 text-white bg-green-700 rounded-md hover:bg-green-800"
                        onClick={() => handleAssignToClinic(patient.id)}
                      >
                        Assign
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

export default AddToClinic;
