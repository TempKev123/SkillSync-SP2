import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, OAuthProvider } from 'firebase/auth';
import { auth, microsoftProvider } from '../firebaseconfig';
import { getMicrosoftProfilePhoto } from '../utils/microsoftGraph';
import { getProfile, saveProfile, getDefaultProfile } from '../api/profileService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhotoURL, setProfilePhotoURL] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch profile data from Firestore
  const fetchProfileData = async (userId) => {
    setProfileLoading(true);
    try {
      const profile = await getProfile(userId);
      setProfileData(profile);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Load profile photo from localStorage if user is signed in
      if (currentUser) {
        const storedPhotoURL = localStorage.getItem('msProfilePhotoURL');
        if (storedPhotoURL) {
          setProfilePhotoURL(storedPhotoURL);
        }
        // Fetch profile data from Firestore
        await fetchProfileData(currentUser.uid);
      } else {
        // Clear profile photo and data if user is signed out
        setProfilePhotoURL(null);
        setProfileData(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sign in with Microsoft
  const signInWithMicrosoft = async () => {
    try {
      const result = await signInWithPopup(auth, microsoftProvider);

      // Get the Microsoft access token from the credential
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      // Fetch the profile photo from Microsoft Graph API
      if (accessToken) {
        setPhotoLoading(true);
        const photoURL = await getMicrosoftProfilePhoto(accessToken);
        if (photoURL) {
          setProfilePhotoURL(photoURL);
          // Store the photo URL in localStorage for persistence
          localStorage.setItem('msProfilePhotoURL', photoURL);
        }
        setPhotoLoading(false);
      }

      return result.user;
    } catch (error) {
      console.error('Error signing in with Microsoft:', error);
      setPhotoLoading(false);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      // Clear profile photo from localStorage
      localStorage.removeItem('msProfilePhotoURL');
      setProfilePhotoURL(null);
      setProfileData(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Update profile data in Firestore
  const updateProfileData = async (newProfileData) => {
    if (!user) {
      throw new Error('User must be logged in to update profile');
    }
    try {
      await saveProfile(user.uid, newProfileData);
      setProfileData({ id: user.uid, ...newProfileData });
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Get default profile structure for new users
  const getDefaultProfileData = () => getDefaultProfile(user);

  const value = {
    user,
    loading,
    profilePhotoURL,
    photoLoading,
    profileData,
    profileLoading,
    signInWithMicrosoft,
    logout,
    updateProfileData,
    getDefaultProfileData,
    refreshProfileData: () => user && fetchProfileData(user.uid),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
