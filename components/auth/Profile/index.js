import React from "react";
import Link from "next/link";
import UserAddresses from "@/components/user/UserAddresses";
import Sidebar from "@/components/layouts/Sidebar";

const Profile = ({ addresses, usersession }) => {
    return (
        <>
            <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
                <div className="flex flex-col md:flex-row mt-8">

                    <div className="flex-1 px-4">
                        <figure className="flex items-start sm:items-center">
                            <div className="relative flex shrink-0">
                                <img
                                    className="w-16 h-16 rounded-full mr-4 "
                                    src={usersession?.user?.image}
                                    alt={usersession?.user?.name}
                                />
                            </div>
                            <figcaption>
                                <h5 className="font-semibold text-lg">{usersession?.user?.name}</h5>
                                <p className="truncate">
                                    <b>Email:</b> <span className="truncate">{usersession?.user?.email}</span>
                                </p>
                            </figcaption>
                        </figure>

                        <hr className="my-4" />

                        <UserAddresses addresses={addresses} />

                        <Link href="/address/new">
                            <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
                                Update Address
                            </button>
                        </Link>

                    </div>
                    <hr className="my-4" />
                    <Sidebar />
                </div>
            </div>
            <hr className="my-4" />
        </>
    );
};

export default Profile;
