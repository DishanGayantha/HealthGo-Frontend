import React from 'react';
import DocSidebar from './DocSidebar'
import { FaBell, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import hospitaling from '../../assets/images/doctor/hospitalimg.jpg'
import mypatimg from '../../assets/images/doctor/mypatimg.jpg'
import patreport from '../../assets/images/doctor/patreportimg.jpg'
import docprof from '../../assets/images/doctor/docprof.jpg'
import docsum from '../../assets/images/doctor/docsum.jpg'
import docprofile from '../../assets/images/doctor/docaimg.png'

const DocDashboard :React.FC= () => {

  const location = useLocation();
  const doctor = location.state?.doctor;
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
              <h2 className="text-3xl font-semibold">Doctor Dashboard</h2>
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

            <img src={docprofile} className="profile-image" alt="Doctor" />
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
                  My Hospitals
                </h3>
                <img src={hospitaling} className="h-64 mt-2 mx-auto" />
                <p className="mt-2 ">
                    Manage hospital information, add or update hospital details, and track the facilities available.
                </p>
                <Link to={`/asigned-hos`} state={{ doctor }}>
                  <button className="bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-800 transition-all duration-300">
                    View Hospitals
                  </button>
                </Link>
              </div>

              <div className="stat-card">
                <h3 className="text-xl font-semibold text-black">
                  My Patients
                </h3>
                <img src={mypatimg} className="h-64 mt-2 mx-auto" />
                <p className="mt-2">
                    Access patient profiles, view medical histories, and track ongoing treatments and progress.
                </p>
                <Link to={`/patient-appointment`} state={{ doctor }}>
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-800  transition-all duration-300">
                    Appointments
                  </button>
                </Link>
              </div>

              <div className="stat-card ">
                <h3 className="text-xl font-semibold text-black">
                  Patient Reports
                </h3>
                <img src={patreport} className="h-64 mt-2 mx-auto" />
                <p className="mt-2">
                    Generate reports on patient care, treatment outcomes, and overall health analytics.
                </p>
                <Link to={`/patient-report`} state={{ doctor }}>
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-800  transition-all duration-300">
                    Patient Reports
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
                <Link to={`/doct-profile`} state={{ doctor }}>
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
                  Doctor Summary
                </h3>
                <p className="mt-2 text-left">
                    View a comprehensive overview of patients, appointments, and activities to stay informed and organized in delivering efficient care.
                </p>
                <Link to={`/patient-report`} state={{ doctor }}>
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

export default DocDashboard