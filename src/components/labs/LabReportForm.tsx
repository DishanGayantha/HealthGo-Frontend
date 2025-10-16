import React, { useEffect, useState } from "react";
import axios from "axios";
import { db } from "../../firebase/firebase"; // Adjust according to your setup
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const LabReportForm = ({ userData, onReportSubmit }) => {
  const [testType, setTestType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [email, setEmail] = useState(userData.email); // Use the email from the QR data

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testType || !dueDate) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      // Store report in Firestore
      await addDoc(collection(db, "labTasks"), {
        email,
        testType,
        dueDate,
        reportUploaded: false, // Initial state of reportUploaded
        createdAt: new Date().toISOString(),
      });

      toast.success("Task added successfully!");
      onReportSubmit(); // Close the popup after successful submission
    } catch (error) {
      console.error("Error adding task: ", error);
      toast.error("Failed to add task.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add Lab Report Task</h2>
      <p className="text-gray-700 mb-4">User: {userData.name} (Email: {email})</p>

      <div>
        <label className="block text-gray-700">Test Type</label>
        <input
          type="text"
          value={testType}
          onChange={(e) => setTestType(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default LabReportForm;
