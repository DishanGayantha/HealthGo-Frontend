import React from 'react';
import {MdEventAvailable} from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { RiHome3Line } from "react-icons/ri";
import './SampleSidebarLab.css';


const SampleSidebarLab :React.FC= () => {
    const location = useLocation();  
    const labtech = location.state?.labtech;
    console.log(`logged in labtech: ${JSON.stringify(labtech)}`);

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
                <Link to={`/lab-manage`} state={{labtech}}>
                  <RiHome3Line/> Dashboard
                </Link>
              </li>
              <li>
                <Link to={`/labtech`} state={{labtech}}>
                  <MdEventAvailable/> Upload Lab Reports
                </Link>
              </li>
              <li>
                <Link to={`/labshow-labtests`} state={{labtech}}>
                  <MdEventAvailable/> Show All Lab Reports
                </Link>
              </li>
              <li>
                <Link to={`/lab-assign-op`} state={{labtech}}>
                  <MdEventAvailable/> My Lab Operations
                </Link>
              </li>
              <li>
                <Link to={`/labshow-patients`} state={{labtech}}>
                  <MdEventAvailable/> Show All Patients
                </Link>
              </li>
            </div>
            <div className='mt-40'>
              <h1 className='font-bold'>ACCOUNT</h1>
              <li>
                <Link to={`/labt-profile`} state={{labtech }}>
              <CgProfile /> Profile
              </Link>
            </li>
            <li>
              <Link to={`/labt-login`} state={{ labtech }}>
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

export default SampleSidebarLab;
