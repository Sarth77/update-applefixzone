import { options } from "@/app/api/auth/[...nextauth]/options";
import Profile from "@/components/auth/Profile";
import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";

const ProfilePage = async () => {
    const addresses = {};
    const session = await getServerSession(options)
    if (session) {
        const url = new URL(`${process.env.NEXT_PRODUCT_API}/api/address/${session?.user?.id}`)
        const res = await axios.get(url, {
            headers: { "Authorization": session?.accessToken }
        })
        const addresses = await res.data.data;
        return (
            <div>
                <Profile addresses={addresses} usersession={session} />
            </div>
        );
    }
    return (
        <div>
            <Profile addresses={addresses} />
        </div>
    );


};

export default ProfilePage;