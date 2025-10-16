import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import recep1 from "../../assets/images/recep/manageclinic2.jpg";
import recep2 from "../../assets/images/recep/newclinic.jpg";
import recep3 from "../../assets/images/doctor/patreportimg.jpg";
import docprof from "../../assets/images/doctor/docprof.jpg";
import docsum from "../../assets/images/doctor/docsum.jpg";
import RecepSidebar from "./RecepSidebar";
import receppro from '../../assets/images/recep/recepprofilepic.png'

const RecepDashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <RecepSidebar />

      {/* Main content on the screen */}
      <main className="main-content">
        {/* First Part */}
        <header className="header">
          {/* Header Left Side */}
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Receptionist Dashboard</h2>
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

            <img src={receppro} className="profile-image" alt="Recep" />
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
                <h3 className="text-xl font-semibold text-black">My Clinics</h3>
                <img src={recep1} className="h-64 mt-2 mx-auto" />
                <p className="mt-2 ">
                  Manage your clinic's details, patient records and appointment
                  schedules.
                </p>
                <Link to="/clinics">
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-800  transition-all duration-300">
                    View Clinics
                  </button>
                </Link>
              </div>

              <div className="stat-card">
                <h3 className="text-xl font-semibold text-black">
                  Add New Clinic
                </h3>
                <img src={recep2} className="h-64 mt-2 mx-auto" />
                <p className="mt-2">
                  Easily set up a new clinic by entering essential details to
                  enhance your healthcare network.
                </p>
                <Link to="/add-clinic">
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-800  transition-all duration-300">
                    Add New Clinic
                  </button>
                </Link>
              </div>

              <div className="stat-card ">
                <h3 className="text-xl font-semibold text-black">
                  Patient Reports
                </h3>
                <img src={recep3} className="h-64 mt-2 mx-auto" />
                <p className="mt-2">
                  Generate reports on patient care, treatment outcomes, and
                  overall health analytics.
                </p>
                <Link to="/patients-for-appointments">
                  <button className="bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-800  transition-all duration-300">
                    Patient Appointments
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
                  Update and manage your personal information, credentials, and
                  preferences to ensure your profile stays current and secure.
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
                  Patient Summary
                </h3>
                <p className="mt-2 text-left">
                  View a comprehensive overview of patients, appointments, and
                  activities to stay informed and organized in delivering
                  efficient care.
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
  );
};

export default RecepDashboard;
