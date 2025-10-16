import IPatient from "@/types/patient";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecepSidebar from "./RecepSidebar";
import receppro from '../../assets/images/recep/recepprofilepic.png'
import { FaBell, FaSearch } from "react-icons/fa";

const ManagePatient = () => {
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

  const handleDelete = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/patients/${id}`);
        if (response) {
            enqueueSnackbar("Patient Deleted successfully", {
              variant: "success",
            });
            navigate("/manage-patients");
          }
    } catch (error) {
        console.log(error);
    }
  }

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
        <div className="max-w-100xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Registered Patients</h2>
          <div className="mb-4">
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition"
              onClick={() => navigate('/create-patient')}
            >
              Add New Patient
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg ">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left w-1/12">No</th>
                <th className="py-3 px-6 text-left w-2/12">Name</th>
                <th className="py-3 px-6 text-left w-2/12">Email</th>
                <th className="py-3 px-6 text-left w-3/12">Address</th>
                <th className="py-3 px-6 text-left w-1/12">Gender</th>
                <th className="py-3 px-6 text-left w-1/12">Age</th>
                <th className="py-3 px-6 text-left w-1/12">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{patient.name}</td>
                  <td className="py-3 px-6">{patient.email}</td>
                  <td className="py-3 px-6">{patient.address}</td>
                  <td className="py-3 px-6">{patient.gender}</td>
                  <td className="py-3 px-6">{patient.age}</td>
                  <td className="py-3 px-6">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                        onClick={() => navigate(`/update-patients/${patient.id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                        onClick={() => handleDelete(patient.id)}
                      >
                        Delete
                      </button>
                    </div>
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
};

export default ManagePatient;
