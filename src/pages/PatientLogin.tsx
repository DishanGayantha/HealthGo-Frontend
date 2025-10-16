import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailSignIn, emailSignUp, googleSignIn } from "../firebase/auth"; // Firebase functions
import { useAuthStore } from "@/store/AuthStore"; // Zustand for global state
import { db } from "../firebase/firebase"; // Firestore database import
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles
import axios from 'axios'; // For making HTTP requests

const LoginSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignup, setIsSignup] = useState<boolean>(false); // Toggle between login/signup
  const { setUser, setUserProfile } = useAuthStore(); // Zustand store to set user and profile
  const navigate = useNavigate(); // Navigation hook to redirect

  // State for additional fields for profile during signup
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [emergencyDial, setEmergencyDial] = useState<string>("");
  const userType = "patient"; // UserType set as 'patient'
  const profileImage = "/dummy-profile.png"; // Default profile image

  // Handle Email Sign Up or Sign In
  const handleEmailAuth = async () => {
    const result = isSignup ? await emailSignUp(email, password) : await emailSignIn(email, password);
    if (result?.user) {
      const { uid, email: userEmail } = result.user;
      setUser(result.user); // Store user info in Zustand store

      const patientProfile = {
        name,
        address,
        age,
        gender,
        email: userEmail,
        contactNumber,
        emergencyDial,
        userType, // User type is 'patient'
        profileImage, // Default dummy image
      };

      if (isSignup) {
        // Save profile to Firestore in 'users' collection
        await setDoc(doc(db, "users", uid), patientProfile);

        // Send the data to your Spring Boot backend for MongoDB storage
        try {
          const response = await axios.post('http://localhost:8080/api/patients', patientProfile);
          console.log(patientProfile)
          toast.success("Patient created successfully in MongoDB!");
          console.log(response.data); // Log the response from your backend
        } catch (error) {
          toast.error("Failed to save data to MongoDB");
          console.error(error);
        }

        // Set profile to Zustand store
        setUserProfile(patientProfile);

        setIsSignup(false); // Reset to login form after successful signup
        toast.success("Signed up successfully! Please log in.");
      } else {
        // On login, retrieve the existing profile data from Firestore
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userProfileData = userDoc.data();
          // Set the existing profile to Zustand store
          setUserProfile(userProfileData);
        }

        // Successful login flow
        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
      }
    } else {
      toast.error(result?.error?.message || "An error occurred");
    }
  };

  // Handle Google Sign-In
  const handleGoogleAuth = async () => {
    const result = await googleSignIn();
    if (result?.user) {
      const { uid, email: userEmail } = result.user;
      setUser(result.user); // Set user info in Zustand store

      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userProfileData = userDoc.data();
        setUserProfile(userProfileData); // Set existing profile data in Zustand store
      } else {
        const defaultProfile = {
          email: userEmail,
          userType: "patient",
          profileImage,
        };
        await setDoc(userRef, defaultProfile);
        setUserProfile(defaultProfile);
      }

      // Save or update Google login data in MongoDB
      try {
        await axios.post('http://localhost:8080/api/patients/google-login', { email: userEmail });
        toast.success("Google login and MongoDB sync successful!");
      } catch (error) {
        toast.error("Failed to sync Google login data with MongoDB");
        console.error(error);
      }

      toast.success("Logged in with Google successfully!");
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
    } else {
      toast.error(result?.error?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Image and Branding */}
      <div className="hidden md:flex w-1/2 bg-blue-800 justify-center items-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">MEDILINK</h1>
          <p className="text-xl">Sign in to Patient Account</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 p-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>

          <div className="space-y-6">
            {/* Email Field */}
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />

            {/* Password Field */}
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {/* Additional Fields for Sign Up */}
            {isSignup && (
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                />
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  placeholder="Enter your age"
                />
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter contact number"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={emergencyDial}
                  onChange={(e) => setEmergencyDial(e.target.value)}
                  placeholder="Enter emergency dial number"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
              onClick={handleEmailAuth}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            {/* Google Sign-In */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              <button
                className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                onClick={handleGoogleAuth}
              >
                Sign in with Google
              </button>
            </div>

            {/* Toggle between Signup/Login */}
            <div className="text-center mt-4">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Already have an account? Login" : "New here? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
