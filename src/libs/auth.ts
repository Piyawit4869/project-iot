import { getSession, useSession } from 'next-auth/react';

// export const getServerSession = async () => {
//   const session = await getSession();

//   const user: any = session && session.user;

//   const accessToken = user.auth && user.auth.accessToken;
//   const refreshToken = user.auth && user.auth.refreshToken;

//   return { accessToken, refreshToken };
// };

// export const getClientSession = () => {
//   const { data: session, status } = useSession();

//   const user: any = status === 'authenticated' && session && session.user;

//   const me = user && user.me ? user.me : null;

//   return me;
// };

export const getServerSession = async () => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { accessToken: null, refreshToken: null };
    }

    const { auth } = session.user as any; // กำหนด type ของ session.user
    const accessToken = auth?.accessToken || null;
    const refreshToken = auth?.refreshToken || null;

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error fetching server session:', error);
    return { accessToken: null, refreshToken: null };
  }
};

export const getClientSession = () => {
  const { data: session, status } = useSession();

  if (status !== 'authenticated' || !session || !session.user) {
    return null; // ถ้าไม่ Authenticated ให้คืนค่า null
  }

  const user = session.user as any; // กำหนด type ของ session.user
  return user.me || null; // คืนค่า user.me หรือ null
};
