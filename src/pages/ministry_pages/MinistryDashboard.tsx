import React, { useEffect, useState, useRef } from 'react';
import MinistrySidebar from './MinistrySidebar.tsx';
import config from "../../constants/config";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register Chart.js components

interface Doctor {
  name: string;
  email: string;
  specialization: string;
  workingHospitals: string[];
}

interface Hospital {
  hospitalName: string;
  hospitalType: string; // Added type property
  area: string;
}

interface ChartData {
  name: string;
  value: number;
}

const DoctorDashboard: React.FC = () => {
  const [doctorStats, setDoctorStats] = useState({ total: 0, specializations: 0 });
  const [hospitalStats, setHospitalStats] = useState({ total: 0 });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctorChartData, setDoctorChartData] = useState<ChartData[]>([]);
  const [hospitalChartData, setHospitalChartData] = useState<ChartData[]>([]);
  const [doctorDistributionChartData, setDoctorDistributionChartData] = useState<ChartData[]>([]);
  const [hospitalAreaChartData, setHospitalAreaChartData] = useState<ChartData[]>([]);

  // Refs for chart instances
  const doctorChartRef = useRef<HTMLCanvasElement | null>(null);
  const hospitalChartRef = useRef<HTMLCanvasElement | null>(null);
  const doctorChartInstance = useRef<Chart | null>(null);
  const hospitalChartInstance = useRef<Chart | null>(null);
  const doctorDistributionChartRef = useRef<HTMLCanvasElement | null>(null);
  const doctorDistributionChartInstance = useRef<Chart | null>(null);
  const hospitalAreaChartRef = useRef<HTMLCanvasElement | null>(null);
  const hospitalAreaChartInstance = useRef<Chart | null>(null);


  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${config.backend_url}/api/doctors/`);
        const data: Doctor[] = await response.json();
        setDoctors(data);

        // Specialization count
        const specializationCount = new Map<string, number>();
        data.forEach((doctor) => {
          const specialization = doctor.specialization;
          specializationCount.set(specialization, (specializationCount.get(specialization) || 0) + 1);
        });

        const doctorData: ChartData[] = Array.from(specializationCount, ([name, value]) => ({ name, value }));
        setDoctorChartData(doctorData);
        setDoctorStats({ total: data.length, specializations: specializationCount.size });

        // Doctor distribution by hospital
        const hospitalDoctorCount = new Map<string, number>();
        data.forEach((doctor) => {
          doctor.workingHospitals.forEach((hospitalId) => {
            hospitalDoctorCount.set(hospitalId, (hospitalDoctorCount.get(hospitalId) || 0) + 1);
          });
        });

        const distributionData: ChartData[] = Array.from(hospitalDoctorCount, ([name, value]) => ({ name, value }));
        setDoctorDistributionChartData(distributionData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${config.backend_url}/api/hospitals/`);
        const data: Hospital[] = await response.json();
        setHospitals(data);
        setHospitalStats({ total: data.length });

        // Prepare chart data for hospitals by type
        const hospitalTypeCount = new Map<string, number>();
        data.forEach((hospital) => {
          const type = formatHospitalType(hospital.hospitalType);
          hospitalTypeCount.set(type, (hospitalTypeCount.get(type) || 0) + 1);
        });

        const hospitalData: ChartData[] = Array.from(hospitalTypeCount, ([name, value]) => ({ name, value }));
        setHospitalChartData(hospitalData);

        // Prepare chart data for hospitals by area
        const areaCount = new Map<string, number>();
        data.forEach((hospital) => {
          areaCount.set(hospital.area, (areaCount.get(hospital.area) || 0) + 1);
        });

        const areaData: ChartData[] = Array.from(areaCount, ([name, value]) => ({ name, value }));
        setHospitalAreaChartData(areaData);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchDoctors();
    fetchHospitals();
  }, []);

  const formatHospitalType = (type: string): string => {
    return type
        .split('_') // Split by underscore
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
        .join(' ') // Join back to a single string
        + "s";
  };


  // Render charts when data changes
  useEffect(() => {
    if (doctorChartRef.current && doctorChartData.length > 0) {
      // Destroy existing chart instance if it exists
      if (doctorChartInstance.current) {
        doctorChartInstance.current.destroy();
      }

      const ctx = doctorChartRef.current.getContext('2d');
      if (ctx) {
        doctorChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: doctorChartData.map(data => data.name),
            datasets: [{
              label: 'Doctors',
              data: doctorChartData.map(data => data.value),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Number of Doctors'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Specializations'
                },
                beginAtZero: true
              }
            },
          },
        });
      }
    }

    if (hospitalChartRef.current && hospitalChartData.length > 0) {
      // Destroy existing chart instance if it exists
      if (hospitalChartInstance.current) {
        hospitalChartInstance.current.destroy();
      }

      const ctx = hospitalChartRef.current.getContext('2d');
      if (ctx) {
        hospitalChartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: hospitalChartData.map(data => data.name),
            datasets: [{
              label: 'Hospitals Distribution by Type',
              data: hospitalChartData.map(data => data.value),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }],
          },
          options: {
            radius: "90%",
            responsive: true,
          },
        });
      }
    }

    if (doctorDistributionChartRef.current && doctorDistributionChartData.length > 0) {
      if (doctorDistributionChartInstance.current) {
        doctorDistributionChartInstance.current.destroy();
      }

      const ctx = doctorDistributionChartRef.current.getContext('2d');
      if (ctx) {
        doctorDistributionChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: doctorDistributionChartData.map(data => hospitals.find(h => h.hospitalId === data.name)?.hospitalName || 'Unknown Hospital'),
            datasets: [{
              label: 'Doctors per Hospital',
              data: doctorDistributionChartData.map(data => data.value),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            }],
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Number of Doctors'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Hospitals'
                },
                beginAtZero: true
              }
            },
          },
        });
      }
    }

    if (hospitalAreaChartRef.current && hospitalAreaChartData.length > 0) {
      if (hospitalAreaChartInstance.current) {
        hospitalAreaChartInstance.current.destroy();
      }

      const ctx = hospitalAreaChartRef.current.getContext('2d');
      if (ctx) {
        hospitalAreaChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: hospitalAreaChartData.map(data => data.name),
            datasets: [{
              label: 'Hospitals per Area',
              data: hospitalAreaChartData.map(data => data.value),
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
            }],
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Number of Hospitals'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Areas'
                },
                beginAtZero: true
              }
            },
          },
        });
      }
    }

  }, [doctorChartData, hospitalChartData, doctorDistributionChartData, hospitalAreaChartData]);

  return (
      <div className="dashboard-layout flex min-h-screen">
        {/* Sidebar */}
        <MinistrySidebar />

        {/* Main Content Area */}
        <main className="main-content flex-1 p-6">
          {/* Header Section */}
          <header className="header flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Ministry Dashboard</h1>
          </header>

          {/* Doctors and Hospitals Analytics Section */}
          <section>
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-4 shadow-md rounded-md">
                <h3 className="text-lg font-semibold">Total Hospitals</h3>
                <p className="text-2xl font-bold">{hospitalStats.total}</p>
              </div>
              <div className="bg-white p-4 shadow-md rounded-md">
                <h3 className="text-lg font-semibold">Total Doctors</h3>
                <p className="text-2xl font-bold">{doctorStats.total}</p>
              </div>
              <div className="bg-white p-4 shadow-md rounded-md">
                <h3 className="text-lg font-semibold">Specializations</h3>
                <p className="text-2xl font-bold">{doctorStats.specializations}</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="mt-8 flex space-x-8">
              <div className="flex-0.8">
                <h2 className="text-xl font-semibold mb-4">Hospitals Distribution by Type</h2>
                <canvas ref={hospitalChartRef} width="400" height="200"></canvas>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Doctors Distribution by Specialization</h2>
                <canvas ref={doctorChartRef} width="400" height="200"></canvas>
              </div>
            </div>

            <div className="mt-8 flex space-x-8">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Hospitals Distribution by Area</h2>
                <canvas ref={hospitalAreaChartRef} width="400" height="200"></canvas>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Doctors Distribution by Hospital</h2>
                <canvas ref={doctorDistributionChartRef} width="400" height="200"></canvas>
              </div>
            </div>

          </section>
        </main>
      </div>
  );
};

export default DoctorDashboard;


