import { logOut } from "../firebase/auth";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { FaUserMd } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

interface SidebarProps {
  handleNavigationChoice: (choice: string) => void;
  activeChoice: string; // To highlight the active link
  onLogout?: () => void; // Optional callback after logout
}

const Sidebar: React.FC<SidebarProps> = ({ handleNavigationChoice, activeChoice, onLogout }) => {
  const navigate = useNavigate();
  const { logOutUser } = useAuthStore();

  const handleLogout = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      await logOut();            // Firebase sign out
      logOutUser();              // Clear local/Zustand state and localStorage
      if (onLogout) onLogout();  // Let parent hook additional logic if provided
      navigate("/");            // Redirect to login route
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <div className="w-64 min-h-screen bg-white shadow-lg flex flex-col justify-between">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-black mb-8">Logo</h1>

        {/* Navigation Menu */}
        <nav>
          <div className="space-y-2">
            {/* Dashboard */}
            <a
              href="#"
              className={`flex items-center p-2 text-gray-700 rounded-lg ${activeChoice === "dashboard" ? "bg-blue-100" : "hover:bg-blue-100"
                }`}
              onClick={() => handleNavigationChoice("dashboard")}
            >
              <AiOutlineDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </a>

            {/* Add Consultation */}
            <a
              href="#"
              className={`flex items-center p-2 text-gray-700 rounded-lg ${activeChoice === "add-consultation" ? "bg-blue-100" : "hover:bg-blue-100"
                }`}
              onClick={() => handleNavigationChoice("add-consultation")}
            >
              <FaUserMd className="w-5 h-5 mr-3" />
              Appointments
            </a>

            {/* Create Schedules */}
            <a
              href="#"
              className={`flex items-center p-2 text-gray-700 rounded-lg ${activeChoice === "create-schedules" ? "bg-blue-100" : "hover:bg-blue-100"
                }`}
              onClick={() => handleNavigationChoice("create-schedules")}
            >
              <AiOutlineCalendar className="w-5 h-5 mr-3" />
              Clinics
            </a>

            {/* View Health Reports */}
            <a
              href="#"
              className={`flex items-center p-2 text-gray-700 rounded-lg ${activeChoice === "view-health-reports" ? "bg-blue-100" : "hover:bg-blue-100"
                }`}
              onClick={() => handleNavigationChoice("view-health-reports")}
            >
              <HiOutlineDocumentReport className="w-5 h-5 mr-3" />
              View Health Reports
            </a>

            {/* Notification Panel */}
            {/* <a
              href="#"
              className={`flex items-center p-2 text-gray-700 rounded-lg ${
                activeChoice === "notification-panel" ? "bg-blue-100" : "hover:bg-blue-100"
              }`}
              onClick={() => handleNavigationChoice("notification-panel")}
            >
              <IoMdNotificationsOutline className="w-5 h-5 mr-3" />
              Notification Panel
              <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
            </a> */}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Account Section */}
          <div className="space-y-2">
            <h3 className="text-gray-500 uppercase text-sm mb-2">Account</h3>

            {/* Profile */}
            <a
              href="#"
              className={`flex items-center p-2 text-gray-700 rounded-lg ${activeChoice === "profile" ? "bg-blue-100" : "hover:bg-blue-100"
                }`}
              onClick={() => handleNavigationChoice("profile")}
            >
              <AiOutlineUser className="w-5 h-5 mr-3" />
              Profile
            </a>

            {/* Logout */}
            <button
              type="button"
              className="w-full text-left flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-lg"
              onClick={handleLogout}
            >
              <BiLogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Emergency Hotline */}
      <div className="p-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-blue-500 text-sm font-medium">
            Emergency Hotline:
          </p>
          <p className="text-black font-bold">+61 999 999 999</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
