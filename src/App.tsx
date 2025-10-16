import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { SnackbarProvider } from "notistack";
import LoginSignup from './pages/PatientLogin'
import Dashboard from './pages/PatientDashboard'
//import AdminLogin from './pages/AdminLogins'
import MinistryDashboard from './pages/ministry_pages/MinistryDashboard.tsx';
import ManageHospitals from "./pages/ministry_pages/hospitals/ManageHospitals.tsx";
import AddHospital from "./pages/ministry_pages/hospitals/AddHospital.tsx";
import UpdateHospital from "./pages/ministry_pages/hospitals/UpdateHospital.tsx";
import ManageDoctors from "./pages/ministry_pages/doctors/ManageDoctors.tsx";
import AddDoctor from "./pages/ministry_pages/doctors/AddDoctor.tsx";
import UpdateDoctor from "./pages/ministry_pages/doctors/UpdateDoctor.tsx";
import DoctorLogin from "./pages/ministry_pages/doctors/DoctorLogin.tsx";
import LabManage from "./pages/lab_tech_pages/LabManage";
import AssignedHospital from "./pages/doctor_pages/AssignedHospital";
import RoomAllocation from "./pages/doctor_pages/RoomAllocation";
import PatientAppointment from "./pages/doctor_pages/PatientAppointment";
import DocDashboard from "./pages/doctor_pages/DocDashboard";
import HMDashboard from "./pages/healthcare_manager_pages/HMDashboard.tsx";
import AllWard from "./pages/healthcare_manager_pages/AllWard.tsx";
import AllLabTech from "./pages/healthcare_manager_pages/AllLabTech.tsx";
import AllReceptionist from "./pages/healthcare_manager_pages/AllReceptionist.tsx";
import AllWardRooms from "./pages/healthcare_manager_pages/AllWardRooms.tsx";
import AllLabRooms from "./pages/healthcare_manager_pages/AllLabRooms.tsx";
import ManageOperations from "./pages/healthcare_manager_pages/ManageOperations.tsx";
import WHDashboard from "./pages/wardhead_pages/WHDashboard.tsx";
import WHManagePatients from "./pages/wardhead_pages/WHManagePatients.tsx";
import RecepDashboard from "./pages/receptionist_pages/RecepDashboard.tsx";
import WardRoom from "./pages/wardhead_pages/WardRoom.tsx";
import WardBeds from "./pages/wardhead_pages/WardBeds.tsx";
import AddToBed from "./pages/wardhead_pages/AddToBed.tsx";
import AddWard from "./pages/wardhead_pages/AddWard.tsx";
import ViewClinic from "./pages/receptionist_pages/ViewClinic.tsx";
import AddToClinic from "./pages/receptionist_pages/AddToClinic.tsx";
import ViewPatient from "./pages/receptionist_pages/ViewPatient.tsx";
import AddNewClinic from "./pages/receptionist_pages/AddNewClinic.tsx";
import SuperAdminLogin from "@/pages/ministry_pages/SuperAdminLogin.tsx";
import LabTechDashboard from "./components/labs/LabTechDashboard.tsx";
import PatientsForAppointments from "./pages/receptionist_pages/PatientsForAppointments.tsx";
import CreateAppointment from "./pages/receptionist_pages/CreateAppointment.tsx";
import AddNewPatient from "./pages/receptionist_pages/AddNewPatient.tsx";
import ManagePatient from "./pages/receptionist_pages/ManagePatient.tsx";
import UpdatePatient from "./pages/receptionist_pages/UpdatePatient.tsx";
import SingleAppointmentView from "./pages/doctor_pages/SingleAppointmentView.tsx";
import ReportPatients from "./pages/doctor_pages/ReportPatients.tsx";
import DoctorProfile from "./pages/doctor_pages/DoctorProfile.tsx";
import LabTechLogin from "./pages/lab_tech_pages/LabTechLogin.tsx";
import LabTechProfile from "./pages/lab_tech_pages/LabTechProfile.tsx";
import LabShowPatients from "./pages/lab_tech_pages/LabShowPatients.tsx";
import LabShowLabTests from "./pages/lab_tech_pages/LabShowLabTests.tsx";
import LabTechAssinOperations from "./pages/lab_tech_pages/LabTechAssinOperations.tsx";

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
          <Route path="/labtech" element={<LabTechDashboard />} />

          {/* Ministry Routes - dashboard */}
          <Route path='/ministry-dashboard' element={<MinistryDashboard />} />
          <Route path="/super-admin-login" element={<SuperAdminLogin />} />
          {/* Ministry Routes - hospitals */}
          <Route path='/manage-hospitals' element={<ManageHospitals />} />
          <Route path='/add-hospital' element={<AddHospital />} />
          <Route path="/update-hospital/:id" element={<UpdateHospital />} />
          {/* Ministry Routes - doctors */}
          <Route path='/manage-doctors' element={<ManageDoctors />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path="/update-doctor/:id" element={<UpdateDoctor />} />

          {/* Lab Tech Routes */}
          <Route path='/labt-login' element={<LabTechLogin />} />
          <Route path="/lab-manage" element={<LabManage />} />
          <Route path="/labt-profile" element={<LabTechProfile />} />
          <Route path="/labshow-patients" element={<LabShowPatients />} />
          <Route path="/labshow-labtests" element={<LabShowLabTests />} />
          <Route path="/lab-assign-op" element={<LabTechAssinOperations />} />

          {/* Doctor Routes */}
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doc-dashboard" element={<DocDashboard />} />
          <Route path="/asigned-hos" element={<AssignedHospital />} />
          <Route path="/room-allocation" element={<RoomAllocation />} />
          <Route path="/patient-appointment" element={<PatientAppointment />} />
          <Route path="/single-appointment" element={<SingleAppointmentView />} />
          <Route path='/patient-report' element={<ReportPatients />} />
          <Route path='/doct-profile' element={<DoctorProfile />} />

          {/* Healthcare Manager Routes */}
          <Route path="/hcm-dashboard" element={<HMDashboard />} />
          <Route path="/all-wardinfo" element={<AllWard />} />
          <Route path="/add-labinfo" element={<AllLabTech />} />
          <Route path="/all-receptionistinfo" element={<AllReceptionist />} />
          <Route path="/all-wardroomsinfo" element={<AllWardRooms />} />
          <Route path="/all-labroomsinfo" element={<AllLabRooms />} />
          <Route path="/all-operations" element={<ManageOperations />} />

          {/* Ward Head Routes */}
          <Route path="/wh-dashboard" element={<WHDashboard />} />
          <Route path="/wh-mpatients" element={<WHManagePatients />} />
          <Route path="/wards" element={<WardRoom />} />
          <Route path="/wards/room/:id" element={<WardBeds />} />
          <Route path="/wards/addToBed/:id" element={<AddToBed />} />
          <Route path="/wards/create" element={<AddWard />} />

          {/* Receptionist Routes */}
          <Route path="/recep-dashboard" element={<RecepDashboard />} />
          <Route path="/clinics" element={<ViewClinic />} />
          <Route path="/add-to-clinic/:id" element={<AddToClinic />} />
          <Route path="/patient/:id" element={<ViewPatient />} />
          <Route path="/add-clinic" element={<AddNewClinic />} />

          {/*Rusiru please check thess, only have to do the designs :) god bless! */}
          <Route path="/patients-for-appointments" element={<PatientsForAppointments />} />
          <Route path="/create-appointment/:id" element={<CreateAppointment />} />
          <Route path="/create-patient" element={<AddNewPatient />} />
          <Route path="/manage-patients" element={<ManagePatient />} />
          <Route path="/update-patients/:id" element={<UpdatePatient />} />

        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
