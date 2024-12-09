import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getProductsByCategory = async (categoryName) => {
  try {
    if (!categoryName) {
      throw new Error("Category name is required");
    }

    // Reference to products collection
    const productsRef = collection(db, "products");

    // Create query for products with matching category
    const q = query(productsRef, where("category", "==", categoryName));
    const querySnapshot = await getDocs(q);

    let products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  } catch (error) {
    console.error("Error getting products by category:", error);
    throw error;
  }
};
