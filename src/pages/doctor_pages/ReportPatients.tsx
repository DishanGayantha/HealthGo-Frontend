import React, { useEffect, useState } from "react";
import DocSidebar from './DocSidebar';
import { Bar } from "react-chartjs-2";
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

const ReportPatients: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<IPatient[]>([]);
  
  const location = useLocation();
  const doctor = location.state?.doctor;
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor) {
        console.error("No valid doctor ID found");
        return;
      }
  
      try {
        const response = await fetch(`${config.backend_url}/api/patients/{patientId}/appointments/doctor/${doctor.id}`);
        if (!response.ok) {
          throw new Error(`Error fetching appointments: ${response.statusText}`);
        }
        const data = await response.json();
        setAppointments(data);
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

  const uniqueHospitals = Array.from(new Set(appointments.map(appointment => appointment.hospitalId))).length;
  const uniquePatients = Array.from(new Set(appointments.map(appointment => appointment.patientId))).length;
  const completedAppointments = appointments.filter(appointment => appointment.paymentStatus === PaymentStatus.COMPLETED).length;
  const pendingAppointments = appointments.filter(appointment => appointment.paymentStatus === PaymentStatus.PENDING).length;
  const failedAppointments = appointments.filter(appointment => appointment.paymentStatus === PaymentStatus.FAILED).length;
  const upcomingAppointments = appointments.filter(appointment => new Date(appointment.date) > new Date()).length;
  const averageAppointmentsPerHospital = uniqueHospitals ? (appointments.length / uniqueHospitals).toFixed(2) : "0";

  // Appointments per Hospital
  const appointmentsPerHospital = hospitals.map(hospital => {
    const count = appointments.filter(appointment => appointment.hospitalId === hospital.hospitalId).length;
    return { hospital: hospital.hospitalName, count };
  });

  // Upcoming Appointments Graph
  const upcomingAppointmentsData = upcomingAppointments > 0 ? {
    labels: ["Upcoming"],
    datasets: [
      {
        label: "Upcoming Appointments",
        data: [upcomingAppointments],
        backgroundColor: ["#2196F3"],
      },
    ],
  } : null;

  // Appointments per Hospital Graph
  const hospitalData = {
    labels: appointmentsPerHospital.map(h => h.hospital),
    datasets: [
      {
        label: "Appointments per Hospital",
        data: appointmentsPerHospital.map(h => h.count),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <DocSidebar />

      {/* Main content on the screen */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Doctor Summary</h2>
            </div>
          </div>

          <div className="header-right flex items-center">
            <img src={docprofile} className="profile-image" alt="Doctor" />
          </div>
        </header>

        {/* Summary Section */}
        <section className="summary-section mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Summary Cards */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Assigned Hospitals</h3>
              <p className="text-2xl">{uniqueHospitals}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Current Patients</h3>
              <p className="text-2xl">{uniquePatients}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Total Appointments</h3>
              <p className="text-2xl">{appointments.length}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Upcoming Appointments</h3>
              <p className="text-2xl">{upcomingAppointments}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Avg Appointments per Hospital</h3>
              <p className="text-2xl">{averageAppointmentsPerHospital}</p>
            </div>
          </div>
        </section>

    
        {/* Appointments per Hospital Section */}
        <section className="mt-8">
          <h3 className="text-xl font-bold mb-4">Appointments per Hospital</h3>
          <div className="bg-white shadow-lg rounded-lg p-6">
            {hospitalData.labels.length > 0 ? (
              <Bar data={hospitalData} />
            ) : (
              <p className="text-gray-600">No appointment data to display.</p>
            )}
          </div>
        </section>

        {/* Graph Section */}
        <section className="mt-8">
          <h3 className="text-xl font-bold mb-4">Upcoming Appointments Overview</h3>
          {upcomingAppointmentsData ? (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Bar data={upcomingAppointmentsData} />
            </div>
          ) : (
            <p className="text-gray-600">No upcoming appointments to display.</p>
          )}
        </section>

        
      </main>
    </div>
  );
}

export default ReportPatients;
