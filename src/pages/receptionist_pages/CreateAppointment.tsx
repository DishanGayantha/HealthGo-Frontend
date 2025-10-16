import IDoctor from "@/types/doctor";
import axios from "axios";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecepSidebar from "./RecepSidebar";
import receppro from '../../assets/images/recep/recepprofilepic.png'
import { FaBell, FaSearch } from "react-icons/fa";

const CreateAppointment = () => {

  /* patient id */  
  const { id } = useParams<{ id: string }>();

  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("payNow");
  const navigate = useNavigate();
  const hospital = "67102b30c5c477743962a815";

  useEffect(() => {
    try {
      const fetchDoctor = async () => {
        const response = await axios.get("http://localhost:8080/api/doctors/");
        if (response) {
          setDoctors(response.data);
        }
      };
      fetchDoctor();
    } catch (error) {
      console.log(error);
    }
  }, []);


  const handleSubmitAppointment = async () => {
    try {
        const response = await axios.post(`http://localhost:8080/api/patients/${id}/appointments`, {
            doctorId : selectedDoctor,
            hospitalId : hospital,
            date : date,
            time : time,
            isPaid: paymentMethod === "payNow",
        })

        if(response) {
            enqueueSnackbar("Appointment added successfully", { variant: "success" });
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
            <h2 className="text-2xl font-semibold mb-4 text-center">Book an Appointment</h2>

            <form onSubmit={handleSubmitAppointment} className="space-y-4">

              {/* Doctor Selecting */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Choose Doctor:</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Doctor</option>
                  {/* Replace with your doctors data */}
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selecting */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={moment().format("YYYY-MM-DD")} // Prevent past dates
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Time Selecting */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Time:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Payment Method:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="payNow">Pay Now</option>
                  <option value="payLater">Pay Later</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-green-600 p-2 px-8 rounded-lg text-white font-semibold hover:bg-green-700 transition duration-300"
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAppointment;
