"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "@/components/layouts/Sidebar";

const UpdateProfilePage = () => {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    photoURL: session?.user?.image || "",
    phone: "",
  });

  // Fetch current user details including phone from address
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user profile data
        const profileResponse = await axios.get("/api/profile/get");

        // Get address data which contains the phone number
        const addressResponse = await axios.get("/api/address");

        if (profileResponse.data.success) {
          setFormData((prev) => ({
            ...prev,
            name: profileResponse.data.data.name || prev.name,
            photoURL: profileResponse.data.data.photoURL || prev.photoURL,
          }));
        }

        // Set phone from address data if available
        if (addressResponse.data.success && addressResponse.data.data) {
          setFormData((prev) => ({
            ...prev,
            phone: addressResponse.data.data.mobile || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = toast.loading("Updating profile...");

    try {
      // Update profile
      const profileResponse = await axios.patch(
        "/api/profile/update",
        formData
      );

      // Only update address if phone number is provided
      if (formData.phone) {
        // Get current address first
        const addressResponse = await axios.get("/api/address");
        const currentAddress = addressResponse.data?.data || {};

        // Update address with new phone number while preserving other fields
        await axios.post("/api/address", {
          userAddress: currentAddress.address,
          userState: currentAddress.state,
          userZipcode: currentAddress.pincode,
          userPhoneNumber: formData.phone,
          userCity: currentAddress.city,
        });
      }

      if (profileResponse.data.success) {
        // Update the session with new user data
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            name: formData.name,
            image: formData.photoURL,
          },
        });

        // Force a hard refresh to update all components
        window.location.href = "/profile";

        toast.success("Profile updated successfully", { id });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile", {
        id,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Sidebar />
          <main className="md:w-2/3 lg:w-3/4 px-4">
            <div
              style={{ maxWidth: "480px" }}
              className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
            >
              <form onSubmit={handleSubmit}>
                <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

                <div className="mb-4">
                  <label className="block mb-1"> Name </label>
                  <input
                    type="text"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1"> Phone Number </label>
                  <input
                    type="tel"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1"> Profile Picture URL </label>
                  <input
                    type="url"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.photoURL}
                    onChange={(e) =>
                      setFormData({ ...formData, photoURL: e.target.value })
                    }
                  />
                </div>

                {formData.photoURL && (
                  <div className="mb-4">
                    <label className="block mb-1">Preview</label>
                    <img
                      src={formData.photoURL}
                      alt="Profile Preview"
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png";
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfilePage;
