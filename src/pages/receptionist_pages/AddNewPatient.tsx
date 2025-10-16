import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecepSidebar from "./RecepSidebar";
import receppro from '../../assets/images/recep/recepprofilepic.png'
import { FaBell, FaSearch } from "react-icons/fa";

const AddNewPatient = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [emergencyDial, setEmergencyDial] = useState<string>("");
  const profileImage = "/dummy-profile.png";
  const userType = "patient";
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents form from refreshing the page
    try {
      const newPatient = {
        name,
        email,
        password, 
        address,
        age,
        gender,
        contactNumber,
        emergencyDial,
        userType, 
        profileImage,
      };
      console.log("New Patient Data:", newPatient);

      const response = await axios.post(
        "http://localhost:8080/api/patients",
        newPatient
      );

      if (response) {
        enqueueSnackbar("Patient added to the clinic successfully", {
          variant: "success",
        });
        navigate("/recep-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Add New Patient</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Age:</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Gender:</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full h-20" // Increased height
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Contact Number:</label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Emergency Dial:</label>
                  <input
                    type="tel"
                    value={emergencyDial}
                    onChange={(e) => setEmergencyDial(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-1/2 mt-4 bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
              >
                Add Patient
              </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddNewPatient;
