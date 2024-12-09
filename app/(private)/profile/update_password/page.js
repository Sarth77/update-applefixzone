"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Sidebar from "@/components/layouts/Sidebar";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const UpdatePasswordPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const id = toast.loading("Updating password...");

    try {
      const response = await axios.patch("/api/profile/update-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.data.success) {
        reset();
        toast.success("Password updated successfully", { id });
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(
        error.response?.data?.message || "Failed to update password",
        {
          id,
        }
      );
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="mb-5 text-2xl font-semibold">Update Password</h2>

                <div className="mb-4">
                  <label className="block mb-1"> Current Password </label>
                  <input
                    type="password"
                    {...register("currentPassword")}
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-1"> New Password </label>
                  <input
                    type="password"
                    {...register("newPassword")}
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-1"> Confirm New Password </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default UpdatePasswordPage;
