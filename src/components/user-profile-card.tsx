import { getUserData, getUserIdFromCookies } from "@/lib/serverUtils";
import { NavUser } from "./NavUser";

export default async function UserProfileCard() {
  const userId = await getUserIdFromCookies();
  const userData = await getUserData(userId);
  return <div>{userId && <NavUser user={userData ? userData : null} />}</div>;
}
