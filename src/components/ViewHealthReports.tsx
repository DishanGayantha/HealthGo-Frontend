import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment"; // For date formatting

// Types for report items stored in Firestore (labTasks collection)
interface Report {
  id: string;
  testType?: string;
  dueDate?: any; // Firestore Timestamp | string | number
  reportUploaded?: boolean;
  reportLink?: string;
  email?: string;
}

const ViewHealthReports: React.FC = () => {
  // Safely get user email from localStorage
  const { userEmail } = useMemo(() => {
    const raw = localStorage.getItem("userProfile");
    try {
      if (!raw) return { userEmail: null as string | null };
      const parsed = JSON.parse(raw);
      return { userEmail: typeof parsed?.email === "string" ? parsed.email : null };
    } catch {
      return { userEmail: null as string | null };
    }
  }, []);
  
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (!userEmail) {
          setReports([]);
          return;
        }
        const reportsRef = collection(db, "labTasks");
        const q = query(reportsRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        const reportsData: Report[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Record<string, unknown>),
        })) as Report[];

        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports: ", error);
        toast.error("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [userEmail]);

  if (loading) {
    return <p className="text-gray-500">Loading reports...</p>;
  }

  const formatDueDate = (value: Report["dueDate"]): string => {
    try {
      if (!value) return "Unknown";
      // Firestore Timestamp has a toDate() method
      if (typeof (value as any)?.toDate === "function") {
        return moment((value as any).toDate()).format("MMMM D, YYYY");
      }
      if (typeof value === "string") {
        return moment(value).format("MMMM D, YYYY");
      }
      return moment(new Date(value as any)).format("MMMM D, YYYY");
    } catch {
      return "Unknown";
    }
  };

  // Group reports by due date (with proper typing)
  const groupedReports = reports.reduce<Record<string, Report[]>>((acc, report) => {
    const dueDateKey = formatDueDate(report.dueDate);
    if (!acc[dueDateKey]) acc[dueDateKey] = [];
    acc[dueDateKey].push(report);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Health Reports</h1>
      {(!userEmail) ? (
        <p>No user email found. Please log in again.</p>
      ) : Object.keys(groupedReports).length === 0 ? (
        <p>No reports found for this email.</p>
      ) : (
        Object.keys(groupedReports).map((date) => (
          <div key={date} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{date}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {groupedReports[date].map((report) => (
                <div key={report.id} className="border p-4 rounded-lg shadow">
                  <h3 className="font-bold">{report.testType ?? "Unknown Test"}</h3>
                  <p className="text-gray-700">Due Date: {formatDueDate(report.dueDate)}</p>
                  {report.reportUploaded ? (
                    <div className="mt-2">
                      {/* Check if reportLink is defined before using it */}
                      {typeof report.reportLink === 'string' && report.reportLink.length > 0 ? (
                        <>
                          {/* Display preview based on the report type */}
                          {report.reportLink.toLowerCase().endsWith('.pdf') ? (
                            <embed
                              src={report.reportLink}
                              type="application/pdf"
                              width="100%"
                              height="150px"
                              className="rounded"
                              title="Report Preview"
                            />
                          ) : (
                            <img
                              src={report.reportLink}
                              alt="Report Preview"
                              className="rounded max-w-full h-auto"
                              style={{ maxHeight: '150px', objectFit: 'cover' }} // Adjust the height as needed
                            />
                          )}
                          <p className="mt-2">
                            <a
                              href={report.reportLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View Full Report
                            </a>
                          </p>
                        </>
                      ) : (
                        <span className="text-gray-500">Report link not available</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">Not Available</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewHealthReports;
