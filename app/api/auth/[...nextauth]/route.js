import NextAuth from "next-auth/next";
import { options } from "./options";
const handler = NextAuth(options)

export { handler as GET, handler as POST, handler as DELETE, handler as PUT, handler as OPTIONS }