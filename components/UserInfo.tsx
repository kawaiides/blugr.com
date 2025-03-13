"use client";

import Image from "next/image";
import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserInfo({ mobileLayout = false }) {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div className={`flex items-center gap-4 justify-around ${mobileLayout ? 'flex-col items-start' : ''}`}>
      <Link 
        className={`p-2 rounded-md flex justify-center gap-3 items-center`}
        href="/profile"
      >
        {mobileLayout && <div className="text-2xl">{session?.user?.name}</div>}
        <Image
          className="rounded-full"
          src={session?.user?.image || "/default-profile.png"}
          alt="User profile picture"
          width={mobileLayout? 100 : 60}
          height={mobileLayout? 100 : 60}
        />
      </Link>
      </div>
    );
  } else {
    return <SignInBtn />;
  }
}