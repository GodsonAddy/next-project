// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";
import { User } from "@next-auth/sequelize-adapter/dist/models";
export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log("session", session);
  if (!session) return res.status(401).send("Unauthorised");
  res.status(200).json({ name: "John Doe" });
}
