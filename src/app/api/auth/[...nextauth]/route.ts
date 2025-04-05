import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const authOptions: NextAuthOptions = {
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

            return { me, auth: res.data } as any;
          }
          return null;
        } catch (error) {
          throw new Error("Invalid username or password");
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
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
