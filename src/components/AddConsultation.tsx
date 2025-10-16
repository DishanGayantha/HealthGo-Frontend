import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal"; // Import modal package
import moment from "moment"; // Import moment for date validation

const AddConsultation: React.FC = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("payNow");
  const [patientId, setPatientId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const fetchAppointments = async (patientId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/patients/${patientId}/appointments`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments.");
    }
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/hospitals");
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        toast.error("Failed to fetch hospitals.");
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to fetch doctors.");
      }
    };

    const fetchUserProfile = async () => {
      const profile = localStorage.getItem("userProfile");
      if (profile) {
        const email = JSON.parse(profile).email;
        try {
          const response = await axios.get(
            `http://localhost:8080/api/patients/email/${email}`
          );
          setPatientId(response.data.id);
          fetchAppointments(response.data.id); // Fetch appointments for the patient
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to fetch user profile.");
        }
      } else {
        toast.error("No user profile found in local storage.");
      }
    };

    const fetchAppointments = async (patientId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/patients/${patientId}/appointments`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments.");
      }
    };

    fetchHospitals();
    fetchDoctors();
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      toast.error("Patient ID is not available. Please try again.");
      return;
    }

    // Prepare appointment data
    const appointmentData = {
      doctorId: selectedDoctor,
      hospitalId: selectedHospital,
      date: appointmentDate,
      time: appointmentTime,
      isPaid: paymentMethod === "payNow",
    };

    try {
      // Send appointment data to API
      await axios.post(
        `http://localhost:8080/api/patients/${patientId}/appointments`,
        appointmentData
      );
      toast.success("Appointment created successfully!");
      fetchAppointments(patientId); // Refresh appointments after successful creation
      closeModal(); // Close modal after submission
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment.");
    }
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm(); // Reset form fields on close
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedHospital("");
    setSelectedDoctor("");
    setAppointmentDate("");
    setAppointmentTime("");
    setPaymentMethod("payNow");
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Add Consultation</h1>

      {/* Button to open modal */}
      <button
        onClick={openModal}
        className="mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Make an Appointment
      </button>

      {/* Appointment Table */}
      <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Time</th>
            <th className="py-2 px-4 border">Doctor</th>
            <th className="py-2 px-4 border">Hospital</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const appointmentDateTime = moment(
              `${appointment.date} ${appointment.time}`
            );
            const isPast = appointmentDateTime.isBefore(moment());

            return (
              <tr key={appointment.appointmentId} style={{ backgroundColor: isPast ? "#f8d7da" : "#d4edda" }}>
                <td className="py-2 px-4 border">{appointment.date}</td>
                <td className="py-2 px-4 border">{appointment.time}</td>
                <td className="py-2 px-4 border">
                  {doctors.find((doc) => doc.id === appointment.doctorId)?.name || "N/A"}
                </td>
                <td className="py-2 px-4 border">
                  {hospitals.find((hos) => hos.hospitalId === appointment.hospitalId)?.hospitalName || "N/A"}
                </td>
                <td className="py-2 px-4 border">{isPast ? "Past" : "Upcoming"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for Adding Appointment */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} ariaHideApp={false}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Make an Appointment</h2>
          <form onSubmit={handleSubmit}>
            {/* Hospital Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Choose Hospital:</label>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.hospitalId} value={hospital.hospitalId}>
                    {hospital.hospitalName}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Choose Doctor:</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Date */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Date:</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
                min={moment().format("YYYY-MM-DD")} // Prevent past dates
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /> </div>
                        {/* Appointment Time */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Time:</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
      <button onClick={closeModal} className="mt-4 text-red-500 underline">Close</button>
    </div>
  </Modal>

  <ToastContainer />
</div>
); };

export default AddConsultation;
