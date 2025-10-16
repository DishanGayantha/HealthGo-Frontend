import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfilePage from "../components/Profile";
import DashboardDetails from "../components/DashboardDetails"; // Your dashboard details component
import AddConsultation from "../components/AddConsultation";  // Replace with your actual components
import CreateSchedules from "../components/CreateSchedules";
import ViewHealthReports from "../components/ViewHealthReports";
import NotificationPanel from "../components/NotificationPanel";
const Dashboard: React.FC = () => {
  const [navigationChoice, setNavigationChoice] = useState("dashboard");

  const handleNavigationChoice = (choice: string) => {
    setNavigationChoice(choice);
  };

  // Conditionally render components based on navigation choice
  const renderSection = () => {
    switch (navigationChoice) {
      case "dashboard":
        return <DashboardDetails />;
      case "add-consultation":
        return <AddConsultation />;
      case "create-schedules":
        return <CreateSchedules />;
      case "view-health-reports":
        return <ViewHealthReports />;
      case "notification-panel":
        return <NotificationPanel />;
      case "profile":
        return <ProfilePage />;
      default:
        return <DashboardDetails />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Pass handleNavigationChoice to Sidebar */}
      <Sidebar handleNavigationChoice={handleNavigationChoice} activeChoice={navigationChoice} />
      <div className="flex-1 p-6">{renderSection()}</div>
    </div>
  );
};

export default Dashboard;
