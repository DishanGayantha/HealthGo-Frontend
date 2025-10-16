import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import docloginimg from "@/assets/images/doctor/docloginimg.png";
import config from "../../constants/config";

const LabTechLogin: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null); 
    const [loading, setLoading] = useState<boolean>(false); 
    const navigate = useNavigate();

    // Handle LabTech Login
    const handleLabTechLogin = async () => {
        setError(null); // Clear any previous errors

        // Validate form inputs
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        // API request payload
        const payload = {
            email: email,
            password: password,
        };

        try {
            setLoading(true); // Set loading to true during API request
            const response = await fetch(`${config.backend_url}/api/labtechs/authenticate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 200) {
                const labtechData = await response.json();
                setLoading(false); // Stop loading after successful request

                // Navigate to dashboard with the labtech data
                navigate("/lab-manage", { state: { labtech: labtechData } });
            } else if (response.status === 401) {
                // Unauthorized error
                setError("Invalid email or password. Please try again.");
                setLoading(false);
            } else {
                // Other errors (e.g., 500)
                setError("An unexpected error occurred. Please try again later.");
                setLoading(false);
            }
        } catch (error) {
            setError("Network error. Please check your connection and try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Image and Branding */}
            <div
                className="bg-blue-900 text-white lg:w-1/2 flex flex-col items-center justify-center p-8 lg:min-h-screen">
                <h1 className="text-8xl font-bold mb-4">MEDILINK</h1>
                <h2 className="text-2xl">Sign in to</h2>
                <h3 className="text-3xl mb-8">Lab Technicians Account</h3>
                <img src={docloginimg} className="h-128 mt-1 mx-auto" alt="Doctor" />
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Sign in</h2>

                    <div className="space-y-8">
                        {/* Email/Username Input */}
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email or username"
                        />

                        {/* Password Input */}
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        {/* Loading Indicator */}
                        {loading && <p className="text-blue-500 text-center">Logging in...</p>}

                        {/* Login Button */}
                        <button
                            className={`w-full py-2 text-white rounded-lg transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            onClick={handleLabTechLogin}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabTechLogin;
