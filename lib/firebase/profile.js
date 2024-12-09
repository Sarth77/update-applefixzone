import { auth, db } from "@/lib/firebase";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

// Update user profile (name, photo, and phone)
export const updateUserProfile = async (userData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");

    // Update Firebase auth profile (name and photo only)
    await updateProfile(user, {
      displayName: userData.name,
      photoURL: userData.photoURL || user.photoURL,
    });

    // Reference to the user's document in userdetails collection
    const userRef = doc(db, "userdetails", user.uid);
    const userDoc = await getDoc(userRef);
    const currentData = userDoc.exists() ? userDoc.data() : {};

    const updatedData = {
      ...currentData,
      name: userData.name,
      photoURL: userData.photoURL || user.photoURL,
      email: user.email,
      updatedAt: new Date().toISOString(),
    };

    // If there's an address, update the name and email there too
    if (currentData.address) {
      updatedData.address = {
        ...currentData.address,
        name: userData.name,
        email: user.email,
      };
    }

    // Update or create the user document
    await setDoc(userRef, updatedData, { merge: true });

    return {
      success: true,
      message: "Profile updated successfully",
      data: {
        name: updatedData.name,
        email: updatedData.email,
        photoURL: updatedData.photoURL,
        phone: updatedData.address?.mobile || "",
      },
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Get user profile including phone
export const getUserProfile = async (userId) => {
  try {
    if (!userId) throw new Error("User ID is required");

    const userRef = doc(db, "userdetails", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return {
        success: true,
        data: {
          id: userId,
          ...userDoc.data(),
        },
      };
    }

    return {
      success: false,
      message: "User profile not found",
    };
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Update password with reauthentication
export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");
    if (!user.email) throw new Error("User has no email");

    // Create credentials with current password
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    // Reauthenticate user
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    console.error("Error updating password:", error);
    let message = "Failed to update password";

    switch (error.code) {
      case "auth/wrong-password":
        message = "Current password is incorrect";
        break;
      case "auth/weak-password":
        message = "New password is too weak";
        break;
      case "auth/requires-recent-login":
        message = "Please sign in again to update password";
        break;
    }

    throw new Error(message);
  }
};

// Get user orders - Modified to return empty array if collection doesn't exist
export const getUserOrders = async (userId) => {
  try {
    if (!userId) throw new Error("User ID is required");

    // Reference to the orders collection with user's UID
    const ordersCollectionRef = collection(db, `Orders ${userId}`);
    const ordersQuery = query(ordersCollectionRef);

    try {
      const querySnapshot = await getDocs(ordersQuery);
      let orders = [];

      // Get all orders if they exist
      querySnapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return { orders };
    } catch (error) {
      // If collection doesn't exist or any other error, return empty array
      console.log("No orders found or error fetching orders:", error);
      return { orders: [] };
    }
  } catch (error) {
    console.error("Error in getUserOrders:", error);
    return { orders: [] }; // Return empty array for any error
  }
};
