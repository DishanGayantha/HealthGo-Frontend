import React, { useState } from 'react';
import config from "../../../constants/config";

interface Hospital {
    hospitalId: string;
    hospitalName: string;
}

interface UnassignHospitalModalProps {
    doctorId: string | null;
    workingHospitals: Hospital[];  // Include hospital names and IDs
    onClose: () => void;
}

const UnassignHospitalModal: React.FC<UnassignHospitalModalProps> = ({ doctorId, workingHospitals, onClose }) => {
    const [selectedHospitalId, setSelectedHospitalId] = useState<string>('');
    const [notification, setNotification] = useState<string | null>(null);

    const handleUnassignHospital = async () => {
        if (doctorId && selectedHospitalId) {
            try {
                const response = await fetch(`${config.backend_url}/api/doctors/${doctorId}/hospitals/${selectedHospitalId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setNotification('Hospital unassigned successfully!');
                    setTimeout(() => {
                        window.location.reload(); // Refresh the page after success
                    }, 2000);
                } else {
                    setNotification('Failed to unassign hospital.');
                }
            } catch (error) {
                console.error('Error unassigning hospital:', error);
                setNotification('Error unassigning hospital.');
            }
        }
    };

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal-content bg-white rounded-lg p-6 relative w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">Unassign Hospital</h2>

                <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedHospitalId}
                    onChange={(e) => setSelectedHospitalId(e.target.value)}
                >
                    <option value="">Select Hospital</option>
                    {workingHospitals.map((hospital) => (
                        <option key={hospital.hospitalId} value={hospital.hospitalId}>
                            {hospital.hospitalName}
                        </option>
                    ))}
                </select>

                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded mr-2">
                        Cancel
                    </button>
                    <button
                        onClick={handleUnassignHospital}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Unassign
                    </button>
                </div>

                {notification && (
                    <div className="notification fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg">
                        {notification}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UnassignHospitalModal;
