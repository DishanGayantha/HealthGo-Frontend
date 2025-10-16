import React from 'react';
import {MdOutlineBedroomChild} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserDoctor, FaPersonBooth } from "react-icons/fa6";
import { RiHome3Line  } from "react-icons/ri";
import '../lab_tech_pages/SampleSidebarLab.css';
import { BsPersonVideo3 } from "react-icons/bs";
import { ImLab } from "react-icons/im";
import { FaHandHoldingMedical } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";

const HealthSidebar :React.FC= () => {
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
              <Link to="/hcm-dashboard">
              <RiHome3Line /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/all-wardinfo">
              <FaUserDoctor /> Manage Ward Heads
              </Link>
            </li>
            <li>
              <Link to="/all-receptionistinfo">
              <BsPersonVideo3 /> Manage Receptionist
              </Link>
            </li>
            <li>
              <Link to="/add-labinfo">
              <FaPersonBooth /> Manage Lab Techs
              </Link>
            </li>
            <li>
              <Link to="/all-wardroomsinfo">
              <MdOutlineBedroomChild /> Manage Ward Rooms
              </Link>
            </li>
            <li>
              <Link to="/all-labroomsinfo">
              <ImLab /> Manage Lab Rooms
              </Link>
            </li>
            <li>
              <Link to="/all-operations">
              <FaHandHoldingMedical  /> Manage Operations
              </Link>
            </li>
            <li>
              <Link to="">
              <TbReportSearch  /> Staff Reports
              </Link>
            </li>
            </div>

            <div className='mt-20'>
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
  );
};

export default HealthSidebar;
