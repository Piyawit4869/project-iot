import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

import { base_url } from '@/constant/common';

type JwtType = {
  token: string;
  user: any;
};

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
            return res.data;
          }
          return null;
        } catch (error) {
          throw new Error('Invalid username or password');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token, refreshToken }: any) {
      // console.log({ session, token, refreshToken });

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
