import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { setupGmailSMTP, getGmailAccessToken } from '@/lib/smtp'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { email } = await request.json()
    const targetEmail = email || session.user.email

    // Get Gmail access token from OAuth
    const tokens = await getGmailAccessToken(session.user.id, targetEmail)
    
    // Set up SMTP configuration
    const smtpConfig = await setupGmailSMTP({
      userId: session.user.id,
      email: targetEmail,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || ''
    })

    return NextResponse.json({
      success: true,
      message: 'Gmail SMTP configured successfully',
      config: {
        id: smtpConfig.id,
        provider: smtpConfig.provider,
        email: smtpConfig.email,
        isDefault: smtpConfig.isDefault
      }
    })

  } catch (error) {
    console.error('SMTP setup error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to setup SMTP configuration',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Return user's SMTP configurations
    const { getUserSMTPConfig } = await import('@/lib/smtp')
    const smtpConfigs = await getUserSMTPConfig(session.user.id)

    return NextResponse.json({
      success: true,
      configs: smtpConfigs
    })

  } catch (error) {
    console.error('SMTP fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch SMTP configurations' },
      { status: 500 }
    )
  }
}