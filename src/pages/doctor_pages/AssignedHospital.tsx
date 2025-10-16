import React, { useEffect, useState } from "react";
import DocSidebar from './DocSidebar';
import { FaBell, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import config from "../../constants/config";
import docprofile from '../../assets/images/doctor/docaimg.png';

interface Hospital {
  hospitalId: string;
  hospitalName: string;
  hospitalEmail: string;
  area: string;
  contactNumber: string;
  hospitalType: string;
  imageUrl: string;
}

const AssignedHospital: React.FC = () => {
  const hospitalImages = [
    "https://i.pinimg.com/enabled/564x/a8/a1/07/a8a107e2a9ae0ef0e3c77a0dd76b73e7.jpg",
    "https://i.pinimg.com/enabled/564x/32/26/fa/3226fae8c2fd31e1c49f441c36ed100c.jpg",
    "https://i.pinimg.com/enabled/564x/ee/ab/bf/eeabbf287a1eb43cf76321b99e15698b.jpg",
    "https://i.pinimg.com/564x/79/fa/c9/79fac9721b66d1da714a5717ce55844d.jpg",
    "https://i.pinimg.com/564x/04/a4/96/04a49698f3c428c79e4acb77cce8ee47.jpg",
    "https://i.pinimg.com/736x/b7/b0/ae/b7b0ae4eb163a6621502229889d63d10.jpg",
    "https://i.pinimg.com/564x/54/07/dd/5407dd6a809512dcc9a297c14214bb15.jpg",
    "https://i.pinimg.com/enabled/564x/cd/08/b9/cd08b956d1f69560dd742f4c26215dfd.jpg",
    "https://i.pinimg.com/enabled/564x/70/0d/c8/700dc8e1d3c748b53ea58255d3fb81e4.jpg",
    "https://i.pinimg.com/enabled/564x/bf/44/56/bf44563130cef2ae992c6b7aff91267e.jpg"
  ];

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hospitalsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const location = useLocation();
  const doctor = location.state?.doctor;

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await fetch(`${config.backend_url}/api/hospitals`);
      const data = await response.json();
      setHospitals(data);
    };
    fetchHospitals();
  }, []);

  // Filter the hospitals based on the doctor's assigned hospitals (workingHospitals)
  const assignedHospitals = hospitals.filter(hospital =>
    doctor?.workingHospitals.includes(hospital.hospitalId)
  );

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;

  // Filter hospitals based on the search query
  const filteredHospitals = assignedHospitals.filter(
    (hospital) =>
      hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.hospitalType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentHospitals = filteredHospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatHospitalType = (type: string): string => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  console.log(`logged in doctor: ${JSON.stringify(doctor)}`);

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
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
            />
            <div className="absolute mt-0.7 ml-4 text-gray-500">
              <FaSearch size="15px" />
            </div>

            <button className="notification-icon mr-4">
              <FaBell size={18} />
            </button>

            <img src={docprofile} className="profile-image" alt="Doctor" />
          </div>
        </header>

        <div className="dashboard-container">
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentHospitals.map((hospital, idx) => (
              <div
                key={hospital.hospitalId}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
              >
                {/* Hospital Image and Basic Info */}
                <div className="flex items-center space-x-6">
                  {/* Hospital Image */}
                  <div className="w-24 h-24">
                    <img
                      src={hospitalImages[idx % hospitalImages.length] || "https://i.pinimg.com/enabled/564x/a8/a1/07/a8a107e2a9ae0ef0e3c77a0dd76b73e7.jpg"} 
                      alt={hospital.hospitalName}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>

                  {/* Hospital Information */}
                  <div className="space-y-1.5"> 
                    <h3 className="text-2xl font-bold">{hospital.hospitalName}</h3>
                    <p className="text-sm font-semibold text-black">Hospital Location: {hospital.area}</p>
                    <p className="text-sm font-semibold text-black">Contact Info: {hospital.contactNumber}</p> 
                    <p className="text-sm font-semibold text-black">Hospital Type: {hospital.hospitalType}</p> 
                    <p className="text-sm font-semibold text-black">Importance: High</p>
                    <p className="text-sm font-semibold italic text-black">Hospital ID: #{hospital.hospitalId}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AssignedHospital;
