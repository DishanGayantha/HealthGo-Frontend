import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For routing
import { emailSignIn } from "../firebase/auth"; // Firebase email login function
import { useAuthStore } from "@/store/AuthStore"; // Zustand store for user management
import { db } from "../firebase/firebase"; // Firestore database import
import { doc, setDoc } from "firebase/firestore"; // Firestore functions

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useAuthStore(); // Zustand store
  const navigate = useNavigate(); // To navigate between routes

  // Handle Admin Login
  const handleAdminLogin = async () => {
    const result = await emailSignIn(email, password);
    if (result.user) {
      setUser(result.user); // Store the admin user in Zustand store

      // Check and save the admin role in Firestore
      const adminProfile = {
        email: result.user.email,
        role: "admin", // Set the user type as admin
      };

      // Save admin profile to Firestore
      await setDoc(doc(db, "users", result.user.uid), adminProfile, { merge: true });

      alert("Admin logged in successfully!");
      navigate("/admin-dashboard"); // Redirect to the admin dashboard
    } else {
      alert(result.error?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Admin Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
          />

          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={handleAdminLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
