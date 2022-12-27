import NextAuth from "next-auth";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { Sequelize } from "sequelize";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import axios from "axios";
import sendVerificationRequest from "../../../lib/EmailVerification";
import sendWelcomeEmail from "../../../lib/WelcomeEmail";
import { signIn } from "next-auth/react";

const sequelize = new Sequelize("bloop_web", "bloop", "bloopglobal", {
  host: "localhost",
  dialect: "postgres",
});

export default NextAuth({
  providers: [
    EmailProvider({
      // server: {
      //   service: process.env.EMAIL_SERVER_SERVICE,

      //   auth: {
      //     user: process.env.EMAIL_SERVER_USER,
      //     pass: process.env.EMAIL_SERVER_PASSWORD,
      //   },
      // },
      service: process.env.EMAIL_SERVER_SERVICE,
      from: process.env.EMAIL_FROM,
      maxAge: 60 * 60,
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { service, from },
      }) {
        sendVerificationRequest({
          identifier: email,
          url,
          provider: { service, from },
        });
      },
    }),
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/auth/users/login",
            credentials
          );
          console.log("res", res.data);

          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  adapter: SequelizeAdapter(sequelize),
  events: {
    createUser: sendWelcomeEmail,
  },
  // pages: {
  //   signIn: "/login",
  //   signOut: "/auth/signout",
  //   error: "/auth/error", // Error code passed in query string as ?error=
  //   verifyRequest: "/auth/verify-request", // (used for check email message)
  //   newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
  secret: process.env.NEXTAUTH_JWT_SECRET,
});
