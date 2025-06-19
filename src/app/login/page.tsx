"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mails, Users, Clock, Shield, Sparkles, ArrowRight } from "lucide-react"
import SignInWithGoogle from "@/components/signin-google"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding and Features */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mails className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                PingStack
              </h1>
            </div>
            <p className="text-xl text-slate-600 leading-relaxed">
              Automate your job search with intelligent cold email campaigns powered by AI and track your results.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 group hover:bg-white/50 p-4 rounded-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Import Your Leads</h3>
                <p className="text-slate-600">
                  Easily import recruiters, companies, and contacts to build your outreach list.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group hover:bg-white/50 p-4 rounded-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail w-6 h-6 text-white"
                >
                  <rect width="22" height="16" x="1" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Personalized Automation</h3>
                <p className="text-slate-600">Send tailored emails automatically using your own SMTP account.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group hover:bg-white/50 p-4 rounded-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Smart Scheduling</h3>
                <p className="text-slate-600">
                  Schedule follow-ups and maintain consistent outreach without manual effort.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 pointer-events-none" />

            <CardHeader className="space-y-4 pb-8 relative">
              <div className="flex items-center justify-center lg:hidden space-x-2 mb-4">
                <Mails className="w-5 h-5 text-white" />

                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  PingStack
                </h1>
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Welcome Back
                  </span>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Ready to automate?
                </CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Sign in to continue building your job search pipeline
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 relative">
              <div className="space-y-6">

                <div className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden rounded-lg flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <SignInWithGoogle />
                  <ArrowRight className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Secure & Private</p>
                      <p className="text-xs text-green-600">Your data is protected by Google's security</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-slate-500 mt-8 leading-relaxed">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
