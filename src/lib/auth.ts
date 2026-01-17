import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs"; // We need to install bcryptjs or use use separate auth logic

// Minimal config for V1
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Mock auth for now until we implement full registration
                // In a real app we would check bcrypt.compare(credentials.password, user.hashedPassword)
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // For now, allow any login if we don't have users yet, or just fail
                // We'll implement the actual logic when we have the Register page working.
                console.log("Authorize called with", credentials);

                return {
                    id: "1",
                    name: "Admin User",
                    email: String(credentials.email),
                };
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token }) {
            return token;
        },
    },
});
