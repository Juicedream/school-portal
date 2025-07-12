import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
// import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
         
        });
        if (!user) {
          return null;
        }
        console.log("Found user:", user);
        // You may want to add password validation and return user or null
        if (user.password !== credentials.password) {
          return null;
        }
        console.log("User authenticated:", user.email);
        // return user;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.role = token.role as typeof token.role;
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt" as const, // Ensure TypeScript knows this is a string literal
  },
};

export default NextAuth(authOptions);
