import React, { useEffect, useState } from "react";
import MinistrySidebar from "../MinistrySidebar.tsx";
import { FaEdit, FaFolderMinus, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../constants/config";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
interface Hospital {
  hospitalId: string;
  hospitalName: string;
  hospitalEmail: string;
  area: string;
  contactNumber: string;
  hospitalType: string;
}

const ManageHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hospitalsPerPage] = useState(10);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [deleteHospitalId, setDeleteHospitalId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await fetch(`${config.backend_url}/api/hospitals`);
      const data = await response.json();
      setHospitals(data);
      setTotalHospitals(data.length);
    };
    fetchHospitals();
  }, []);

  const confirmDelete = (hospitalId: string) => {
    setDeleteHospitalId(hospitalId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deleteHospitalId) {
      try {
        const response = await fetch(
          `${config.backend_url}/api/hospitals/${deleteHospitalId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setHospitals(
            hospitals.filter(
              (hospital) => hospital.hospitalId !== deleteHospitalId
            )
          );
          setShowDeleteModal(false);
        } else {
          alert("Failed to delete hospital.");
        }
      } catch (error) {
        console.error("Error deleting hospital:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;

  // Filter hospitals based on the search query
  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.hospitalType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentHospitals = filteredHospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );
  const totalFilteredHospitals = filteredHospitals.length; // Update total hospitals count based on search

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatHospitalType = (type: string): string => {
    return type
      .split("_") // Split by underscore
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
      .join(" "); // Join back to a single string
  };

  return (
    <div className="dashboard-layout">
      <MinistrySidebar />
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Manage Hospitals</h2>
            </div>
          </div>
          <div className="header-right flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery} // Bind the input value to the searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
            />
            <div className="absolute mt-0.7 ml-4 text-gray-500">
              <FaSearch size="15px" />
            </div>
            <button className="h-10 pl-15 bg-green-600 text-white pr-15 rounded-full shadow-sm w-full border border-gray-300">
              <Link to="/add-hospital">+ Add Hospital</Link>
            </button>
          </div>
        </header>

        <div className="mt-6 overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold uppercase">
                  Hospital Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase">
                  Area
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase">
                  Contact Number
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase">
                  Type
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentHospitals.map((hospital, idx) => (
                <tr
                  key={hospital.hospitalId}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-100 transition duration-200 ease-in-out`}
                >
                  <td className="border-t border-gray-300 px-6 py-4 text-sm">
                    {hospital.hospitalName}
                  </td>
                  <td className="border-t border-gray-300 px-6 py-4 text-sm">
                    {hospital.hospitalEmail}
                  </td>
                  <td className="border-t border-gray-300 px-6 py-4 text-sm">
                    {hospital.area}
                  </td>
                  <td className="border-t border-gray-300 px-6 py-4 text-sm">
                    {hospital.contactNumber}
                  </td>
                  <td className="border-t border-gray-300 px-6 py-4 text-sm">
                    {formatHospitalType(hospital.hospitalType)}
                  </td>
                  <td className="border-t border-gray-300 px-6 py-4 text-sm">
                    <div className="flex space-x-4">
                      {/* Update Button */}
                      <button
                        onClick={() =>
                          navigate(`/update-hospital/${hospital.hospitalId}`)
                        }
                        className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
                        title="Update Hospital"
                      >
                        <FaEdit className="mr-1" size="16px" />
                        <span>Update</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => confirmDelete(hospital.hospitalId)}
                        className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-150 ease-in-out"
                        title="Delete Hospital"
                      >
                        <FaFolderMinus className="mr-1" size="16px" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          {Array.from(
            { length: Math.ceil(totalFilteredHospitals / hospitalsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManageHospitals;
