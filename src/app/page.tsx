import { ArrowRight, Calendar, Mail, Shield, Target, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/Footer"

export default async function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* Hero Section */}
      <section className="py-20 px-4 h-[90vh] flex items-center justify-center">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            🚀 Your job search sidekick for cold outreach
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Land jobs faster with <span className="text-blue-600">automated, authentic</span> outreach
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            PingStack streamlines cold emailing to recruiters and hiring managers. Send personalized emails at optimal
            times — all from your own email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need for successful outreach</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From lead management to smart scheduling, PingStack handles the complexity so you can focus on landing
              your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Personal Lead Management</CardTitle>
                <CardDescription>
                  Import or add recruiters and founders manually. Organize by role, company type, or priority with tags
                  and notes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Smart Email Scheduling</CardTitle>
                <CardDescription>
                  Define ideal send times per day. Reach recruiters when they're most likely to respond with fully
                  customizable schedules.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Mail className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Email Personalization</CardTitle>
                <CardDescription>
                  Use your own SMTP credentials. Dynamic variables like {`{{name}}`} and
                  {`{{company}}`} make every email feel personally written.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Track Interactions</CardTitle>
                <Badge variant="secondary" className="mb-2">
                  Coming Soon
                </Badge>
                <CardDescription>
                  Open and reply tracking with smart follow-up suggestions based on engagement insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Security & Ownership</CardTitle>
                <CardDescription>
                  No email spoofing or proxying. You stay in complete control with securely stored credentials never
                  shared with third parties.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Authentic Outreach</CardTitle>
                <CardDescription>
                  Emails come directly from your address, maintaining authenticity and building genuine professional
                  relationships.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How PingStack Works</h2>
            <p className="text-xl text-gray-600">Get started in minutes with our simple 5-step process</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { step: "1", title: "Sign Up", desc: "Login using secure Supabase Auth" },
                { step: "2", title: "Add Leads", desc: "Import or manually add recruiter contacts" },
                { step: "3", title: "Set Schedule", desc: "Define your preferred email send times" },
                { step: "4", title: "Connect Email", desc: "Link your SMTP credentials securely" },
                { step: "5", title: "Auto-Send", desc: "Emails sent automatically on your schedule" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect for ambitious professionals</h2>
            <p className="text-xl text-gray-600">Whether you're starting your career or scaling your outreach</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Students",
                desc: "Applying to internships or first jobs",
                icon: "🎓",
              },
              {
                title: "Developers & Designers",
                desc: "Looking for freelance gigs and opportunities",
                icon: "💻",
              },
              {
                title: "Bootstrappers",
                desc: "Reaching out to startup founders and investors",
                icon: "🚀",
              },
              {
                title: "Professionals",
                desc: "Doing strategic outreach at scale",
                icon: "💼",
              },
            ].map((audience, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{audience.icon}</div>
                  <CardTitle className="text-xl">{audience.title}</CardTitle>
                  <CardDescription className="text-base">{audience.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your job search?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who've accelerated their careers with smart, personalized outreach that
            actually works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <a href="/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">14-day free trial • No credit card required • Cancel anytime</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
