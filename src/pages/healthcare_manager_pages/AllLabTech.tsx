import React from 'react'
import { Link } from 'react-router-dom'
import HealthSidebar from './HealthSidebar'
import {  FaSearch } from "react-icons/fa";


const AllLabTech :React.FC= () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <HealthSidebar />

      {/* Main content on the screen */}
      <main className="main-content">

      {/* First Part */}  
      <header className="header">
          {/* Header Left Side */}
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Manage Lab Technicians</h2>
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
            
            <button className="h-10 pl-10 bg-green-600 text-white pr-10 rounded-full shadow-sm w-full border border-gray-300">
                <Link to=''>
                + Add Lab Technician
                </Link>
            </button>
            
          </div>
        </header>

        <div className="dashboard-container">
          {/* Content Here */}
        </div>
      </main>
    </div>
  )
}

export default AllLabTech