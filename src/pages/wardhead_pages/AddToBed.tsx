import IPatient from '@/types/patient'
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaBell, FaSearch } from "react-icons/fa";
import WHSidebar from "./WHSidebar";

function AddToBed() {

    const { id } = useParams<{ id: string }>();
    const [patients, setPatients] = useState<IPatient[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/patients/');
            setPatients(response.data); 
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchPatients();
      }, []);
    
    const assignToBed = async (patientId: string) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/beds/update`,{
                bedId : id,
                patientId : patientId,
            });

            if(response) {
                enqueueSnackbar("Bed is empty", { variant: "success" });
                navigate(-1);
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
            <h2 className="text-3xl font-semibold">Assign Patients to the Bed</h2>
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
          <img  className="profile-image" alt="WH" />
        </div>
      </header>

      <div className="dashboard-container">
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
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{patient.name}</td>
                  <td className="py-4 px-6">{patient.age}</td>
                  <td className="py-4 px-6">{patient.gender}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => assignToBed(patient.id)}
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                    >
                      Assign to Bed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </main>
  </div>
  )
}

export default AddToBed