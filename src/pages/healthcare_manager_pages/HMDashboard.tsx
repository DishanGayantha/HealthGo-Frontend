import React from 'react';
import HealthSidebar from './HealthSidebar';
import { FaBell, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

import staffimg from '../../assets/images/hc/health_staffimg.jpg'
import reportimg from '../../assets/images/hc/health_reportimg.jpg'

import ward1 from '../../assets/images/hc/wardmain.png'
import ward2 from '../../assets/images/hc/wardmanage.jpg'

import lab1 from '../../assets/images/hc/labimg1.jpg'
import lab2 from '../../assets/images/hc/managelab.jpg'

import recep1 from '../../assets/images/hc/recep1.jpg'
import recep2 from '../../assets/images/hc/recep2.jpg'

import labroom1 from '../../assets/images/hc/singlab.jpg'
import labroom2 from '../../assets/images/hc/labtik.jpg'

import opr1 from '../../assets/images/hc/op1.jpg'
import opr2 from '../../assets/images/hc/op2.jpg'

import wardroom1 from '../../assets/images/hc/signleward.jpg'
import wardroom2 from '../../assets/images/hc/wardroom1.jpg'


const HMDashboard :React.FC = () => {
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
              <h2 className="text-3xl font-semibold">Healthcare Manager Dashboard</h2>
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

            <img  className="profile-image" alt="HCM" />
          </div>
        </header>

        <div className="dashboard-container">

          {/* Staff Dash-Start */}
          <h2 className="text-2xl font-bold leading-snug text-black mt-5">
            Staff Manage Dashboard
          </h2>

          {/* Ward Head */}
          <section className="dashboard-overview">
            <div className="stat-card flex items-center">
              <img src={ward1} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                  Add Ward Head
                </h3>
                <p className="mt-2 text-left">
                Create a new ward head responsible for managing the operations, staff, and patient care in a specific ward within the hospital.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-600 transition-all duration-300">
                    Add
                  </button>
                </Link>
              </div>
            </div>
            <div className="stat-card flex items-center">
              <img src={ward2} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Manage Ward Head
                </h3>
                <p className="mt-2 text-left">
                Update, and manage the details of existing ward heads, including their assignments, performance, and roles in the hospital.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-600 transition-all duration-300">
                    Manage
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Receptionist */}
          <section className="dashboard-overview">
            <div className="stat-card flex items-center">
              <img src={recep1} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Add Receptionist
                </h3>
                <p className="mt-2 text-left">
                    Register a new receptionist for handling front desk duties such as patient check-ins and general inquiries.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-red-600 transition-all duration-300">
                    Add
                  </button>
                </Link>
              </div>
            </div>
            <div className="stat-card flex items-center">
              <img src={recep2} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Manage Receptionist
                </h3>
                <p className="mt-2 text-left">
                    Monitor and update the roles and responsibilities of existing receptionists and task assignments.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-red-600 transition-all duration-300">
                    Manage
                  </button>
                </Link>
              </div>
            </div>
          </section>

            {/* Lab Tech*/}
          <section className="dashboard-overview">
            <div className="stat-card flex items-center">
              <img src={lab1} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                  Add Lab Technician
                </h3>
                <p className="mt-2 text-left">
                  Register a new lab technician responsible for conducting diagnostic tests and ensuring accurate test results.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-600 transition-all duration-300">
                    Add
                  </button>
                </Link>
              </div>
            </div>
            <div className="stat-card flex items-center">
              <img src={lab2} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Manage Lab Technician
                </h3>
                <p className="mt-2 text-left">
                    Update, and manage the details and performance of existing lab technicians, including their assigned labs and duties.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-600 transition-all duration-300">
                    Manage
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Room Dash-Start */}
          <h2 className="text-2xl font-bold leading-snug text-black mt-5">
            Room Allocation Dashboard
          </h2>

          {/* Ward Rooms*/}
          <section className="dashboard-overview">
            <div className="stat-card flex items-center">
              <img src={wardroom1} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Add Ward Rooms
                </h3>
                <p className="mt-2 text-left">
                    Add new rooms within a specific ward for patient allocation, ensuring appropriate facilities for care and recovery.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-cyan-400 transition-all duration-300">
                    Add
                  </button>
                </Link>
              </div>
            </div>
            <div className="stat-card flex items-center">
              <img src={wardroom2} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Manage Ward Rooms
                </h3>
                <p className="mt-2 text-left">
                    Monitor and update the availability, occupancy, and details of ward rooms to resource allocation.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-cyan-400 transition-all duration-300">
                    Manage
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Lab Rooms*/}
          <section className="dashboard-overview">
            <div className="stat-card flex items-center">
              <img src={labroom1} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Add Labs
                </h3>
                <p className="mt-2 text-left">
                    Register a new laboratory facility within the hospital for diagnostic testing and research, ensuring proper equipment.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-purple-600 transition-all duration-300">
                    Add
                  </button>
                </Link>
              </div>
            </div>
            <div className="stat-card flex items-center">
              <img src={labroom2} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Manage Labs
                </h3>
                <p className="mt-2 text-left">
                    Update the details of existing labs, including equipment status, lab technician assignments, and operational efficiency.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-purple-600 transition-all duration-300">
                    Manage
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Operations */}
          <section className="dashboard-overview">
            <div className="stat-card flex items-center">
              <img src={opr1} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Add Operations
                </h3>
                <p className="mt-2 text-left">
                    Schedule and register new surgical procedures, resources required for the operation.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-400 transition-all duration-300">
                    Add
                  </button>
                </Link>
              </div>
            </div>
            <div className="stat-card flex items-center">
              <img src={opr2} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                    Manage Operations
                </h3>
                <p className="mt-2 text-left">
                    Update the details of scheduled operations, including timing, staff assignments, and operative care requirements.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-400 transition-all duration-300">
                    Manage
                  </button>
                </Link>
              </div>
            </div>
          </section>


            {/* Profile Dash Start */}
          <h2 className="text-2xl font-bold leading-snug text-black mt-5">
            Profile Dashboard
          </h2>
          <section className="dashboard-overview">
            <div className="stat-card flex items-center">
              <img src={reportimg} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                  Report Generation
                </h3>
                <p className="mt-2 text-left">
                Generate detailed reports on hospital staff to streamline workforce management and ensure efficient hospital operations.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-600 transition-all duration-300">
                    Check Reports
                  </button>
                </Link>
              </div>
            </div>
            <div className="stat-card flex items-center">
              <img src={staffimg} className="w-1/5" />
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black text-left">
                  Staff Summary
                </h3>
                <p className="mt-2 text-left">
                    View a comprehensive overview of staff and activities to stay informed and organized in delivering efficient care.
                </p>
                <Link to="">
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-600 transition-all duration-300">
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

export default HMDashboard