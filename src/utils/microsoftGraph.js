// src/utils/microsoftGraph.js

/**
 * Fetches the user's profile photo from Microsoft Graph API
 * @param {string} accessToken - The Microsoft access token from Firebase auth
 * @returns {Promise<string|null>} - The photo URL as a blob URL, or null if unavailable
 */
export const getMicrosoftProfilePhoto = async (accessToken) => {
  try {
    // Fetch the profile photo from Microsoft Graph API
    const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.log('No profile photo available or error fetching photo:', response.status);
      return null;
    }

    // Convert the photo blob to a data URL that can be used in img src
    const blob = await response.blob();
    const photoURL = URL.createObjectURL(blob);

    return photoURL;
  } catch (error) {
    console.error('Error fetching Microsoft profile photo:', error);
    return null;
  }
};

/**
 * Fetches basic user profile information from Microsoft Graph API
 * @param {string} accessToken - The Microsoft access token from Firebase auth
 * @returns {Promise<Object|null>} - User profile data or null if unavailable
 */
export const getMicrosoftUserProfile = async (accessToken) => {
  try {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.log('Error fetching user profile:', response.status);
      return null;
    }

    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error('Error fetching Microsoft user profile:', error);
    return null;
  }
};
