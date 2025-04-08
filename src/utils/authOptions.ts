import { env } from "@/constants/common";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const base_url = env.base_url;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${base_url}/auth/signin/`, {
            user: credentials?.user,
            password: credentials?.password,
          });
          if (res.data) {
            const { data } = res;
            const { data: me } = await axios(`${base_url}/auth/me/`, {
              method: "GET",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${data.accessToken}`,
              },
            });

            if (!me) {
              throw new Error("Failed to fetch user details");
            }
            if (me) {
              return {
                ...me,
                // user: { ...me, auth: res.data },
                auth: res.data,
              };
            }
            return null;
          }
          return null;
        } catch {
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session) {
        session = {
          ...session,
          ...token,
          user: {
            ...session.user,
            ...token,
          },
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
