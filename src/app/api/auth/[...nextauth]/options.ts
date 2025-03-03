import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/schemas/UserSchema";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      await connectToDatabase();
      const dbUser = await Users.findOne({ email: profile.email });
      if (dbUser) {
        console.log("user logged in");
        return true;
      }

      const newUser = new Users({
        username: profile.name,
        email: profile.email,
      });
      await newUser.save();

      return true;
    },
    async jwt({ token, profile }) {
      if (profile) {
        await connectToDatabase();
        const dbUser = await Users.findOne({ email: profile.email });
        if (!dbUser) {
          throw new Error("No user found");
        }
        token.id = dbUser._id;
      }
      console.log("i am here also1 ❤️❤️");
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      console.log("i am here also2 ❤️❤️");
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
