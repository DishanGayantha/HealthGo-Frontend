import React from 'react';

interface DeleteConfirmationModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this hospital?</p>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
