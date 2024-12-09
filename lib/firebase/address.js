import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const updateUserAddress = async (userId, addressData) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Reference to the user's document in userdetails collection
    const userRef = doc(db, "userdetails", userId);

    // Get current user details if they exist
    const userDoc = await getDoc(userRef);
    const currentData = userDoc.exists() ? userDoc.data() : {};

    // Filter out any undefined values from addressData
    const cleanAddressData = Object.entries(addressData).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    // Merge new address data with existing user data
    const updatedData = {
      ...currentData,
      address: {
        ...(currentData.address || {}), // Keep existing address data if any
        ...cleanAddressData,
        updatedAt: new Date().toISOString(),
      },
    };

    // Update or create the user document
    await setDoc(userRef, updatedData, { merge: true });

    return {
      id: userId,
      ...updatedData.address,
    };
  } catch (error) {
    console.error("Error updating address:", error);
    throw new Error(error.message || "Failed to update address");
  }
};

export const getUserAddress = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Reference to the user's document in userdetails collection
    const userRef = doc(db, "userdetails", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists() && userDoc.data().address) {
      return {
        id: userId,
        ...userDoc.data().address,
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting address:", error);
    throw new Error(error.message || "Failed to fetch address");
  }
};

// New function to get all user details
export const getUserDetails = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const userRef = doc(db, "userdetails", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return {
        id: userId,
        ...userDoc.data(),
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw new Error(error.message || "Failed to fetch user details");
  }
};

// New function to update user details
export const updateUserDetails = async (userId, userData) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const userRef = doc(db, "userdetails", userId);
    const userDoc = await getDoc(userRef);
    const currentData = userDoc.exists() ? userDoc.data() : {};

    const updatedData = {
      ...currentData,
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    await setDoc(userRef, updatedData, { merge: true });

    return {
      id: userId,
      ...updatedData,
    };
  } catch (error) {
    console.error("Error updating user details:", error);
    throw new Error(error.message || "Failed to update user details");
  }
};
