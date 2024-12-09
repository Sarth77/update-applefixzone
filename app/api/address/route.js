import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { updateUserAddress, getUserAddress } from "@/lib/firebase/address";
import { getUserProfile } from "@/lib/firebase/profile";

export async function POST(request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const body = await request.json();
    const { userAddress, userState, userZipcode, userPhoneNumber, userCity } =
      body;

    // Get current user profile data
    const userProfile = await getUserProfile(session.user.id);
    const userData = userProfile.success ? userProfile.data : {};

    // Only include defined values in addressData
    const addressData = {
      ...(userAddress && { address: userAddress }),
      ...(userState && { state: userState }),
      ...(userZipcode && { pincode: userZipcode }),
      ...(userPhoneNumber && { mobile: userPhoneNumber }),
      ...(userCity && { city: userCity }),
      name: userData.name || session.user.name,
      email: userData.email || session.user.email,
      country: "India", // Default country
    };

    // Update address in Firestore
    const updatedAddress = await updateUserAddress(
      session.user.id,
      addressData
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    console.error("Error in address update:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Get both user profile and address data
    const [userProfile, address] = await Promise.all([
      getUserProfile(session.user.id),
      getUserAddress(session.user.id),
    ]);

    const userData = userProfile.success ? userProfile.data : {};

    // If address exists but missing user details, add them from profile or session
    if (address && (!address.name || !address.email)) {
      const updatedAddress = {
        ...address,
        name: address.name || userData.name || session.user.name,
        email: address.email || userData.email || session.user.email,
        country: address.country || "India",
      };

      // Update the address with missing fields
      await updateUserAddress(session.user.id, updatedAddress);
      return NextResponse.json({
        status: 200,
        success: true,
        data: updatedAddress,
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: address,
    });
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
