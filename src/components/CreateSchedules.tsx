import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment"; // For generating and formatting dates

const CreateSchedules = () => {
  const [clinics, setClinics] = useState([]);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = localStorage.getItem("userProfile");
      if (profile) {
        const email = JSON.parse(profile).email;
        try {
          const response = await axios.get(
            `http://localhost:8080/api/patients/email/${email}`
          );
          setPatientId(response.data.id);
          fetchClinics(response.data.id);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to fetch user profile.");
        }
      } else {
        toast.error("No user profile found in local storage.");
      }
    };

    const fetchClinics = async (patientId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/clinics/patient/${patientId}`
        );
        setClinics(response.data);
      } catch (error) {
        console.error("Error fetching clinics: ", error);
        toast.error("Failed to fetch clinics.");
      }
    };

    fetchUserProfile();
  }, []);

  // Generate a random time between today and 90 days from now
  const generateRandomTime = () => {
    const startDate = moment(); // Today
    const endDate = moment().add(90, "days"); // 90 days from today
    const randomDate = moment(startDate + Math.random() * (endDate - startDate));
    return randomDate.format("MMMM Do, YYYY h:mm A");
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-gray-100 rounded-lg">
      <h1 className="text-3xl w-full font-bold text-left mb-6">Available Clinics</h1>
      {clinics.length === 0 ? (
        <p className="text-center text-gray-600">No clinics available for this patient.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map((clinic) => (
            <div key={clinic.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {clinic.clinicName}
              </h3>
              <p className="text-gray-700">
                <strong>Doctor:</strong> {clinic.doctor.name}
              </p>
              <p className="text-gray-700">
                <strong>Hospital:</strong> {clinic.hospital.hospitalName}
              </p>
              <p className="text-gray-700">
                <strong>Number of Patients:</strong> {clinic.patients.length}
              </p>

              {/* Random Time */}
              <p className="mt-4 text-sm text-gray-500 italic">
                <strong>Next Available Schedule:</strong> {generateRandomTime()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateSchedules;
