import React, { useEffect, useState } from "react";
import SampleSidebarLab from './SampleSidebarLab';
import { FaBell, FaSearch } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import config from "../../constants/config";

interface Hospital {
  hospitalId: string;
  hospitalName: string;
  hospitalEmail: string;
  area: string;
  contactNumber: string;
  hospitalType: string;
  imageUrl?: string;
}

const LabTechProfile: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [assignedHospital, setAssignedHospital] = useState<Hospital | null>(null);
  const location = useLocation();
  const labtech = location.state?.labtech;

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${config.backend_url}/api/hospitals`);
        const data: Hospital[] = await response.json();
        setHospitals(data);

        // Find the hospital assigned to the lab technician
        if (labtech?.allocatedHospitalId) {
          const hospital = data.find(h => h.hospitalId === labtech.allocatedHospitalId);
          setAssignedHospital(hospital || null);
        }
      } catch (error) {
        console.error("Error fetching hospitals: ", error);
      }
    };

    fetchHospitals();
  }, [labtech?.allocatedHospitalId]);

  console.log(`logged in labtech: ${JSON.stringify(labtech)}`);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <SampleSidebarLab />

      {/* Main content */}
      <main className="main-content p-6">
        {/* Header */}
        <header className="header flex justify-between items-center mb-8">
          <div className="user-info">
            <h2 className="text-3xl font-bold text-gray-800">Profile Information</h2>
          </div>

          <div className="header-right flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="h-10 pl-10 pr-10 rounded-full shadow-sm border border-gray-300"
              />
              <div className="absolute left-3 top-2 text-gray-500">
                <FaSearch size="15px" />
              </div>
            </div>

            <button className="notification-icon ml-4 mr-4">
              <FaBell size={18} />
            </button>

            <img
              src="https://images.pexels.com/photos/19601385/pexels-photo-19601385/free-photo-of-young-doctor-holding-a-stethoscope.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-12 h-12 rounded-full border-2 border-gray-300"
              alt="Lab Technician"
            />
          </div>
        </header>

        {/* Profile Section */}
        <div className="profile-section bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Profile Information</h3>
          
          {labtech ? (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  value={labtech.name}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={labtech.email}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">User Type</label>
                <input
                  type="text"
                  value={labtech.userType}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Allocated Hospital ID</label>
                <input
                  type="text"
                  value={labtech.allocatedHospitalId}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>
            </form>
          ) : (
            <p className="text-gray-500">No lab technician data found.</p>
          )}
        </div>

        {/* Assigned Hospital Section */}
        <div className="hospital-section mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Assigned Hospital Information</h3>

          {assignedHospital ? (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">Hospital Name</label>
                <input
                  type="text"
                  value={assignedHospital.hospitalName}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={assignedHospital.hospitalEmail}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Area</label>
                <input
                  type="text"
                  value={assignedHospital.area}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Contact Number</label>
                <input
                  type="text"
                  value={assignedHospital.contactNumber}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Hospital Type</label>
                <input
                  type="text"
                  value={assignedHospital.hospitalType}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>
            </form>
          ) : (
            <p className="text-gray-500">No assigned hospital data found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default LabTechProfile;
