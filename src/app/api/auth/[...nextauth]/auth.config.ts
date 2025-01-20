import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

import { base_url } from '@/constant/common';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // id: 'user-auth',
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
            const meResponse = await axios(`${base_url}/auth/me/`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${data.accessToken}`,
              },
            });

            if (meResponse.status !== 200) {
              throw new Error('Failed to fetch user details');
            }
            if (typeof window !== 'undefined') {
              localStorage.setItem('me', JSON.stringify(meResponse.data));
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);
            }
            return res.data;
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
    async jwt({ token, account, user }: any) {
      console.log({ token, account, user });
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user, refreshToken }: any) {
      console.log({ session, token, user, refreshToken });

      session.accessToken = token.accessToken as string;
      // session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },

  // jwt: {
  //   secret: 'secret',
  // },
};

export default NextAuth(authOptions);
