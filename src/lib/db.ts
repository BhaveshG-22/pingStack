import { prisma } from "./prisma"



export interface Credentials {
    email: string,
    password: string
}

export default async function getUserFromDb({ email, password }: Credentials) {
    return await prisma.user.findFirst({
        where: {
            email,
            passwordHash: password
        }
    })
}

