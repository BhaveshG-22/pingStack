"use client"

import { Mails, ArrowLeft, CircleUser, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import Link from "next/link"
import { Session } from "next-auth"
import { UserProfileSidebar } from "./user-profile-sidebar"

interface NavbarProps {
  showBackButton?: boolean
  backButtonText?: string
  backButtonHref?: string
  initialSession: Session | null
}

export function Navbar({
  showBackButton = true,
  backButtonText = "Back to Home",
  backButtonHref = "/",
  initialSession
}: NavbarProps) {

  const pathname = usePathname()
  const { data: session } = useSession()

  // Hide navbar on auth pages 
  const authPages = [
    "login",
    "signup",
    "dashboard"
  ]

  // Check if current pathname matches any auth page
  for (const page of authPages) {
    if (pathname === `/${page}`) {
      return null
    }
  }

  if (pathname === "/") {
    showBackButton = false
  }

  // Use session from useSession or fallback to initialSession
  const currentSession = session || initialSession

  return (
    <>
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Mails className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PingStack</span>
          </Link>

          {showBackButton ? (
            <Button variant="outline" asChild>
              <Link href={backButtonHref} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {backButtonText}
              </Link>
            </Button>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
            </nav>
          )}

          {!showBackButton ? (
            initialSession == null ? (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  Sign In
                </Link>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">

                <UserProfileSidebar session={currentSession}>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="View profile"
                  >
                    <CircleUser className="h-6 w-6 text-gray-600" />
                  </button>
                </UserProfileSidebar>
                <Button variant="outline" asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </Button>
              </div>
            )
          ) : null}
        </div>
      </header>
    </>
  )
}