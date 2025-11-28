import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, OAuthProvider } from 'firebase/auth';
import { auth, microsoftProvider } from '../firebaseconfig';
import { getMicrosoftProfilePhoto } from '../utils/microsoftGraph';

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

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Load profile photo from localStorage if user is signed in
      if (currentUser) {
        const storedPhotoURL = localStorage.getItem('msProfilePhotoURL');
        if (storedPhotoURL) {
          setProfilePhotoURL(storedPhotoURL);
        }
      } else {
        // Clear profile photo if user is signed out
        setProfilePhotoURL(null);
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
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    profilePhotoURL,
    photoLoading,
    signInWithMicrosoft,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
