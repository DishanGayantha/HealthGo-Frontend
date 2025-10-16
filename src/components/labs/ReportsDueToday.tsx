import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportsDueToday = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/tasks?userId=${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Tasks Due Today</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Report Type</th>
              <th className="border border-gray-300 p-2">Due Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length > 0 ? (
              currentTasks.map((task) => (
                <tr key={task.id} className="border border-gray-300">
                  <td className="border border-gray-300 p-2">{task.reportType}</td>
                  <td className="border border-gray-300 p-2">{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">
                    <button className="text-blue-500 hover:underline">
                      Upload
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="border border-gray-300 p-2 text-center">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 border border-gray-300 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportsDueToday;
