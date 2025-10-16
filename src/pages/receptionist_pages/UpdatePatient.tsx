import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecepSidebar from "./RecepSidebar";
import receppro from '../../assets/images/recep/recepprofilepic.png'
import { FaBell, FaSearch } from "react-icons/fa";

function UpdatePatient() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [emergencyDial, setEmergencyDial] = useState<string>("");
  const profileImage = "/dummy-profile.png";
  const userType = "patient";
  const navigate = useNavigate();

  useState(() => {
    try {
      const fetchPatient = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/patients/${id}`
          );
          if (response) {
            setName(response.data.name);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setAge(response.data.age);
            setGender(response.data.gender);
            setContactNumber(response.data.contactNumber);
            setEmergencyDial(response.data.emergencyDial);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchPatient();
    } catch (error) {
      console.log(error);
    }
  },[id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/patients/${id}`,
        {
          name,
          email,
          address,
          age,
          gender,
          contactNumber,
          emergencyDial,
          userType, 
          profileImage,
        }
      );
      if (response) {
        enqueueSnackbar("Patient updated successfully", {
          variant: "success",
        });
        navigate("/manage-patients");
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
              <h2 className="text-3xl font-semibold">Add New Clinic</h2>
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
            <img src={receppro} className="profile-image" alt="Doctor" />
          </div>
        </header>

        <div className="dashboard-container">
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Update Patient Information</h2>
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full h-20" // Increased height for better visibility
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

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-1/2 bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UpdatePatient;
