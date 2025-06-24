import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footer"

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PingStack</span>
            </div>
            <Button variant="outline" asChild>
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {currentDate}</p>

          <div className="prose prose-gray max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                PingStack ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our cold email outreach platform for job seekers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using PingStack, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 Information You Provide Directly</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, and profile information when you sign up</li>
                <li><strong>Contact Data:</strong> Recruiter and hiring manager contact information you add to our platform</li>
                <li><strong>Email Content:</strong> Email templates and campaign content you create</li>
                <li><strong>Email Credentials:</strong> SMTP settings for sending emails from your own email address</li>
                <li><strong>Communication Data:</strong> Messages you send through our platform or to our support team</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">2.2 Information Collected Automatically</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Usage Data:</strong> How you interact with our platform, features used, and time spent</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers</li>
                <li><strong>Log Data:</strong> Access logs, error reports, and system activity</li>
                <li><strong>Performance Data:</strong> Email delivery rates, open rates, and response metrics</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">2.3 Google OAuth Information</h3>
              <p className="text-gray-700 mb-4">
                When you use Google OAuth to sign in, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Your Google account email address</li>
                <li>Your public profile information (name, profile picture)</li>
                <li>Google account unique identifier</li>
              </ul>
              <p className="text-gray-700">
                We do not access your Gmail emails, contacts, or any other Google services beyond basic authentication.
              </p>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the collected information for the following purposes:</p>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">3.1 Core Platform Services</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Provide and maintain our email outreach platform</li>
                <li>Process and send emails on your behalf using your own email credentials</li>
                <li>Manage your contact lists and email campaigns</li>
                <li>Track email performance and provide analytics</li>
                <li>Schedule and automate email sending</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">3.2 Account Management</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Create and manage your account</li>
                <li>Authenticate your identity</li>
                <li>Provide customer support</li>
                <li>Process billing and payments</li>
                <li>Send important service notifications</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">3.3 Platform Improvement</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Analyze usage patterns to improve our services</li>
                <li>Develop new features and functionality</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Conduct research and analytics (in aggregate, anonymized form)</li>
              </ul>
            </section>

            {/* Email and SMTP Handling */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Email and SMTP Credential Handling</h2>
              <p className="text-gray-700 mb-4">
                <strong>Your Email Ownership:</strong> All emails are sent directly from your own email address using your SMTP credentials. We never send emails from our servers or impersonate you.
              </p>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">4.1 SMTP Credential Security</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>SMTP credentials are encrypted using industry-standard encryption</li>
                <li>Credentials are stored securely and never shared with third parties</li>
                <li>We use your credentials only to send emails you explicitly create and schedule</li>
                <li>You maintain full control and can revoke access at any time</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">4.2 Email Content</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>We do not read, analyze, or modify your email content</li>
                <li>Email templates and content are stored securely for campaign management</li>
                <li>We track delivery metrics for performance analytics only</li>
                <li>We never use your email content for marketing or advertising</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information. We may share information only in the following limited circumstances:
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">5.1 Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We work with trusted third-party service providers who help us operate our platform:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Authentication:</strong> NextAuth.js for secure user authentication</li>
                <li><strong>Database:</strong> Prisma and secure database providers for data storage</li>
                <li><strong>Analytics:</strong> Privacy-focused analytics to understand platform usage</li>
                <li><strong>Infrastructure:</strong> Cloud hosting providers for platform availability</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">5.2 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose information if required by law, such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>To comply with legal processes or government requests</li>
                <li>To protect our rights, property, or safety</li>
                <li>To protect the rights, property, or safety of our users</li>
                <li>To investigate fraud or security issues</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement robust security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
                <li><strong>Access Controls:</strong> Strict access controls and authentication requirements</li>
                <li><strong>Regular Audits:</strong> Security audits and vulnerability assessments</li>
                <li><strong>Secure Infrastructure:</strong> Industry-standard cloud security practices</li>
                <li><strong>SMTP Security:</strong> Your email credentials are encrypted with advanced encryption standards</li>
              </ul>
              <p className="text-gray-700">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Account Data:</strong> Retained for as long as your account is active</li>
                <li><strong>Contact Information:</strong> Retained until you delete it or close your account</li>
                <li><strong>Email Campaigns:</strong> Retained for performance tracking and your reference</li>
                <li><strong>SMTP Credentials:</strong> Deleted immediately upon account closure or when you remove them</li>
                <li><strong>Analytics Data:</strong> Aggregated, anonymized data may be retained for service improvement</li>
              </ul>
              <p className="text-gray-700">
                When you delete your account, we will delete your personal information within 30 days, except where retention is required by law.
              </p>
            </section>

            {/* Your Rights and Controls */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights and Controls</h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your information:</p>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">8.1 Access and Control</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> View and download your personal data</li>
                <li><strong>Update:</strong> Modify your account information and preferences</li>
                <li><strong>Delete:</strong> Remove contacts, campaigns, or your entire account</li>
                <li><strong>Export:</strong> Download your contact lists and campaign data</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">8.2 Communication Preferences</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Opt out of marketing communications (service notifications will continue)</li>
                <li>Choose notification preferences for platform updates</li>
                <li>Control email scheduling and automation settings</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">8.3 GDPR Rights (EU Users)</h3>
              <p className="text-gray-700 mb-4">If you're in the European Union, you have additional rights:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Right to rectification of inaccurate data</li>
                <li>Right to data portability</li>
                <li>Right to restrict processing</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Keep you signed in to your account</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze platform usage and performance</li>
                <li>Improve user experience and platform functionality</li>
              </ul>
              <p className="text-gray-700">
                You can control cookies through your browser settings. However, disabling cookies may affect platform functionality.
              </p>
            </section>

            {/* Third-Party Integrations */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Third-Party Integrations</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">10.1 Google OAuth</h3>
              <p className="text-gray-700 mb-4">
                When you sign in with Google, this privacy policy governs our use of the information we receive. Google's privacy policy governs their collection and use of data. We:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Only request minimal permissions for authentication</li>
                <li>Do not access your Gmail, Google Drive, or other Google services</li>
                <li>Do not store or access your Google passwords</li>
                <li>Allow you to disconnect your Google account at any time</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">10.2 Email Service Providers</h3>
              <p className="text-gray-700 mb-4">
                Your SMTP credentials connect to your email provider (Gmail, Outlook, etc.). These providers have their own privacy policies for email handling. We recommend reviewing them.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p className="text-gray-700">
                PingStack is not intended for use by children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to remove such information.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                PingStack is operated from the United States. If you are accessing our service from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States.
              </p>
              <p className="text-gray-700">
                By using our service, you consent to such transfers. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Notify you of any material changes via email or platform notification</li>
                <li>Update the "Last updated" date at the top of this policy</li>
                <li>Give you the opportunity to review changes before they take effect</li>
                <li>Obtain your consent for material changes that affect how we use your data</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@pingstack.com</p>
                <p className="text-gray-700 mb-2"><strong>Support:</strong> support@pingstack.com</p>
                <p className="text-gray-700"><strong>Address:</strong> [Your Business Address - Update with actual address]</p>
              </div>
              <p className="text-gray-700 mt-4">
                We will respond to privacy-related inquiries within 30 days.
              </p>
            </section>

            {/* Compliance Statement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Compliance and Certifications</h2>
              <p className="text-gray-700 mb-4">
                PingStack is committed to maintaining the highest standards of data protection and privacy:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>GDPR Compliance:</strong> We follow GDPR requirements for EU users</li>
                <li><strong>CCPA Compliance:</strong> We comply with California Consumer Privacy Act requirements</li>
                <li><strong>SOC 2 Type II:</strong> Our infrastructure partners maintain SOC 2 Type II compliance</li>
                <li><strong>Google OAuth:</strong> We follow Google's OAuth policies and user data requirements</li>
                <li><strong>Industry Standards:</strong> We implement security practices aligned with industry standards</li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <Footer variant="privacy" />
    </div>
  )
}