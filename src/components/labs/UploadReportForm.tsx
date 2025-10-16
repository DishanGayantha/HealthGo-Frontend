import React, { useState } from "react";
import { db } from "../../firebase/firebase"; // Adjust according to your setup
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UploadReportForm = ({ task, onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const fileName = `${file.name}_${task.email}_${new Date().toISOString().split("T")[0]}`;

    // Upload the file to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `reports/${fileName}`);

    try {
      // Upload the file
      await uploadBytes(storageRef, file);
      const reportLink = await getDownloadURL(storageRef); // Get the download URL

      // Update the task in Firestore
      const taskRef = doc(db, "labTasks", task.id);
      await updateDoc(taskRef, {
        reportUploaded: true,
        reportFileName: fileName,
        reportLink, // Store the report link
      });

      toast.success(`Report for ${task.testType} uploaded successfully!`);
      onClose(); // Close the upload form
    } catch (error) {
      console.error("Error uploading report: ", error);
      toast.error("Failed to upload report.");
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Upload Report for {task.testType}</h2>
      <p className="text-gray-700 mb-4">User Email: {task.email}</p>

      <div>
        <label className="block text-gray-700">Select Report File</label>
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
      >
        Upload Report
      </button>
      <button
        type="button"
        onClick={onClose}
        className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
      >
        Cancel
      </button>
    </form>
  );
};

export default UploadReportForm;
