import { SignupForm } from "../../../../components/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left side - Signup Form */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
      
      {/* Right side - Professional Design */}
      <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-lg px-12">
          
          {/* Professional Text */}
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to PingStack
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed font-medium">
            Professional cold email platform for job seekers to connect with founders and recruiters.
          </p>
          
          {/* Subtle accent */}
          <div className="mt-8 w-20 h-1 bg-blue-600 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  )
}