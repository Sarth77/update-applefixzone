import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  increment,
} from "firebase/firestore";

export const getUserCart = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Reference to the cart collection with user's UID
    const cartCollectionRef = collection(db, `Cart ${userId}`);
    const cartQuery = query(cartCollectionRef);
    const querySnapshot = await getDocs(cartQuery);

    let products = [];

    // Get all products from cart
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return { products };
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
};

export const addToCart = async (userId, product) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Reference to specific product in cart collection
    const productRef = doc(db, `Cart ${userId}`, product.id);
    const productDoc = await getDoc(productRef);

    if (productDoc.exists()) {
      // If product exists, increment quantity
      await updateDoc(productRef, {
        quantity: increment(1),
        updatedAt: new Date().toISOString(),
      });
    } else {
      // If product doesn't exist, add it with quantity 1
      await setDoc(productRef, {
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    // Get updated cart
    return await getUserCart(userId);
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const clearCart = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Get all products in cart
    const cartCollectionRef = collection(db, `Cart ${userId}`);
    const querySnapshot = await getDocs(cartCollectionRef);

    // Delete each product document
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export const getCartTotal = async (userId) => {
  try {
    const cart = await getUserCart(userId);
    const total = cart.products.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);
    return total;
  } catch (error) {
    console.error("Error calculating cart total:", error);
    throw error;
  }
};

// Update quantity of specific product
export const updateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const productRef = doc(db, `Cart ${userId}`, productId);

    if (quantity <= 0) {
      // Remove product if quantity is 0 or less
      await deleteDoc(productRef);
    } else {
      // Update quantity
      await updateDoc(productRef, {
        quantity: quantity,
        updatedAt: new Date().toISOString(),
      });
    }

    return await getUserCart(userId);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

// Remove specific product from cart
export const removeFromCart = async (userId, productId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const productRef = doc(db, `Cart ${userId}`, productId);
    await deleteDoc(productRef);

    return await getUserCart(userId);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};
