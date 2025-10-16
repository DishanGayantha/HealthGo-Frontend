import React from 'react'
import { Link } from 'react-router-dom'
import WHSidebar from './WHSidebar'
import { FaBell, FaSearch } from "react-icons/fa";


import ward1 from '../../assets/images/wardhead/managepatient.jpg'
import ward2 from '../../assets/images/wardhead/wardroom.jpg'
import ward3 from '../../assets/images/wardhead/wardreport.jpg'
import docprof from '../../assets/images/doctor/docprof.jpg'
import docsum from '../../assets/images/doctor/docsum.jpg'


const WHDashboard :React.FC= () => {
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
              <h2 className="text-3xl font-semibold">Ward Head Dashboard</h2>
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
          {/* Dash-Start */}
          <h2 className="text-2xl font-bold leading-snug text-black">
            Ward Main Dashboard
          </h2>
          <div className="flex w-full md:flex-row  items-center gap-5">
            <section className="dashboard-overview-2">
              <div className="stat-card">
                <h3 className="text-xl font-semibold text-black">
                  Manage Ward Rooms
                </h3>
                <img src={ward1} className="h-64 mt-2 mx-auto" />
                <p className="mt-2 ">
                  Organize the ward rooms, ensuring optimal use and maintenance for patient comfort.
                </p>
                <Link to="/wards">
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-500  transition-all duration-300">
                    Manage Ward
                  </button>
                </Link>
              </div>

              <div className="stat-card">
                <h3 className="text-xl font-semibold text-black">
                    Add Ward Rooms
                </h3>
                <img src={ward2} className="h-64 mt-2 mx-auto" />
                <p className="mt-2">
                      Create new ward rooms to expand hospital capacity and improve patient care.
                </p>
                <Link to="/wards/create">
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-500 transition-all duration-300">
                    Add Ward
                  </button>
                </Link>
              </div>

              <div className="stat-card ">
                <h3 className="text-xl font-semibold text-black">
                  Ward Reports
                </h3>
                <img src={ward3} className="h-64 mt-2 mx-auto" />
                <p className="mt-2">
                    Generate reports on ward occupancy, patient distribution, and room utilization for management insights.
                </p>
                <Link to="">
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-500 transition-all duration-300">
                    Check Reports
                  </button>
                </Link>
              </div>
            </section>
          </div>

          <h2 className="text-2xl font-bold leading-snug text-black mt-5">
            Profile Dashboard
          </h2>
          <section className="dashboard-overview">
            <div className="stat-card flex items-center">
              <img src={docprof} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                  My Profile
                </h3>
                <p className="mt-2 text-left">
                    Update and manage your personal information, credentials, and preferences to ensure your profile stays current and secure.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-purple-800 transition-all duration-300">
                    Manage Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="stat-card flex items-center">
              <img src={docsum} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                  Ward Summary
                </h3>
                <p className="mt-2 text-left">
                    View a comprehensive overview of patients, appointments, and activities to stay informed and organized in delivering efficient care.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-800 transition-all duration-300">
                    View Summary
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default WHDashboard