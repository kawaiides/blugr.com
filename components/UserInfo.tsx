"use client";

import Image from "next/image";
import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserInfo() {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <Link 
        className="p-2 rounded-md flex justify-center gap-3 items-center"
        href="/profile"
      >
        <div className="text-xl">{session?.user?.name}</div>
        <Image
          className="rounded-full"
          src={session?.user?.image || "/default-profile.png"}
          alt="User profile picture"
          width={60}
          height={60}
        />
      </Link>
    );
  } else {
    return <SignInBtn />;
  }
}