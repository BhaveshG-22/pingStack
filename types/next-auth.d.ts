import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    refreshToken?: string
    user: {
      name?: string
      email?: string
      image?: string
    }
  }

  interface JWT {
    accessToken?: string
    refreshToken?: string
    email?: string
  }
}