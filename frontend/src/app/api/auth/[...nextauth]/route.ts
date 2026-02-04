import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Hum options ko alag variable mein rakhte hain
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Authentication logic
        if (credentials?.email && credentials?.password) {
          return { id: "1", name: "Test User", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret", // Secret add karna zaroori hai
};

// NextAuth ko handler ke taur par set karna
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };