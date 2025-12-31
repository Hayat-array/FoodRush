import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select("+password +role");

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Convert Mongoose document to plain object
        const userObj = user.toObject ? user.toObject() : user;

        return {
          id: userObj._id.toString(),
          name: userObj.name,
          email: userObj.email,
          role: userObj.role ?? null,
          image: userObj.avatar || null,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = typeof user.id === "string" ? user.id : String(user.id);
        token.role = user.role ?? null;
        token.name = user.name ?? null;
        token.email = user.email ?? null;
        token.picture = user.image ?? null;
        return token;
      }

      if (!token.role && token.id) {
        try {
          await connectDB();
          const fresh = await User.findById(token.id).select("+role");
          if (fresh && fresh.role) {
            token.role = fresh.role;
          }
        } catch (err) {
          console.error("[NextAuth] jwt -> error refreshing role:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};
      session.user.id = token.id ?? null;
      session.user.role = token.role ?? null;
      session.user.name = token.name ?? null;
      session.user.email = token.email ?? null;
      session.user.image = token.picture ?? null;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
