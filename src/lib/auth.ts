import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://mail.google.com/",
        },
      },
    })
  ],

  // pages: {
  //   signIn: '/auth/signin',
  //   error: '/auth/error',
  // },

  // callbacks: {
  //   async session({ session, user }) {
  //     if (user) {
  //       session.user.id = user.id
  //     }
  //     return session
  //   }
  // }



  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.email = account.providerAccountId
      }
      return token
    },

    async session({ session, token }) {
      session.accessToken = (token as any)?.accessToken ?? undefined;
      session.refreshToken = (token as any)?.refreshToken ?? undefined;
      session.user.email = (token as any)?.email ?? session.user.email;
      return session;
    },

    async signIn({ user, account, profile }) {
      // Auto-setup Gmail SMTP when user signs in with Google
      if (account?.provider === 'google' && user.id && user.email && account.access_token) {
        try {
          const { setupGmailSMTP } = await import('./smtp')
          await setupGmailSMTP({
            userId: user.id,
            email: user.email,
            accessToken: account.access_token,
            refreshToken: account.refresh_token || ''
          })
        } catch (error) {
          console.error('Auto SMTP setup failed:', error)
          // Don't block sign in if SMTP setup fails
        }
      }
      return true
    }
  }

});
