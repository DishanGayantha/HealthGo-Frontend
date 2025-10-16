import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { RiHome3Line  } from "react-icons/ri";
import '../lab_tech_pages/SampleSidebarLab.css';
import { BiClinic } from "react-icons/bi";
import { TbHomeHand } from "react-icons/tb";

const RecepSidebar :React.FC = () => {
  return (
    <div>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2 className='font-bold text-center'>MEDILINK</h2>
          <hr className='mt-5'/>
        </div>
        <nav className="nav">
          <ul>
            <div className='mt-10'>
            <li>
              <Link to="/recep-dashboard">
              <RiHome3Line /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/create-patient">
              <BiClinic /> Register New Patients
              </Link>
            </li>
            <li>
              <Link to="/manage-patients">
              <BiClinic /> Manage Patients
              </Link>
            </li>
            <li>
              <Link to="/patients-for-appointments">
              <TbHomeHand /> Add Appointment
              </Link>
            </li>
            <li>
              <Link to="/clinics">
              <TbHomeHand /> View Clinics
              </Link>
            </li>
            <li>
              <Link to="/add-clinic">
              <BiClinic /> Add Clinics
              </Link>
            </li>
            </div>
            <div className='mt-40'>
            <h1 className='font-bold'>ACCOUNT</h1>
            <li>
              <Link to="">
              <CgProfile /> Profile
              </Link>
            </li>
            <li>
              <Link to="">
              <IoLogOutOutline /> Logout
              </Link>
            </li>
            </div>
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default RecepSidebar