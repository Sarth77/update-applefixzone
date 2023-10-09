"use client";
import { firebaseSignOut } from '@/lib/firebase';
import { signOut } from 'next-auth/react'
import Link from "next/link";
import React from "react";

const Sidebar = () => {

  const logoutHandler = () => {
    return new Promise(async (resolve) => {
      resolve(
        firebaseSignOut().then(() => signOut())
      )
    })
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        <li>
          <Link
            href="/profile"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Your Profile
          </Link>
        </li>
        <li>
          <Link
            href="/profile/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            href="/profile/update"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Profile
          </Link>
        </li>
        <li>
          <Link
            href="/profile/update_password"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Password
          </Link>
        </li>
        <li>
          <span
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
