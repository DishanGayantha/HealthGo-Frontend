import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  userProfile?: Partial<Omit<AuthState, 'user' | 'setUser' | 'setUserProfile' | 'logOutUser'>>;
  name?: string;
  address?: string;
  age?: number;
  gender?: string;
  profileImage?: string;
  userType: string;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: Partial<Omit<AuthState, 'user' | 'userType'>>) => void;
  logOutUser: () => void;
}

const loadUserProfile = () => {
  const userProfile = localStorage.getItem("userProfile");
  return userProfile ? JSON.parse(userProfile) : {};
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userProfile: loadUserProfile(), // Load userProfile from local storage
  name: '',
  address: '',
  age: 0,
  gender: '',
  profileImage: '',
  userType: 'patient',
  
  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    set(() => ({ user }));
  },

  setUserProfile: (profile) => {
    const updatedProfile = { ...profile };
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

    set((state) => ({
      userProfile: { ...state.userProfile, ...updatedProfile },
    }));
  },

  logOutUser: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");

    set(() => ({
      user: null,
      userProfile: {},
      name: '',
      address: '',
      age: 0,
      gender: '',
      profileImage: '',
      userType: 'patient',
    }));
  },
}));
