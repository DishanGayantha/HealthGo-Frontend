import React from 'react'
import SampleSidebarLab from './SampleSidebarLab'
import { FaBell, FaSearch } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

import lab1img from '../../assets/images/labtech/labupload.jpg'
import lab2img from '../../assets/images/labtech/labmanageuser.jpg'
import lab3img from '../../assets/images/labtech/labpro.jpg'

const LabManage :React.FC= () => {

    const location = useLocation(); 
    const labtech = location.state?.labtech;
    console.log(`logged in labtech: ${JSON.stringify(labtech)}`);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <SampleSidebarLab />

      {/* Main content on the screen */}
      <main className="main-content">

      {/* First Part */}  
      <header className="header">
          {/* Header Left Side */}
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Lab Technician Dashboard</h2>
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

            <img src="https://images.pexels.com/photos/19601385/pexels-photo-19601385/free-photo-of-young-doctor-holding-a-stethoscope.jpeg?auto=compress&cs=tinysrgb&w=600" className="profile-image" alt="Admin" />
          </div>
        </header>

        <div className="dashboard-container">
          {/* Dash-Start */}
          <h2 className="text-2xl font-bold leading-snug text-black">
            Patients Dashboard
          </h2> 
          <div className="flex w-full md:flex-row  items-center gap-5">
            <section className="dashboard-overview-2">
              <div className="stat-card">
                <h3 className="text-xl font-semibold text-black">
                  Upload Reports
                </h3>
                <img src={lab1img} className="h-64 mt-2 mx-auto" />
                <p className="mt-2 ">
                    Manage and schedule user reports and upload reports to users.
                </p>
                <Link to={`/labtech`} state={{ labtech }}>
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-800 transition-all duration-300">
                    Upload
                  </button>
                </Link>
              </div>

              <div className="stat-card">
                <h3 className="text-xl font-semibold text-black">
                  My Patients
                </h3>
                <img src={lab2img} className="h-64 mt-2 mx-auto" />
                <p className="mt-2">
                    Access patient profiles, view medical histories, and track ongoing treatments and progress.
                </p>
                <Link to={`/labshow-patients`} state={{ labtech }}>
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-800  transition-all duration-300">
                    View
                  </button>
                </Link>
              </div>

              <div className="stat-card ">
                <h3 className="text-xl font-semibold text-black">
                  Manage Profile
                </h3>
                <img src={lab3img} className="h-64 mt-2 mx-auto" />
                <p className="mt-2">
                    Manage and check assigned hospital and assigned laboratory.
                </p>
                <Link to={`/labt-profile`} state={{ labtech }}>
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-800  transition-all duration-300">
                    Profile
                  </button>
                </Link> 
              </div> 
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LabManage