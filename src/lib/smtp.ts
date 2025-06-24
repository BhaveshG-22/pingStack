import { prisma } from './prisma'

export interface GoogleSMTPSetup {
  userId: string
  email: string
  accessToken: string
  refreshToken: string
}

/**
 * Set up Gmail SMTP configuration using OAuth tokens
 */
export async function setupGmailSMTP({
  userId,
  email,
  accessToken,
  refreshToken
}: GoogleSMTPSetup) {
  try {
    // Check if SMTP config already exists for this email
    const existingConfig = await prisma.sMTPConfig.findFirst({
      where: {
        userId,
        email,
        provider: 'gmail'
      }
    })

    if (existingConfig) {
      // Update existing config
      return await prisma.sMTPConfig.update({
        where: { id: existingConfig.id },
        data: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: true,
          isDefault: true,
          updatedAt: new Date()
        }
      })
    } else {
      // Create new SMTP config
      return await prisma.sMTPConfig.create({
        data: {
          provider: 'gmail',
          email,
          host: 'smtp.gmail.com',
          port: 587,
          secure: true,
          isDefault: true,
          userId
        }
      })
    }
  } catch (error) {
    console.error('Error setting up Gmail SMTP:', error)
    throw new Error('Failed to setup Gmail SMTP configuration')
  }
}

/**
 * Get SMTP configuration for a user
 */
export async function getUserSMTPConfig(userId: string, email?: string) {
  try {
    const where: any = { userId }
    
    if (email) {
      where.email = email
    } else {
      where.isDefault = true
    }

    return await prisma.sMTPConfig.findFirst({
      where
    })
  } catch (error) {
    console.error('Error fetching SMTP config:', error)
    return null
  }
}

/**
 * Get Gmail access token for SMTP authentication
 */
export async function getGmailAccessToken(userId: string, email: string) {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId,
        provider: 'google',
        user: {
          email
        }
      }
    })

    if (!account?.access_token) {
      throw new Error('No valid Gmail access token found')
    }

    return {
      accessToken: account.access_token,
      refreshToken: account.refresh_token
    }
  } catch (error) {
    console.error('Error fetching Gmail access token:', error)
    throw new Error('Failed to retrieve Gmail access token')
  }
}

/**
 * Create SMTP transport configuration for nodemailer
 */
export function createGmailTransportConfig(accessToken: string, user: string) {
  return {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user,
      accessToken,
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }
  }
}