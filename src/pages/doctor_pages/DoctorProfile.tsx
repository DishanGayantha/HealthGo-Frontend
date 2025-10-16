import React from 'react';
import docprofile from '../../assets/images/doctor/docaimg.png'; // Default profile image
import DocSidebar from './DocSidebar';
import { useLocation } from "react-router-dom";

const DoctorProfile: React.FC = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;

  // Check if doctor data is available
  if (!doctor) {
    return <div className="text-center text-red-500">Doctor details not found.</div>;
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <DocSidebar />

      {/* Main content on the screen */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Doctor Dashboard</h2>
            </div>
          </div>
          <div className="header-right flex items-center">
            <img src={docprofile} className="profile-image" alt="Doctor" />
          </div>
        </header>

        <div className="dashboard-container mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            <div className="flex items-center mb-4">
              <img src={doctor.imageUrl || docprofile} className="w-24 h-24 rounded-full mr-4" alt="Doctor Profile" />
              <div>
                <h4 className="text-2xl font-semibold">Name: {doctor.name}</h4>
                <p className="text-gray-600">Specialization: {doctor.specialization}</p>
                <p className="text-gray-600">Email: {doctor.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">Additional Details</h3>
            <p><strong>Bio:</strong> {doctor.bio || "No bio available."}</p>
            {/* You can add more details here as needed */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorProfile;
