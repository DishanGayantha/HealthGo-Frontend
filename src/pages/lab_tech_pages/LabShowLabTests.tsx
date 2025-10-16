import React, { useEffect, useState } from "react";
import SampleSidebarLab from "./SampleSidebarLab";
import { FaBell, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface ILabTest {
    testId: string;
    testName: string;
    status: string;
    result: string;
    hospitalId: string;
    patientId: string;
}

const LabShowLabTests: React.FC = () => {
    const location = useLocation();
    const labtech = location.state?.labtech;
    const hospitalId = labtech?.allocatedHospitalId;

    const [labTests, setLabTests] = useState<ILabTest[]>([]);

    useEffect(() => {
        const fetchLabTests = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/labtests/hospital/${hospitalId}`
                );
                setLabTests(response.data);
            } catch (error) {
                console.error("Error fetching lab tests:", error);
            }
        };

        if (hospitalId) {
            fetchLabTests();
        }
    }, [hospitalId]);

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <SampleSidebarLab />

            {/* Main content */}
            <main className="main-content p-6">
                {/* Header */}
                <header className="header flex justify-between items-center mb-8">
                    <div className="user-info">
                        <h2 className="text-3xl font-bold text-gray-800">Lab Reports Information</h2>
                    </div>

                    <div className="header-right flex items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-10 pl-10 pr-10 rounded-full shadow-sm border border-gray-300"
                            />
                            <div className="absolute left-3 top-2 text-gray-500">
                                <FaSearch size="15px" />
                            </div>
                        </div>

                        <button className="notification-icon ml-4 mr-4">
                            <FaBell size={18} />
                        </button>

                        <img
                            src="https://images.pexels.com/photos/19601385/pexels-photo-19601385/free-photo-of-young-doctor-holding-a-stethoscope.jpeg?auto=compress&cs=tinysrgb&w=600"
                            className="w-12 h-12 rounded-full border-2 border-gray-300"
                            alt="Lab Technician"
                        />
                    </div>
                </header>

                <div className="dashboard-container">
                    <div className="max-w-100xl mx-auto p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Lab Reports List</h2>
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                                <th className="py-3 px-6 text-left w-1/12">No</th>
                                <th className="py-3 px-6 text-left w-3/12">Test Name</th>
                                <th className="py-3 px-6 text-left w-2/12">Status</th>
                                <th className="py-3 px-6 text-left w-4/12">Result</th>
                            </tr>
                            </thead>
                            <tbody>
                            {labTests.map((test, index) => (
                                <tr key={test.testId} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">{test.testName}</td>
                                    <td className="py-3 px-6">{test.status}</td>
                                    <td className="py-3 px-6">{test.result}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LabShowLabTests;
