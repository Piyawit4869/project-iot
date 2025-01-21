import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        user: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log({ credentials });
        try {
          const res = await axios.post(`${base_url}/auth/signin/`, {
            user: credentials?.user,
            password: credentials?.password,
          });
          console.log({ res });
          if (res.data) {
            const { data } = res;
            const { data: me } = await axios(`${base_url}/auth/me/`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${data.accessToken}`,
              },
            });

            if (!me) {
              throw new Error('Failed to fetch user details');
            }

            return { me, auth: res.data } as any;
          }
          return null;
        } catch (error) {
          console.log({ error });
          throw new Error('Invalid username or password');
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);

      return token;
    },
    session: async ({ session, token }) => {
      console.log({ session, token });
      if (session) {
        session = {
          ...session,
          ...token,
          user: token.user,
        } as any;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
