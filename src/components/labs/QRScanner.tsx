import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = ({ onScan }) => {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      onScan(data); // Trigger callback with scanned data
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
      <QrReader
        className="w-[250px] h-[250px]"
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result?.text); // Extract scanned text from result
          }
          if (!!error) {
            handleError(error);
          }
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default QRScanner;
