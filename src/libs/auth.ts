import { getSession, useSession } from 'next-auth/react';

export const getServerSession = async () => {
  const session = await getSession();

  const user: any = session && session.user;

  const accessToken = user.auth && user.auth.accessToken;
  const refreshToken = user.auth && user.auth.refreshToken;

  return { accessToken, refreshToken };
};

export const getClientSession = () => {
  const { data: session, status } = useSession();

  const user: any = status === 'authenticated' && session && session.user;

  const me = user && user.me ? user.me : null;

  return me;
};
