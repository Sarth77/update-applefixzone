'use client'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { FaUser } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

const ProfileMenu = () => {
  const { data: session } = useSession()
  const router = useRouter();
  return (
    <>
      {
        session?.user ? (
          <div onClick={() => router.push("/profile")} className='rounded-full'>
            <Image
              alt={session?.user?.name}
              src={session?.user?.image}
              fill
              className='rounded-full'
            />
          </div>
        ) : (
          <div onClick={() => router.push("/signin")}><FaUser /></div>
        )
      }
    </>
  )
}

export default ProfileMenu