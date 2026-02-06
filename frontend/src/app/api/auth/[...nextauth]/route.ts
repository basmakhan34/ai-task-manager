import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Ye line Vercel ko batayegi ke ye page static nahi hai (Build error fix)
export const dynamic = 'force-dynamic';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Filhaal test user logic, baad mein aap database connect kar sakti hain
        if (credentials?.email === "admin@test.com" && credentials?.password === "password123") {
          return { id: "1", name: "Basma Khan", email: credentials.email };
        }
        // Demo ke liye hum har login allow kar dete hain
        if (credentials?.email && credentials?.password) {
           return { id: "1", name: "User", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret_key_123",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };