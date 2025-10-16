import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/AuthStore"; 
import { db } from "../firebase/firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Profile: React.FC = () => {
  const { user, userProfile, setUserProfile } = useAuthStore();
  const [name, setName] = useState(userProfile?.name || "");
  const [address, setAddress] = useState(userProfile?.address || "");
  const [age, setAge] = useState(userProfile?.age || 0);
  const [gender, setGender] = useState(userProfile?.gender || "");
  const [email, setEmail] = useState(userProfile?.email || "");
  const [profileImage, setProfileImage] = useState(userProfile?.profileImage || "/dummy-profile.png");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserProfile(data); // Update Zustand store with fetched data
          setName(data.name || "");
          setAddress(data.address || "");
          setAge(data.age || 0);
          setGender(data.gender || "");
          setEmail(data.email || "");
          setProfileImage(data.profileImage || "/dummy-profile.png");
        }
      }
    };

    // Fetch data only if profile is empty
    if (!userProfile || Object.keys(userProfile).length === 0) {
      fetchUserProfile(); 
    } else {
      // Set state from the existing user profile in the store
      setName(userProfile.name || "");
      setAddress(userProfile.address || "");
      setAge(userProfile.age || 0);
      setGender(userProfile.gender || "");
      setEmail(userProfile.email || "");
      setProfileImage(userProfile.profileImage || "/dummy-profile.png");
    }
  }, [user, userProfile, setUserProfile]);

  const handleProfileUpdate = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name, address, age, gender, email, profileImage
      });
      setUserProfile({ name, address, age, gender, email, profileImage });
      toast.success("Profile updated successfully!");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userProfile) {
    return <div>Loading profile...</div>; // Loading state
  }

  return (
    <div className="p-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Patient Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Patient Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Patient Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Gender</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Age</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Patient Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Patient Email */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Patient Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            value={email}
            disabled
          />
        </div>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex flex-col md:flex-row items-center mb-6">
        <div className="w-full md:w-1/2">
          <label className="block text-gray-700 font-semibold mb-2">Edit Profile Picture</label>
          <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-center h-32 bg-gray-50">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-4 block w-full"
          />
        </div>

        {/* Password Fields */}
        <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0">
          <label className="block text-gray-700 font-semibold mb-2">Change Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Change Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 mt-4"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          onClick={() => {
            // Handle cancel action here
          }}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          onClick={handleProfileUpdate}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
