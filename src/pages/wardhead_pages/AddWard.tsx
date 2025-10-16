import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import WHSidebar from "./WHSidebar";

function AddWard() {
  const hospital = "67102b30c5c477743962a815";
  const [wardNo, setWardNo] = useState<number>();
  const [beds, setBeds] = useState<number>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (wardNo === undefined || wardNo < 1) {
        enqueueSnackbar("Please enter a valid Ward No (1 or greater)", {
          variant: "error",
        });
        return;
      }
      if (beds === undefined || beds < 1) {
        enqueueSnackbar("Please enter a valid number of beds (1 or greater)", {
          variant: "error",
        });
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/wards/create",
        {
          hospitalId: hospital,
          wardNo: wardNo,
          beds: beds,
        }
      );

      if (response) {
        enqueueSnackbar("Ward added successfully", { variant: "success" });
        navigate("/wards");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-layout">
    {/* Sidebar */}
    <WHSidebar/>

    {/* Main content on the screen */}
    <main className="main-content">

    {/* First Part */}  
    <header className="header">
        {/* Header Left Side */}
        <div className="header-left">
          <div className="user-info">
            <h2 className="text-3xl font-semibold">Available Clinics</h2>
          </div>
        </div>

        {/* Header Left Side */}
        <div className="header-right flex items-center">
          <button className="notification-icon mr-4">
            <FaBell size={18} />
          </button>
          <img  className="profile-image" alt="Doctor" />
        </div>
      </header>

      <div className="dashboard-container">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add Ward Details</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-semibold mb-2">
              Ward No
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setWardNo(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-semibold mb-2">
              Number of Beds
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setBeds(Number(e.target.value))}
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}

export default AddWard;
