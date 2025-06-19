import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [Google],

  // pages: {
  //   signIn: '/auth/signin',
  //   error: '/auth/error',
  // },

  callbacks: {
    async session({ session, user }) {
      // Fetch the full session data from database
      const dbSession = await prisma.session.findUnique({
        where: { sessionToken: session.sessionToken },
        include: { user: true }
      })
      
      if (dbSession) {
        return {
          ...session,
          sessionToken: dbSession.sessionToken,
          userId: dbSession.userId,
          expires: dbSession.expires,
          createdAt: dbSession.createdAt,
          updatedAt: dbSession.updatedAt,
          user: {
            id: dbSession.user.id,
            name: dbSession.user.name,
            email: dbSession.user.email,
            emailVerified: dbSession.user.emailVerified,
            passwordHash: dbSession.user.passwordHash,
            image: dbSession.user.image,
            createdAt: dbSession.user.createdAt,
            updatedAt: dbSession.user.updatedAt
          }
        }
      }
      
      return session
    }
  }
});
