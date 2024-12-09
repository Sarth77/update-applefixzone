import React from "react";
import Link from "next/link";
import UserAddresses from "@/components/user/UserAddresses";
import Sidebar from "@/components/layouts/Sidebar";
import Image from "next/image";
import { getUserProfile } from "@/lib/firebase/profile";

const Profile = async ({ addresses, usersession }) => {
  // Default avatar image
  const defaultAvatar =
    "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png";

  // Get user data from Firestore if session exists
  let userData = null;
  if (usersession?.user?.id) {
    try {
      const result = await getUserProfile(usersession.user.id);
      if (result.success) {
        userData = result.data;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  if (!usersession) {
    return (
      <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
        <div className="text-center">
          <p>Please sign in to view your profile</p>
          <Link href="/signin">
            <button className="px-4 py-2 mt-4 text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Use userData if available, otherwise fall back to session data
  const displayName = userData?.name || usersession?.user?.name || "User";
  const displayImage =
    userData?.photoURL || usersession?.user?.image || defaultAvatar;
  const displayEmail =
    userData?.email || usersession?.user?.email || "No email provided";
  const displayPhone = addresses?.mobile || "No phone provided";

  return (
    <>
      <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
        <div className="flex flex-col md:flex-row mt-8">
          <div className="flex-1 px-4">
            <figure className="flex items-start sm:items-center">
              <div className="relative flex shrink-0">
                <Image
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                  src={displayImage}
                  alt={displayName}
                  priority
                />
              </div>
              <figcaption>
                <h5 className="font-semibold text-lg">{displayName}</h5>
                <div className="text-gray-600">
                  <p>
                    <b>Email:</b>{" "}
                    <span className="truncate">{displayEmail}</span>
                  </p>
                  <p>
                    <b>Phone:</b> <span>{displayPhone}</span>
                  </p>
                </div>
              </figcaption>
            </figure>

            <hr className="my-4" />

            {addresses ? (
              <UserAddresses addresses={addresses} />
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">No address found</p>
                <Link href="/address/new">
                  <button className="px-4 py-2 text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
                    Add New Address
                  </button>
                </Link>
              </div>
            )}

            {addresses && (
              <Link href="/address/new">
                <button className="px-4 py-2 mt-4 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
                  Update Address
                </button>
              </Link>
            )}
          </div>
          <hr className="my-4 md:hidden" />
          <Sidebar />
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export default Profile;
