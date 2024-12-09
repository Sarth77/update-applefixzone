import { options } from "@/app/api/auth/[...nextauth]/options";
import Profile from "@/components/auth/Profile";
import { getUserAddress } from "@/lib/firebase/address";
import { getServerSession } from "next-auth";

const ProfilePage = async () => {
  try {
    const session = await getServerSession(options);
    let addresses = null;

    if (session?.user?.id) {
      addresses = await getUserAddress(session.user.id);
    }

    return (
      <div>
        <Profile addresses={addresses} usersession={session} />
      </div>
    );
  } catch (error) {
    console.error("Error loading profile:", error);
    return (
      <div>
        <Profile addresses={null} />
      </div>
    );
  }
};

export default ProfilePage;
