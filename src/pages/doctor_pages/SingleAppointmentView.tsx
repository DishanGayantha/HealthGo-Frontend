import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaBell, FaSearch } from "react-icons/fa";
import docprofile from '../../assets/images/doctor/docaimg.png'
import DocSidebar from './DocSidebar';

const SingleAppointmentView: React.FC = () => {
  const location = useLocation();
  const { appointment, patient, hospital } = location.state || {}; // Destructure the passed data

  if (!appointment || !patient || !hospital) {
    return <div>Error: Details not found.</div>;
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <DocSidebar />

      {/* Main content on the screen */}
      <main className="main-content">

        {/* First Part */}
        <header className="header">
          {/* Header Left Side */}
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Assigned Hospitals</h2>
            </div>
          </div>

          {/* Header Right Side */}
          <div className="header-right flex items-center">
            <button className="notification-icon mr-4">
              <FaBell size={18} />
            </button>

            <img src={docprofile} className="profile-image" alt="Doctor" />
          </div>
        </header>

        <div className="dashboard-container">
            <div className="max-w-100xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center">Appointment Details</h2>

            <form className="space-y-8">
                {/* Patient Details */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-3xl text-center font-semibold mb-6">Patient Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-lg font-semibold">Name:</label>
                    <input
                        type="text"
                        value={patient.name}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                    <div>
                    <label className="block text-lg font-semibold">Age:</label>
                    <input
                        type="text"
                        value={patient.age}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                    <div>
                    <label className="block text-lg font-semibold">Gender:</label>
                    <input
                        type="text"
                        value={patient.gender}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                </div>
                </div>

                {/* Appointment Info */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-3xl text-center font-semibold mb-6">Appointment Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-lg font-semibold">Hospital:</label>
                    <input
                        type="text"
                        value={hospital.hospitalName}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                    <div>
                    <label className="block text-lg font-semibold">Appointment Date:</label>
                    <input
                        type="text"
                        value={appointment.date}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                    <div>
                    <label className="block text-lg font-semibold">Appointment Time:</label>
                    <input
                        type="text"
                        value={appointment.time}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                    <div>
                    <label className="block text-lg font-semibold">Payment Status:</label>
                    <input
                        type="text"
                        value={appointment.isPaid ? 'Yes' : 'No'}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                </div>
                </div>

                {/* Hospital Details */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-3xl text-center font-semibold mb-6">Hospital Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-lg font-semibold">Hospital Name:</label>
                    <input
                        type="text"
                        value={hospital.hospitalName}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                    <div>
                    <label className="block text-lg font-semibold">Hospital Location:</label>
                    <input
                        type="text"
                        value={hospital.area}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                    <div>
                    <label className="block text-lg font-semibold">Contact Info:</label>
                    <input
                        type="text"
                        value={hospital.contactNumber}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                    <div>
                    <label className="block text-lg font-semibold">Hospital Type:</label>
                    <input
                        type="text"
                        value={hospital.hospitalType}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    />
                    </div>
                </div>
                </div>
            </form>
            </div>
        </div>
      </main>
    </div>
  );
};

export default SingleAppointmentView;
