import React, { useState } from "react";
import QRScanner from "./QRScanner"; // Ensure you have the QRScanner component
import LabReportForm from "./LabReportForm";
import ReportsTable from "./ReportsTable";
import Modal from "react-modal";

const LabTechDashboard = () => {
  const [scannedUserData, setScannedUserData] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleScan = (data) => {
    const parsedData = JSON.parse(data);
    setScannedUserData(parsedData);
    setIsScannerOpen(false); // Close scanner when data is scanned
    setIsFormOpen(true); // Open form popup
  };

  const handleReportSubmit = () => {
    setScannedUserData(null);
    setIsFormOpen(false); // Close form popup after submission
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Lab Technician Dashboard</h1>

      <div className="flex justify-center mb-6">
        {!isScannerOpen && (
          <button
            onClick={() => setIsScannerOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
          >
            Scan QR Code
          </button>
        )}
      </div>

      {isScannerOpen && <QRScanner onScan={handleScan} />}

      {/* Modal for Lab Report Form */}
      <Modal isOpen={isFormOpen} onRequestClose={() => setIsFormOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          {scannedUserData && (
            <LabReportForm userData={scannedUserData} onReportSubmit={handleReportSubmit} />
          )}
        </div>
      </Modal>

      <ReportsTable />
    </div>
  );
};

export default LabTechDashboard;
