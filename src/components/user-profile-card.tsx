"use client";
import { useSession } from "next-auth/react";
import { NavUser } from "./NavUser";
import { useUserContext } from "@/app/context/userContext";

export default function UserProfileCard() {
  const { data: session } = useSession();
  console.log("session", session);
  // const { userData } = useUserContext();
  // console.log("userData", userData);
  if (session) return <NavUser user={session ? session.user : null} />;

  return null;
}
