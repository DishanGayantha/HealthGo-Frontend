import IBed from "@/types/Bed";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import WHSidebar from "./WHSidebar";
import { FaBell} from "react-icons/fa";

function WardBeds() {
  const { id } = useParams<{ id: string }>();
  const [beds, setBeds] = useState<IBed[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchBeds = async () => {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/beds/${id}`
        );
        setBeds(response.data);
      };

      fetchBeds();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const emptyBed = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/beds/empty/${id}`
      );

      if (response) {
        enqueueSnackbar("Bed is empty", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-layout">
    {/* Sidebar */}
    <WHSidebar/>

    {/* Main content on the screen */}
    <main className="main-content">

    {/* First Part */}  
    <header className="header">
        {/* Header Left Side */}
        <div className="header-left">
          <div className="user-info">
            <h2 className="text-3xl font-semibold">Assign To Ward Bed</h2>
          </div>
        </div>

        {/* Header Left Side */}
        <div className="header-right flex items-center">
          <button className="notification-icon mr-4">
            <FaBell size={18} />
          </button>
          <img  className="profile-image" alt="Doctor" />
        </div>
      </header>

      <div className="dashboard-container">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center text-xl font-semibold text-gray-700">Loading...</div>
          ) : (
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="py-3 px-6 text-gray-700 font-semibold">Bed No</th>
                  <th className="py-3 px-6 text-gray-700 font-semibold">Status</th>
                  <th className="py-3 px-6 text-gray-700 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {beds.map((bed, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`font-semibold ${
                          bed.status === "AVAILABLE" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {bed.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => emptyBed(bed.bedId)}
                        disabled={bed.status === "AVAILABLE"}
                        className={`px-4 py-2 rounded transition duration-200 text-white ${
                          bed.status === "AVAILABLE"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        Empty
                      </button>
                      <Link to={`/wards/addToBed/${bed.bedId}`}>
                        <button className="px-4 py-2 rounded ml-2 bg-green-600 text-white hover:bg-green-700 transition duration-200">
                          Add a Patient
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </main>
  </div>
  );
}

export default WardBeds;
