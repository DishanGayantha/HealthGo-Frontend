import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const DashboardDetails = () => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const userEmail = userProfile?.email;
  const [appointments, setAppointments] = useState([]);
  const [todaysReports, setTodaysReports] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchAppointments = async (patientId) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/patients/${patientId}/appointments`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchTodaysReports = async () => {
      try {
        const reportsRef = collection(db, "labTasks");
        const q = query(reportsRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        const reportsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter reports for today's date
        const today = moment().format("YYYY-MM-DD");
        const filteredReports = reportsData.filter(report => moment(report.dueDate).format("YYYY-MM-DD") === today);
        setTodaysReports(filteredReports);
      } catch (error) {
        console.error("Error fetching reports: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPatientId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/patients/email/${userEmail}`);
        const patientId = response.data.id;
        fetchAppointments(patientId);
      } catch (error) {
        console.error("Error fetching patient ID:", error);
      }
    };

    fetchHospitals();
    fetchDoctors();
    fetchPatientId();
    fetchTodaysReports();
  }, [userEmail]);

  // Filter appointments for today and check for tomorrow's appointments
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, 'days').format("YYYY-MM-DD");
  const todaysAppointments = appointments.filter(appointment => moment(appointment.date).format("YYYY-MM-DD") === today);
  const tomorrowAppointments = appointments.filter(appointment => moment(appointment.date).format("YYYY-MM-DD") === tomorrow);

  // Store tomorrow's notifications in local storage
  if (tomorrowAppointments.length > 0) {
    localStorage.setItem('notifications', JSON.stringify(tomorrowAppointments));
  }

  if (loading) {
    return <p className="text-gray-500">Loading data...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">Dashboard</h2>
      <p className="text-lg text-center text-gray-700 mb-10">Welcome, {userProfile.name || "User"}</p>

      {/* Flexbox Layout for QR Code and Appointments */}
      <div className="flex flex-col md:flex-row md:space-x-6 mb-10">
        {/* QR Code */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 mb-6 md:mb-0">
          <h3 className="text-2xl font-semibold mb-4">Your QR Code</h3>
          <QRCodeSVG value={JSON.stringify(userProfile)} size={200} includeMargin={true} />
        </div>

        {/* Today's Appointments */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Today's Appointments</h3>
          {todaysAppointments.length === 0 ? (
            <p className="text-gray-600">No appointments scheduled for today.</p>
          ) : (
            <ul className="list-disc pl-5">
              {todaysAppointments.map((appointment) => {
                const doctor = doctors.find(doc => doc.id === appointment.doctorId);
                const hospital = hospitals.find(hosp => hosp.hospitalId === appointment.hospitalId);
                return (
                  <li key={appointment.appointmentId} className="mt-2 text-gray-700">
                    <span className="font-medium">{doctor ? doctor.name : "Unknown Doctor"}</span> at 
                    <span className="font-medium"> {hospital ? hospital.hospitalName : "Unknown Hospital"}</span> 
                    on <span className="font-medium">{appointment.date}</span> at <span className="font-medium">{appointment.time}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Today's Reports */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Today's Reports</h3>
        {todaysReports.length === 0 ? (
          <p className="text-gray-600">No reports due today.</p>
        ) : (
          <ul className="list-disc pl-5">
            {todaysReports.map((report) => (
              <li key={report.id} className="mt-2 text-gray-700">{report.testType} - Due: {report.dueDate}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardDetails;
