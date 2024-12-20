'use server-only';

import { cookies } from 'next/headers';
import { decrypt } from './sessions';

export const getUserIdFromCookies = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const sessionData = session ? await decrypt(session) : null;
  const userId = sessionData?.userId;
  return userId;
};
