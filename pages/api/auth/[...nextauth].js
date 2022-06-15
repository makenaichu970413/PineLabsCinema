// npm install -f next-auth@3.27.2
// npm install --save next-auth@4.4.0

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../utils/db";
import { verifyPassword } from "../../../utils/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await connectToDB();
        const collection = "users";
        const usersCollection = client.db().collection(collection);
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No User Found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Your password are wrong!");
        }

        // console.log("id: ", user._id.toString());
        client.close();
        return { name: user._id.toString(), email: user.email };
      },
    }),
  ],
});
