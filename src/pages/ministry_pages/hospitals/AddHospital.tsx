import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MinistrySidebar from '../MinistrySidebar.tsx';
import config from "../../../constants/config";

const AddHospital: React.FC = () => {
    const [formData, setFormData] = useState({
        hospitalName: '',
        hospitalBranch: '',
        hospitalType: '',
        contactNumber: '',
        hospitalEmail: ''
    });

    const [errors, setErrors] = useState({
        hospitalName: '',
        hospitalBranch: '',
        hospitalType: '',
        contactNumber: '',
        hospitalEmail: ''
    });

    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // Clear error for the field being modified
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'hospitalName' && !value) {
            error = 'Hospital name is required';
        } else if (name === 'hospitalBranch' && !value) {
            error = 'Hospital branch (area) is required';
        } else if (name === 'contactNumber') {
            if (!value) {
                error = 'Contact number is required';
            } else if (!/^\d+$/.test(value)) {
                error = 'Contact number must contain only digits';
            } else if (value.length !== 10) {
                error = 'Contact number must be 10 digits';
            }
        } else if (name === 'hospitalEmail') {
            if (!value) {
                error = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = 'Invalid email format';
            }
        } else if (name === 'hospitalType' && !value) {
            error = 'Hospital type is required';
        }

        return error;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const error = validateField(e.target.name, e.target.value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: error,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields before submitting
        let valid = true;
        const newErrors = { ...errors }; // Clone the current errors

        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key as keyof typeof formData]);
            if (error) {
                newErrors[key as keyof typeof formData] = error;
                valid = false;
            }
        });

        setErrors(newErrors); // Update errors state

        if (!valid) return; // Prevent submission if validation fails

        try {
            const response = await fetch(`${config.backend_url}/api/hospitals/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hospitalName: formData.hospitalName,
                    hospitalEmail: formData.hospitalEmail,
                    area: formData.hospitalBranch,
                    contactNumber: formData.contactNumber,
                    hospitalType: formData.hospitalType,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                setNotification({ message: 'Hospital added successfully!', type: 'success' });
                setTimeout(() => {
                    setNotification(null);
                    navigate('/manage-hospitals');
                }, 3000);
            } else {
                throw new Error('Failed to add hospital');
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ message: 'Failed to add hospital. Please try again later.', type: 'error' });
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    };

    const handleCancel = () => {
        navigate('/manage-hospitals');
    };

    return (
        <div className="dashboard-layout">
            <MinistrySidebar />
            <main className="main-content">
                <header className="header">
                    <div className="header-left">
                        <h2 className="text-3xl font-semibold">Add Hospital</h2>
                    </div>
                </header>

                {notification && (
                    <div
                        className={`fixed top-4 right-4 p-4 rounded shadow-lg transition-transform ${
                            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                    >
                        {notification.message}
                    </div>
                )}

                <div className="form-container bg-white p-6 rounded-md shadow-md mt-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="form-group">
                                <label>Hospital Name</label>
                                <input
                                    type="text"
                                    name="hospitalName"
                                    value={formData.hospitalName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.hospitalName ? 'border-red-500' : ''}`}
                                    placeholder="Enter Hospital Name"
                                    required
                                />
                                {errors.hospitalName && <span className="text-red-500">{errors.hospitalName}</span>}
                            </div>

                            <div className="form-group">
                                <label>Hospital Branch (Area)</label>
                                <input
                                    type="text"
                                    name="hospitalBranch"
                                    value={formData.hospitalBranch}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.hospitalBranch ? 'border-red-500' : ''}`}
                                    placeholder="Enter Hospital Branch"
                                    required
                                />
                                {errors.hospitalBranch && <span className="text-red-500">{errors.hospitalBranch}</span>}
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.contactNumber ? 'border-red-500' : ''}`}
                                    placeholder="Enter Contact Number"
                                    required
                                />
                                {errors.contactNumber && <span className="text-red-500">{errors.contactNumber}</span>}
                            </div>

                            <div className="form-group">
                                <label>Hospital Email</label>
                                <input
                                    type="email"
                                    name="hospitalEmail"
                                    value={formData.hospitalEmail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.hospitalEmail ? 'border-red-500' : ''}`}
                                    placeholder="Enter Email"
                                    required
                                />
                                {errors.hospitalEmail && <span className="text-red-500">{errors.hospitalEmail}</span>}
                            </div>

                            <div className="form-group">
                                <label>Hospital Type</label>
                                <select
                                    name="hospitalType"
                                    value={formData.hospitalType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.hospitalType ? 'border-red-500' : ''}`}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="PRIVATE_HOSPITAL">Private Hospital</option>
                                    <option value="PUBLIC_HOSPITAL">Public Hospital</option>
                                </select>
                                {errors.hospitalType && <span className="text-red-500">{errors.hospitalType}</span>}
                            </div>
                        </div>

                        <div className="form-actions mt-6 flex justify-end gap-4">
                            <button type="button" className="btn-cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddHospital;
