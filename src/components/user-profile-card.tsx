"use client";
import { getUserData } from "@/lib/serverUtils";
import { NavUser } from "./NavUser";
import { useEffect, useState } from "react";
import { userDataTypeForSidebar } from "@/interfaces/summary";

export default function UserProfileCard() {
  const [userData, setUserData] = useState<userDataTypeForSidebar | null>(null);

  useEffect(() => {
    const helper = async () => {
      setUserData(await getUserData());
    };
    helper();
  }, []);

  useEffect(() => {
    console.log("userdata", userData);
  }, [userData]);

  // const userId = await getUserIdFromCookies();
  // const userData = await getUserData(userId);
  return <NavUser user={userData ? userData : null} />;
}
