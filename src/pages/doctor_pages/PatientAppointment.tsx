import React, { useEffect, useState } from "react";
import DocSidebar from './DocSidebar';
import { FaBell, FaSearch } from "react-icons/fa";
import docprofile from '../../assets/images/doctor/docaimg.png';
import { useLocation } from "react-router-dom";
import config from "../../constants/config";
import IPatient from "@/types/patient";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Appointment {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  date: string;
  time: string;
  type: "public" | "private"; 
  paymentStatus: PaymentStatus; 
  isPaid: boolean;   
}

enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}

interface Hospital {
  hospitalId: string;
  hospitalName: string;
  hospitalEmail: string;
  area: string;
  contactNumber: string;
  hospitalType: string;
  imageUrl: string;
}

const PatientAppointment: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentAppointments, setCurrentAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const location = useLocation();
  const doctor = location.state?.doctor;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor) {
        console.error("No valid patient ID found");
        return;
      }

      try {
        const response = await fetch(`${config.backend_url}/api/patients/{patientId}/appointments/doctor/${doctor.id}`);
        if (!response.ok) {
          throw new Error(`Error fetching appointments: ${response.statusText}`);
        }
        const data = await response.json();
        setAppointments(data);
        setCurrentAppointments(data); // Initialize current appointments
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, [doctor]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/patients/");
        setPatients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await fetch(`${config.backend_url}/api/hospitals`);
      const data = await response.json();
      setHospitals(data);
    };
    fetchHospitals();
  }, []);

  // Filter appointments based on search query and selected date
  useEffect(() => {
    const filteredAppointments = appointments.filter(appointment => {
      const patient = patients.find(p => p.id === appointment.patientId);
      const matchesSearchQuery = searchQuery ? patient?.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      const matchesSelectedDate = selectedDate ? appointment.date === selectedDate : true;

      return matchesSearchQuery && matchesSelectedDate;
    });
    setCurrentAppointments(filteredAppointments);
  }, [searchQuery, selectedDate, appointments, patients]);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <DocSidebar />

      {/* Main content on the screen */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Patient Appointments</h2>
            </div>
          </div>

          <div className="header-right flex items-center">
            <input
              type="text"
              placeholder="Search by Patient Name..."
              className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute mt-0.7 ml-4 text-gray-500">
              <FaSearch size="15px" />
            </div>

            <button className="notification-icon mr-4">
              <FaBell size={18} />
            </button>

            <img src={docprofile} className="profile-image" alt="Doctor" />
          </div>
        </header>

        {/* Date Filter */}
        <div className="mt-4 flex justify-between items-center">
          <label className="mr-2">Select Appointment Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="h-10 rounded-full px-10 border border-gray-300"
          />
        </div>

        <div className='dashboard-container'>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentAppointments.map((appointment) => {
              // Find the corresponding patient
              const patient = patients.find(p => p.id === appointment.patientId);
              // Find the corresponding hospital
              const hospital = hospitals.find(h => h.hospitalId === appointment.hospitalId);

              return (
                <div
                  key={appointment.appointmentId}
                  className="relative bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
                >
                  {/* Left Part - Patient and Appointment Info */}
                  <div className="flex flex-col space-y-1.5">
                    {patient && (
                      <h3 className="text-xl font-bold">{patient.name}</h3>
                    )}
                    <p className="text-sm font-semibold text-black">Hospital: {hospital ? hospital.hospitalName : 'N/A'}</p>
                    <p className="text-sm font-semibold text-black">Appointment Date: {appointment.date}</p>
                    <p className="text-sm font-semibold text-black">Appointment Time: {appointment.time}</p>
                  </div>

                  {/* Actions - Positioned to the right corner */}
                  <div className="absolute bottom-6 right-6">
                    <button
                      onClick={() => {
                        navigate('/single-appointment', {
                          state: { appointment, patient, hospital }, 
                        });
                      }}
                      className="px-8 py-2 bg-green-500 text-white rounded-sm shadow text-center hover:bg-green-800 mb-8"
                    >
                      View Info
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientAppointment;
