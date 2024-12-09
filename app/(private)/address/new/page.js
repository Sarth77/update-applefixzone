"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";

import { addressFormSchema } from "@/lib/validation";
import ButtonLoader from "@/components/ButtonLoader";
import Sidebar from "@/components/layouts/Sidebar";

const NewAddress = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      userAddress: "",
      userCity: "",
      userState: "",
      userZipcode: "",
      userPhoneNumber: "",
      userCountry: "India",
      error: "",
    },
  });

  // Fetch current address if it exists
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get("/api/address");
        if (response.data.success && response.data.data) {
          const address = response.data.data;
          setValue("userAddress", address.address || "");
          setValue("userCity", address.city || "");
          setValue("userState", address.state || "");
          setValue("userZipcode", address.pincode || "");
          setValue("userPhoneNumber", address.mobile || "");
          setValue("userCountry", "India"); // Default country
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    if (session?.user?.id) {
      fetchAddress();
    }
  }, [session, setValue]);

  const onSubmit = (data) => {
    const id = toast.loading("Updating Address...");
    clearErrors([
      "userAddress",
      "error",
      "userCity",
      "userCountry",
      "userPhoneNumber",
      "userState",
      "userZipcode",
    ]);

    return new Promise((resolve) => {
      axios
        .post("/api/address", {
          userAddress: data.userAddress,
          userState: data.userState,
          userZipcode: data.userZipcode,
          userPhoneNumber: data.userPhoneNumber,
          userCity: data.userCity,
        })
        .then(async (response) => {
          if (response.data.success) {
            reset();
            toast.success("Address Updated", { id });
            await router.push("/profile");
            router.refresh();
          } else {
            throw new Error(
              response.data.message || "Failed to update address"
            );
          }
        })
        .catch((error) => {
          console.error("Error updating address:", error);
          setError("error", {
            message:
              error.response?.data?.message ||
              error.message ||
              "Failed to update address",
          });
          toast.error("Failed to update address", { id });
          resolve();
        });
    });
  };

  return (
    <>
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
                  <h2 className="mb-5 text-2xl font-semibold">
                    Update Address
                  </h2>

                  <div className="mb-4 md:col-span-2">
                    <label htmlFor="userAddress" className="block mb-1">
                      {" "}
                      Address*{" "}
                    </label>
                    <input
                      name="userAddress"
                      id="userAddress"
                      autoComplete="street-address"
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type your address"
                      required
                      {...register("userAddress")}
                    />
                    {errors.userAddress && (
                      <span role="alert" className="text-red-400">
                        {errors.userAddress.message}
                      </span>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-3">
                    <div className="mb-4 md:col-span-1">
                      <label htmlFor="userCity" className="block mb-1">
                        {" "}
                        City{" "}
                      </label>
                      <input
                        autoComplete="true"
                        name="userCity"
                        id="userCity"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your city"
                        required
                        {...register("userCity")}
                      />
                      {errors.userCity && (
                        <span role="alert" className="text-red-400">
                          {errors.userCity.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label htmlFor="userState" className="block mb-1">
                        {" "}
                        State{" "}
                      </label>
                      <input
                        name="userState"
                        id="userState"
                        autoComplete="true"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type state here"
                        required
                        {...register("userState")}
                      />
                      {errors.userState && (
                        <span role="alert" className="text-red-400">
                          {errors.userState.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-2">
                    <div className="mb-4 md:col-span-1">
                      <label htmlFor="userZipcode" className="block mb-1">
                        {" "}
                        Pincode{" "}
                      </label>
                      <input
                        autoComplete="true"
                        name="userZipcode"
                        id="userZipcode"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Type zip code here"
                        required
                        {...register("userZipcode", { valueAsNumber: true })}
                      />
                      {errors.userZipcode && (
                        <span role="alert" className="text-red-400">
                          {errors.userZipcode.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label htmlFor="userPhoneNumber" className="block mb-1">
                        {" "}
                        Phone No{" "}
                      </label>
                      <input
                        name="userPhoneNumber"
                        id="userPhoneNumber"
                        autoComplete="true"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="tel"
                        placeholder="Type phone no here"
                        required
                        {...register("userPhoneNumber", {
                          valueAsNumber: true,
                        })}
                      />
                      {errors.userPhoneNumber && (
                        <span role="alert" className="text-red-400">
                          {errors.userPhoneNumber.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 md:col-span-2">
                    <label htmlFor="userCountry" className="block mb-1">
                      {" "}
                      Country{" "}
                    </label>
                    <input
                      disabled
                      name="userCountry"
                      id="userCountry"
                      autoComplete="country"
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full cursor-not-allowed"
                      type="text"
                      value="India"
                      required
                      {...register("userCountry")}
                    />
                    {errors.userCountry && (
                      <span role="alert" className="text-red-400">
                        {errors.userCountry.message}
                      </span>
                    )}
                  </div>
                  {errors.error && (
                    <span role="alert" className="text-red-400">
                      {errors.error.message}
                    </span>
                  )}
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="my-2 px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    {isSubmitting ? <ButtonLoader /> : "Update"}
                  </button>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewAddress;
