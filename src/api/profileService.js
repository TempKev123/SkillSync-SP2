import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

const PROFILES_COLLECTION = "profiles";

/**
 * Get user profile from Firestore
 * @param {string} userId - The user's UID
 * @returns {Promise<Object|null>} The user profile data or null if not found
 */
export const getProfile = async (userId) => {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      return { id: profileSnap.id, ...profileSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

/**
 * Create a new user profile in Firestore
 * @param {string} userId - The user's UID
 * @param {Object} profileData - The profile data to save
 * @returns {Promise<void>}
 */
export const createProfile = async (userId, profileData) => {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    await setDoc(profileRef, {
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

/**
 * Update an existing user profile in Firestore
 * @param {string} userId - The user's UID
 * @param {Object} profileData - The profile data to update
 * @returns {Promise<void>}
 */
export const updateProfile = async (userId, profileData) => {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    await updateDoc(profileRef, {
      ...profileData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

/**
 * Create or update user profile (upsert)
 * @param {string} userId - The user's UID
 * @param {Object} profileData - The profile data to save
 * @returns {Promise<void>}
 */
export const saveProfile = async (userId, profileData) => {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      await updateDoc(profileRef, {
        ...profileData,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await setDoc(profileRef, {
        ...profileData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error saving profile:", error);
    throw error;
  }
};

/**
 * Initialize a default profile for a new user
 * @param {Object} user - The Firebase user object
 * @returns {Object} Default profile data
 */
export const getDefaultProfile = (user) => ({
  name: user?.displayName || '',
  bio: '',
  about: '',
  contactInfo: {
    email: user?.email || '',
    phone: '',
    linkedin: '',
    github: '',
  },
  skills: [],
  portfolio: [],
});
