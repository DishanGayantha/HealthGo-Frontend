import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MinistrySidebar from '../MinistrySidebar.tsx';
import config from "../../../constants/config";

const specializations = ['Cardiology', 'Dermatology', 'Neurology', 'Oncology', 'Pediatrics', 'Radiology']; // Add your specializations here

const AddDoctor: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        specialization: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        specialization: ''
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
        if (name === 'name' && !value) {
            error = 'Doctor name is required';
        } else if (name === 'email') {
            if (!value) {
                error = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = 'Invalid email format';
            }
        } else if (name === 'password' && !value) {
            error = 'Password is required';
        } else if (name === 'specialization' && !value) {
            error = 'Specialization is required';
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
            const response = await fetch(`${config.backend_url}/api/doctors/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    userType: 'DOCTOR',
                    specialization: formData.specialization,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                setNotification({ message: 'Doctor added successfully!', type: 'success' });
                setTimeout(() => {
                    setNotification(null);
                    navigate('/manage-doctors');
                }, 3000);
            } else {
                throw new Error('Failed to add doctor');
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ message: 'Failed to add doctor. Please try again later.', type: 'error' });
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    };

    const handleCancel = () => {
        navigate('/manage-doctors');
    };

    return (
        <div className="dashboard-layout">
            <MinistrySidebar />
            <main className="main-content">
                <header className="header">
                    <div className="header-left">
                        <h2 className="text-3xl font-semibold">Add Doctor</h2>
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
                                <label>Doctor Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                                    placeholder="Enter Doctor's Name"
                                    required
                                />
                                {errors.name && <span className="text-red-500">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label>Specialization</label>
                                <select
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.specialization ? 'border-red-500' : ''}`}
                                    required
                                >
                                    <option value="">Select Specialization</option>
                                    {specializations.map((specialization) => (
                                        <option key={specialization} value={specialization}>
                                            {specialization}
                                        </option>
                                    ))}
                                </select>
                                {errors.specialization && <span className="text-red-500">{errors.specialization}</span>}
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="Enter Doctor's Email"
                                    required
                                />
                                {errors.email && <span className="text-red-500">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                                    placeholder="Enter Password"
                                    required
                                />
                                {errors.password && <span className="text-red-500">{errors.password}</span>}
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

export default AddDoctor;
