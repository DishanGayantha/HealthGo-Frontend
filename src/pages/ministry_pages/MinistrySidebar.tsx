import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { FaHospital, FaUserDoctor } from "react-icons/fa6";
import { RiHome3Line } from "react-icons/ri";
import './MinistrySidebar.css';
import superadminprofile from "@/assets/images/doctor/superadminprofile.avif";

const MinistrySidebar: React.FC = () => {
    const location = useLocation();
    const superAdmin = location.state?.superAdmin;
    if (superAdmin) console.log(`Super Admin: ${JSON.stringify(superAdmin)}`);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProfileClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


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
                                <Link to="/ministry-dashboard">
                                    <RiHome3Line/> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/manage-hospitals">
                                    <FaHospital/> Manage Hospitals
                                </Link>
                            </li>
                            <li>
                                <Link to="/manage-doctors">
                                    <FaUserDoctor/> Manage Doctors
                                </Link>
                            </li>
                        </div>
                        <div className='mt-40'>
                            <h1 className='font-bold'>ACCOUNT</h1>
                            <li>
                                {/*Trigger the modal when clicking Super Admin*/}
                                <button onClick={handleProfileClick} className="flex items-center space-x-2">
                                    <CgProfile/> <span>Super Admin</span>
                                </button>
                            </li>
                            <li>
                                <Link to="/super-admin-login">
                                    <IoLogOutOutline /> Logout
                                </Link>
                            </li>
                        </div>
                    </ul>
                </nav>
            </aside>

            {/* Modal for Super Admin Profile */}
            {isModalOpen && (
                <div className="super-admin-modal-overlay" onClick={closeModal}>
                    <div className="super-admin-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="super-admin-modal-header">
                            <h2 className="text-2xl font-bold">Super Admin Profile</h2>
                            <button className="super-admin-close-modal-btn" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span> {/* Using a character for the close icon */}
                            </button>
                        </div>
                        <div className="super-admin-modal-body">
                            {superAdmin ? (
                                <div className="super-admin-info">
                                    <img
                                        src={superadminprofile}
                                        alt="Super Admin"
                                        className="w-24 h-24 rounded-full mx-auto mb-4"
                                    />
                                    <h4 className="text-2xl font-semibold">{superAdmin.name}</h4>
                                    <p className="text-gray-600">Email: {superAdmin.email}</p>
                                    <p className="text-gray-600">Role: Super Admin</p>
                                </div>
                            ) : (
                                <div className="super-admin-info">
                                    <img
                                        src={superadminprofile}
                                        alt="Super Admin"
                                        className="w-24 h-24 rounded-full mx-auto mb-4"
                                    />
                                    <h4 className="text-2xl font-semibold">Anne Perera</h4>
                                    <p className="text-gray-600">Email: anne@gmail.com</p>
                                    <p className="text-gray-600">Role: Super Admin</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MinistrySidebar;
