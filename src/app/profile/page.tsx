import { getUserDetails } from '../actions/profile';
import Profile from '@/components/Profile';

export default async function ProfileWrapper() {
  const userDetails = await getUserDetails();
  return <Profile userDetails={userDetails} />;
}
