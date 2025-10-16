import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase"; // Adjust according to your setup
import { collection, getDocs } from "firebase/firestore";
import Modal from "react-modal";
import UploadReportForm from "./UploadReportForm"; // Import UploadReportForm
import { toast } from "react-toastify";

const ReportsTable = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "labTasks"));
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
        toast.error("Failed to fetch tasks.");
      }
    };

    fetchTasks();
  }, []);

  const handleOpenUploadForm = (task) => {
    setSelectedTask(task);
    setIsUploadFormOpen(true);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 p-4">Email</th>
            <th className="border-b-2 border-gray-300 p-4">Test Type</th>
            <th className="border-b-2 border-gray-300 p-4">Due Date</th>
            <th className="border-b-2 border-gray-300 p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border-b border-gray-300 p-4">{task.email}</td>
              <td className="border-b border-gray-300 p-4">{task.testType}</td>
              <td className="border-b border-gray-300 p-4">{task.dueDate}</td>
              <td className="border-b border-gray-300 p-4">
                {task.reportUploaded ? (
                  <span className="text-green-500">Finished</span>
                ) : (
                  <button
                    onClick={() => handleOpenUploadForm(task)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Upload Report
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Upload Report Form */}
      <Modal
        isOpen={isUploadFormOpen}
        onRequestClose={() => setIsUploadFormOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          {selectedTask && (
            <UploadReportForm task={selectedTask} onClose={() => setIsUploadFormOpen(false)} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ReportsTable;
