"use client"

import { Brain, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"


interface NavbarProps {
  showBackButton?: boolean
  backButtonText?: string
  backButtonHref?: string
}

export function Navbar({
  showBackButton = false,
  backButtonText = "Back to Home",
  backButtonHref = "/"
}: NavbarProps) {

  const { data: session } = useSession()


  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">PingStack</span>
        </div>

        {showBackButton ? (
          <Button variant="outline" asChild>
            <a href={backButtonHref} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {backButtonText}
            </a>
          </Button>
        ) : (
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </nav>
        )}

        {!showBackButton && (
          <div className="flex items-center gap-4">
            {session ? (
              <Button 
                variant="outline" 
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <a href="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  Sign In
                </a>
                <Button asChild>
                  <a href="/signup">Get Started</a>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}