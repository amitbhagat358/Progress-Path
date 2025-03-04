import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/schemas/UserSchema";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please fill all the fields.");
        }

        await connectToDatabase();
        const user = await Users.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found with this email.");
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google") {
        if (!profile?.email) {
          throw new Error("No profile");
        }

        await connectToDatabase();
        const userExists = await Users.findOne({ email: profile.email });

        if (userExists) {
          return true;
        }

        //if user doesn't exists, create one
        const newUser = new Users({
          username: profile.name,
          email: profile.email,
        });
        await newUser.save();
        return true;
      }

      return false;
    },
    async jwt({ token, user, profile }) {
      // for credentials login
      if (user) {
        token.id = user.id;
      }

      // for google login
      if (profile) {
        await connectToDatabase();
        const User = await Users.findOne({ email: profile.email });
        if (!User) {
          throw new Error("No user found");
        }
        token.id = User._id;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
