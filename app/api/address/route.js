import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "@/lib/axios";


export async function POST(request, response) {
    const session = await getServerSession(options);
    if (!!session) {
        const body = await request.json()
        const { userAddress, userState, userZipcode, userPhoneNumber, userCity } = body

        try {
            const data = {
                address: userAddress,
                state: userState,
                pincode: userZipcode,
                mobile: userPhoneNumber,
                city: userCity
            }
            const responseData = await axios.post(`/api/address/${session?.user?.id}`, {
                headers: { "authorization": session?.accessToken },
                body: data
            })
            console.log(responseData.data.data, "UPDATE ADDRESS FROM ADDRESS API")
            return NextResponse.json({
                authenticated: !!session,
                session,
                data: responseData?.data?.data
            });

        } catch (err) {
            return new NextResponse(
                err?.response?.data
            )
        }

    } else {
        const url = new URL(`${process.env.NEXTAUTH_URL}/login`, request.url)
        return NextResponse.redirect(url)
    }

}